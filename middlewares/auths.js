function auth(req,res,next){
    const token=req.cookies.token;

    if(!token)
    {
        return res.redirect("/user/login")
    }
    
    try {
        
        const decoded= verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        return next();

    } catch (error) {
        return res.redirect("/user/login")
    }
}

export default auth;