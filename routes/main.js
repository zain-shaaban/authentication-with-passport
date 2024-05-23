const express=require("express");
const {ensureAuth}=require("../middleware/auth");
const {Main}=require("../controllers/controllers");

const router=express.Router();


router.route("/").get(Main);
router.route("/dashboard").get(ensureAuth,(req,res)=>res.render("dashboard",{
    name:req.user.name
}))

module.exports=router