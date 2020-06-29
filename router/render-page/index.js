let ejs = require('ejs');
const path = require('path');
const Router=require('express').Router();
const productController=require('../../controller/user/product');
const referenceController=require('../../controller/user/reference');
const userController = require('../../controller/user/user');
const voteController = require('../../controller/user/vote');
const fs  = require('fs');
Router.get('/cua-hang',renderPageStore);
Router.get('/tham-khao',renderPageReference);
Router.get('/san-pham/:id',renderProductDetail);
Router.get('/tham-khao/:id',renderReferenceDetail);
Router.get('/login',renderPageLogin);
Router.get('/sign-up',renderPageSignUp);
Router.get('/profile/:id',profileUser);
Router.get('/gio-hang',renderPageCart);
Router.get('/gioi-thieu',renderPageIntroduce);
Router.get('/quen-mat-khau',renderPageForgotPassword);
Router.get('/xac-thuc-mat-khau',renderPageAuthPassword);

Router.get('/doi-mat-khau',changePassword);
function profileUser(req,res,next){
    userController.getUser(req.params.id)
    .then(data=>{
       const pipe = fs.createReadStream('views/user/pages/profile.ejs',{encoding:'utf-8'});
       pipe.pipe(res);
     
    })
    .catch(err=>{
        res.json(err);
    })
}
function renderPageStore(req,res,next)
{
    const query={
        page:1,
        amount:12,
        sortBy:'price',
        sort:1,
    }
    
    productController.getProductByQuery(query)
    .then(data => {
        res.render('user/pages/store',{layout:'user/layout',data:data.products,numPage:data.numPage});
    })
   
}

function renderPageReference(req,res,next)
{
    referenceController.getAllReference()
    .then(references => {
        res.render('user/pages/reference',{layout:'user/layout',references:references});
    })
    
}

function renderProductDetail(req,res,next)
{
    voteController.countVoteByIdProduct(req.params.id)
    .then(numVote => {
        productController.getProductById(req.params.id)
        .then(product =>{
        
            productController.getProductsByCategory(product.idCategory,8)
            .then(listProduct => {
                console.log(listProduct);
                res.render('user/pages/product-detail',{layout:'user/layout',data:{product:product,listProduct:listProduct,numVote:numVote}});
            })
            .catch(err=> {
                res.json(err);
            })
           
        })
        .catch(err=>{
            res.json(err);
        })
    })
    .catch(err => {
        res.json(err);
    })
   
}
function renderReferenceDetail(req,res,next)
{
    referenceController.searchReference(req.params.id)
    .then(reference=>{
        referenceController.getReferenceByNumber()
        .then(listReference=>{
            res.render('user/pages/reference-detail',{layout:'user/layout',reference:reference,listReference:listReference});
        })
       
    })
    .catch(err=>{
        res.json(err);
    })
}

function renderPageLogin(req,res,next)
{
    ejs.renderFile(path.join(__dirname,'../../views/user/pages/login.ejs'),data='tuan',(err,str) =>{
        if(err){
            res.json(err);
        }
        else
        {
            res.send(str);
        }
    });
}

function renderPageSignUp(req,res,next)
{
    ejs.renderFile(path.join(__dirname,'../../views/user/pages/signup.ejs'),(err,str) =>{
        if(err){
            res.json(err);
        }
        else
        {
            res.send(str);
        }
    });
}

function renderPageCart(req,res,next){
    res.render('user/pages/cart',{layout:'user/layout'});
}

function renderPageIntroduce(req,res,next){
    res.render('user/pages/introduce',{layout:'user/layout'});
}

function renderPageForgotPassword(req,res,next)
{
    ejs.renderFile(path.join(__dirname,'../../views/user/pages/forgot-password.ejs'),(err,str) =>{
        if(err){
            res.json(err);
        }
        else
        {
            res.send(str);
        }
    });
}

function renderPageAuthPassword(req,res,next)
{
    ejs.renderFile(path.join(__dirname,'../../views/user/pages/auth-password.ejs'),(err,str) =>{
        if(err){
            res.json(err);
        }
        else
        {
            res.send(str);
        }
    });
}

function changePassword(req,res,next){

    const data = fs.createReadStream('views/user/pages/change-password.ejs',{encoding:'utf-8'});

    data.pipe(res);

    // res.render('user/pages/change-password',{})
}
module.exports=Router;