module.exports={
    ensureAuth:function(req,res,next){
        if(req.isAuthenticated())
            return next();
        req.flash("error_msg","please login to view this resourse");
        res.redirect("/users/login");
    }
}