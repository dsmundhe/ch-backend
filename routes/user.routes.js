import express from 'express';
import { body, validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();


router.get("/register",(req,res)=>{
  res.render("signup");
})
router.post('/register',
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { username, mobile, email, password } = req.body;
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists. Please log in.' });
        }
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = await userModel.create({
                username,
                mobile,
                email,
                password: hashedPassword,
            });
            
            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    username: user.username,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            res.cookie('token', token, { expires: new Date(Date.now() + 1000 * 60 * 60)}); 
            res.redirect("/");
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred during registration' });
        }
    }
);
router.get("/login",(req,res)=>{
    res.render("login");
})

router.post('/login', [
  body('email').trim().isEmail().isLength({ min: 13 }),
  body('password').trim().isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found. Please register.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Email or password is incorrect' });
  }

  const token = jwt.sign({
    userId: user._id,
    email: user.email,
    username: user.username,
  }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, { expires: new Date(Date.now() + 1000 * 60 * 60)});
  res.redirect("/");
});

export default router;
