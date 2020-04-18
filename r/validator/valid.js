
exports.Uservalidator=(req,res,next)=>{
        req.check("name","Name is Required").notEmpty();
        req.check("email","Email must be between 3 to 32 characters")
                .matches(/.+\@.+\..+/)
                .withMessage("Email must contains @")
                .isLength({
                            min:3,
                            max:32
                });
        req.check("password","Pasword is Required").notEmpty();
        req.check("password")
                .isLength({
                    min:6
                })
                .withMessage("Password must contain at least 6 Characters")
                .matches(/\d/)
                .withMessage("Password Must Contain a Number");
                const zerror=req.validationErrors();
                if(zerror){
                    const ferror = zerror.map(err=>err.msg)[0];
                    return res.status(400).send({
                        error:ferror
                    });
                }
                next();
};
