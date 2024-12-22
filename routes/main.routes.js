import express from "express"
// import upload from "../config/claudinary.js";
import authuser from "../middlewares/authenticateuser.js"
const router=express.Router();
import cloudinary from "../config/claudinary.js";
import upload from "../middlewares/multer.js";
import fileModel from "../models/files.model.js"
import generate from "../config/chatwithai.js";
import auth from "../middlewares/auths.js";
router.get("/uploaddocs",(req,res)=>{
    res.render("index2");
})

router.post('/uploaddocs',auth, authuser, upload.single('file'), async function (req, res) {
  const { username, email } = req.user;

  try {
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      
      // Find the user in the database
      const user = await fileModel.findOne({ email });
      
      if (user) {
          // User exists, append the new file URL to the uploads array
          user.uploads.push({ url: result.secure_url });
          await user.save();
      } else {
          // User does not exist, create a new document
          await fileModel.create({
              username,
              email,
              uploads: [
                  {
                      url: result.secure_url,
                  },
              ],
          });
      }

      res.status(200).json({
          success: true,
          message: "Uploaded!",
          data: result,
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({
          success: false,
          message: "Error uploading file",
      });
  }
});

router.get('/files', auth,authuser, async (req, res) => {
  const { email } = req.user; 

  try {
      const user = await fileModel.findOne({ email });

      if (!user || user.uploads.length === 0) {
          return res.status(404).json({ message: 'No files found for this user' });
      }

      res.status(200).json({ files: user.uploads });
  } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ message: 'Error fetching files', error: error.message });
  }
});


router.get("/testyourself",(req,res)=>{
    res.render("chatwithai");
})

router.post('/testyourself', async (req, res) => {
    try {
      const str = req.body.text;
      const result = await generate(str);
      res.json({ response: result });
    } catch (error) {
      console.error('Error in /testyourself route:', error.message);
      res.status(500).json({ response: 'Error generating content' });
    }
  });
  
export default router;