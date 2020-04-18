const Category=require("../models/category");
const {errorHandler}=require("../helper/errorhandler.js");
exports.create=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,data)=>{
        if(err){
            return res.json({
                error:errorHandler(err)
            });
        }
        res.json({
            data}
        )
    });
};
exports.read=(req,res)=>{
        return res.json(
            req.category
        )
}
exports.categoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,data)=>{
        if(err){
            return res.json({
                error:"Category does not exist"
            })
        }
        else{
            req.category=data
            next();
        }
    })
}
exports.update=(req,res)=>{
    let category=req.category
    category.name=req.body.name
    category.save((err,data)=>{
                if(err){
                    return res.json({
                        message:"category does not exist"
                    })
                }
                return res.json({
                    data
                })
    });
};
exports.remove=(req,res)=>{
    let category=req.category
    category.remove((err,data)=>{
        if(err){
            return res.json({
                message:"Cateogory does not exist"
            })
        }
        return res.json({
           message:"Deleted Successfully"
        });
    });

};
exports.list=(req,res)=>{
    Category.find().exec((err,data)=>{
        if(err){
            return res.json({
                message:"NO category"
            })
        }
        return res.json({
            data
        });
    });
};