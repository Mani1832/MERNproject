const mongoose=require('mongoose');
const crypto=require('crypto');
const uuidv1=require('uuid/v1');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        maxlength:32
    },
    email:
    {
        type:String,
        trim:true,
        required:true,
        unique:32
    },
    password:{
        type:String,
        requires:true
    },
    about:{
        type:String,
        require:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }


},{timestamps:true});
// UserSchema.methods={
//     authenticate:function(plainText){
//             return this.plainText===this.password;
//     }
// };
// UserSchema.virtual("password")
// .set( function(password) {
//     this.password=password;
//     this.salt=uuidv1();
//     this.hashed_password=this.password;
//     return this.hashed_password;
// })
// .get(function(){
// return this.password;
// })
// UserSchema.methods={
//     encryptPassword:function(password){
//         if(!password) return '';
//         try{
//             return crypto.createHmac('sha1',this.salt)
//                                     .update(password)
//                                     .digest("hex");
//         }
//         catch(err){
//             return "";
//         }
//     }
// };
module.exports=mongoose.model("User",UserSchema);