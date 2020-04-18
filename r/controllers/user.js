const User=require('../models/user');
const expressjwt=require('express-jwt');
exports.userById=(req,res,next,id)=>{
        User.findById(id).exec((err,user)=>{
                if(err || !user){
                    return res.status(400).json({
                        message:"User Not Found"
                    });
                }
                req.profile=user
                next();
            });
        };
exports.requireSignin=expressjwt({
    secret:process.env.JWT_SECRET,
    userProperty:"auth"
    });
exports.isAuth=(req,res,next)=>{
    let user=req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        // console.log(req.profile)
        // console.log(req.auth)
        // console.log(req.profile._id)
        // console.log(req.auth._id)
        return res.json({
           error: "Acces Denied"
        });
    }
    next();
};
exports.isAdmin=(req,res,next)=>{
    if(req.profile.role==0){
        return res.json({
            "err":"Admin Resource acces denaid"
        });
    }
    next();
};
exports.read=(req,res)=>{
    return res.json(req.profile);
};
exports.update=(req,res)=>{
    User.findOneAndUpdate({_id:req.profile._id},{$set:req.body},{new:true}
        ,(err,data)=>{
            if(err){
                return res.json({
                    message:"Acces Denied"
                })
            }
            return res.json(data);
        })
}