const express=require('express');
const router=express.Router();
const {signup}=require('../controllers/auth');
const User=require('../models/user.js');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
const {Uservalidator}=require('../validator/valid');
router.post("/signup",Uservalidator,signup);
router.post('/signin',async(req,res)=>{
        const{email,password}=req.body;
        try{
            let user= await User.findOne({email});
            if(user){
            const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
            res.cookie('t',token,{expire:new Date()+9999})
            const {_id,name,email,role}=user
            return res.json({token,user:{_id,email,name,role }})
            }
            else{
                return res.status(400).json({
                    error:"Invalid User"
                });

            }
        }
        catch(err){
            console.log(err);
        }
});
router.get('/signout',function(req,res){
    res.clearCookie("t");
    return res.json({
        msg:"Signout Successfully"
    })
});
// router.post("/hlo",requireSignin=expressJwt({
//     secret:process.env.JWT_SECRET,
//     userProperty:"auth"
// }),(req,res)=>{
//     res.json({
//         msg:"Hello there"
//     });
// });
//Authorization only for login user to acces their account
module.exports=router;