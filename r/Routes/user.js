const express=require('express');
const router=express.Router();
const {userById,requireSignin,isAuth,isAdmin,read,update}=require('../controllers/user')
router.get('/secret/:userid',requireSignin,isAuth,isAdmin,(req,res)=>{
        res.json({
            user:req.profile
        });
}
);
router.get("/user/:userid",requireSignin,isAuth,read);
router.put("/user/:userid",requireSignin,isAuth,update);
router.param("userid",userById);
module.exports=router;