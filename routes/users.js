const express=require('express');
const {Login,GetRegister,PostRegister}=require("../controllers/controllers");
const passport=require("passport")

const router=express.Router();

router.route("/login").get(Login).post((req,res,next)=>{
    passport.authenticate("local",{
        successRedirect:"/dashboard",
        failureRedirect:"/users/login",
        failureFlash:true
    })(req,res,next);
})

router.route("/register").get(GetRegister).post(PostRegister);

router.route("/logout").get((req,res)=>{
    req.logOut();
    req.flash("success_msg","You are logged out")
    res.redirect("/users/login");
})

module.exports=router;

