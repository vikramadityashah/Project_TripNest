const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp = async(req,res)=>{
    try{
       let {username,email,password} = req.body;
       let newUser = new User({username,email});
       let registerUser = await User.register(newUser,password);
       console.log(registerUser);
       req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to TripNest site")
        res.redirect("/listings");
       })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome to TripNest.!! You are logged In");
    let Url = res.locals.redirectUrl || "/listings";
    res.redirect(Url);
}

module.exports.logOut = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
        return next()
        }
        req.flash("success","You are logged out successfully");
        res.redirect("/listings");
    })
}