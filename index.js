// require ('newrelic');
require('dotenv').config();

const PORT = process.env.PORT || 9000;
const url_db=PORT!=9000 ? process.env.url_db_server : process.env.url_db_local;
console.log(url_db);
const express=require('express');
const app=express();
const favicon=require('serve-favicon');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const indexRouter=require('./router/index.router');
const errorHandle=require('./middle-ware/error-handle');
const expressLayouts = require("express-ejs-layouts");
const path=require('path');
var fs = require('fs');
var upload=require('express-fileupload');
const cookieParser=require('cookie-parser');
const userModel=require('./model/user.model');
const bcryptjs=require('bcryptjs');

const categoryController=require('./controller/user/category');

// app.use("*", cors());
// view engine setup
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

//confix heroku
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(__dirname+''));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(__dirname+'/public/favicon.ico'));

app.use(upload());

app.set('layout','admin/layout');
app.use(expressLayouts);

app.use('/',(req,res,next)=>{
    categoryController.getCategory()
    .then(data=>{
        app.locals.categorys=data;
        next();
    })
    .catch(err=>{
        app.locals.categorys=[];
        next();
    })
},indexRouter);

mongoose.connect(url_db,(err)=>{
    if(err)
    {
        
        console.log('can not connect to mongodb');
    }
    else
    {
        userModel.findOne({email:"admin@gmail.com"})
        .then(founded=>{
            if(!founded)
            {
                bcryptjs.hash("12345678",10)
                .then(hash=>{
                    const User=new userModel({
                        email:"admin@gmail.com",
                        role:1,
                        password:hash
                    });
                    User.save()
                    .then(data=>{
                        console.log('Tạo tài khoản thành công cho admin!');
                    })
                    .catch(err=>{
                        console.log('không thể tạo tài khoản cho admin!');
                    })
                })
                .catch(err=>{
                    console.log('không thể tạo tài khoản cho admin!');
                })
            }else{
                console.log("admin@gmail.com da ton tai");
            }
        })
        .catch(err=>{
            console.log('không thể tạo tài khoản cho admin!');
        })
        console.log('successful connected to mongodb');
    }
})

app.use(errorHandle);
app.listen(PORT,()=>{
    console.log(`server dang chay tren port ${PORT}`);
})