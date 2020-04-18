const express=require('express');
const mongo=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const expressValidator=require('express-validator');
require('dotenv').config();
//import Routes
const authRoutes=require('./Routes/auth.js');
const userRoutes=require('./Routes/user.js');
const categoryRoutes=require('./Routes/category.js');
const productRoutes=require('./Routes/product.js')
//App
const app=express();
//Database Connection Atlas
mongo.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB Connected')});
    app.use(expressValidator());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Routes MiddleWares
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running `);
})