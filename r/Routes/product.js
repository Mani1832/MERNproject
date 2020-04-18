const express=require('express');
const router=express.Router();
const Product =require('../models/product');
const {userById,requireSignin,isAuth,isAdmin}=require('../controllers/user')
const {create,productById,read,remove,update,list,listRelated,listBySearch,photo}=require('../controllers/product');
// const {categoryById}=require('../controllers/category');
router.post('/product/create/:userid',requireSignin,isAuth,isAdmin,create);
router.delete('/product/:productid/:userid',requireSignin,isAuth,isAdmin,remove);
router.put('/product/:productid/:userid',requireSignin,isAuth,isAdmin,update);
router.get('/product/related/:productid',listRelated);
router.get('/product',list);
// router.get('/products/:categoryid',(req,res)=>{
//     Product.find({category:req.category},(err,data)=>{
//         if(err){
//             return res.json({
//                 message:"error"
//             })
//         }
//         return res.json(data)
//     })
// });
router.get('/products/category',(req,res)=>{
    Product.distinct("category",{},(err,categories)=>{
        if(err){
            return res.json({
                message:"Error"
            })
        }
        return res.json(categories);
    })
});
router.get('/product/photo/:productid',photo)
router.post('/product/by/search',listBySearch)
router.get('/product/:productid',read);
router.param("userid",userById);
// router.param("categoryid",categoryById);
router.param("productid",productById);

module.exports=router;