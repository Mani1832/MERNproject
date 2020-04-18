const User=require('../models/user');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
const {errorHandler}=require('../helper/errorhandler')
exports.signup=(req,res)=>{
   const user = new User(req.body);
   user.save((err,user)=>{
       if(err){
           return res.json(400).json({
               err:errorHandler(err)
           });
       }
       res.json({
           user
       })
   })
};
