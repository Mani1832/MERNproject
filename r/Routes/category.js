const express=require('express');
const router=express.Router();
const {userById,requireSignin,isAuth,isAdmin}=require('../controllers/user')
const {create,categoryById,read,list,remove,update}=require('../controllers/category');
router.post('/category/create/:userid',requireSignin,isAuth,isAdmin,create);
router.put('/category/:categoryid/:userid',requireSignin,isAuth,isAdmin,update);
router.delete('/category/:categoryid/:userid',requireSignin,isAuth,isAdmin,remove);
router.get('/category/:categoryid',read);
router.get('/category',list);
router.param("userid",userById);
router.param("categoryid",categoryById);
module.exports=router;