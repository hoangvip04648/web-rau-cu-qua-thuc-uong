const Router=require('express').Router();


const adminCategoryRouter=require('./admin/category');
const userCategoryRouter=require('./user/category');
const userReferenceRouter=require('./user/reference');
const adminReferenceRouter=require('./admin/reference');
const userRouter=require('./user/user');
const userAdminRouter=require('./admin/user');
const loginRouter=require('./user/login');
const productAdminRouter=require('./admin/product');
const referenceDetailRouter=require('./user/reference');
const dashboardAdmin=require('./admin/dashboard');
const loginAdminRouter =require('./admin/login');
const logoutAdminRouter=require('./admin/logout-admin');
const adminReferenceMobile=require('./admin/reference-mobile');
const userProductRouter=require('./user/product');
const userReferenceMobile=require('./user/reference-mobile');
const uploadRouter = require('./admin/upload');
const voteRouter = require('./user/vote');
const commentRouter = require('./user/comment');
const slideRouter = require('./admin/slide');
const orderAdminRouter = require('./admin/order');
const slideUserRouter = require('./user/slide');
const orderRouter = require('./user/order');
const renderPage=require('./render-page/index');


Router.use('/admin/dashboard',dashboardAdmin);
Router.use('/admin/san-pham',productAdminRouter);
Router.use('/admin/danh-muc',adminCategoryRouter);
Router.use('/admin/tham-khao',adminReferenceRouter);
Router.use('/admin/user',userAdminRouter);
Router.use('/admin/dang-nhap',loginAdminRouter);
Router.use('/admin/dang-xuat',logoutAdminRouter);
Router.use('/admin/dat-hang',orderAdminRouter);
Router.use('/user',userRouter);
Router.use('/tham-khao',userReferenceRouter);
Router.use('/tham-khao',referenceDetailRouter);
Router.use('/admin/tham-khao',adminReferenceRouter);
//Router.use('/admin/quan-ly-user',userAdminRouter);
Router.use('/upload',uploadRouter);
Router.use('/danh-muc',userCategoryRouter);
// Router.use('/tham-khao',userReferenceRouter);
//Router.use('/thong-tin-ca-nhan',userRouter);
Router.use('/san-pham',userProductRouter);
Router.use('/login',loginRouter);
Router.use('/admin/mobile/tham-khao',adminReferenceMobile);
Router.use('/mobile/tham-khao',userReferenceMobile);
Router.use('/vote',voteRouter);
Router.use('/binh-luan',commentRouter);
Router.use('/slide',slideRouter);
Router.use('/slide-home',slideUserRouter);
Router.use('/dat-hang',orderRouter);
Router.use('/thong-bao',require('./user/notification'));
//render page
Router.get('/',(req,res)=>{
    Promise.all([require('../controller/user/category').getCategory(), require('../controller/user/slide').getAllSlide(),require('../controller/user/product').getProductsByNumber(8)])
    .then(data => {
      
        res.render('user/pages/home-page',{layout:'user/layout',data:{
            slides:data[1],
            category:data[0],
            products:data[2]
        }});
    })
    
})

const productController= require("../controller/admin/product");

//Route for python server
Router.get('/get-all-product-data',(req,res,next)=>{
    productController.getAllProduct().then(products=>{
        res.json({"products":products});
    }).catch(err=>{
        console.log(err);
    })
});



Router.use('/page',renderPage);


module.exports=Router;