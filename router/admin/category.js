const Router=require('express').Router();

const categoryController=require('../../controller/admin/category');
const auth=require('../../middle-ware/auth');

const file = require('fs');


Router.get('/lay-danh-muc/:id',getCategoryById);
Router.get('/danh-sach',auth.handleAuthAdmin,renderListCategory);
Router.post('/them-danh-muc',auth.authAdminAPI,createCategory);
Router.put('/sua-thong-tin/:id',auth.authAdminAPI,updateCategoryImage);
Router.put('/info/:id',auth.authAdminAPI,updateInfo);
Router.delete('/xoa-danh-muc/:id',auth.authAdminAPI,deleteCategory);


function renderListCategory(req,res,next){
    categoryController.getListCategory()
    .then(data=>{
        res.render('admin/pages/list-category',{data:data});
    })
    .catch(err=>{
        res.json(err);
    })
}


function createCategory(req,res,next)
{
    const category=req.body;
    categoryController.createCategory(category)
    .then(data=>{

        res.json(data);
    })
    .catch(err=>{   
        res.json(err);
    })
}


function deleteCategory(req,res,next)
{
    categoryController.deleteCategory(req.params.id)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

function updateCategoryImage(req,res,next){

    let file = req.files.file;
    const category={
        "id" : req.params.id
    }


    categoryController.updateCategoryImage(category,file)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })

}


 

//lấy danh mục về đồng thời gửi thêm cái image để hiển thị phần upload image

function getCategoryById(req,res,next){
    const category = req.params.id;
    categoryController.getCategoryById(category)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}









function updateInfo(req,res,next){
    const category = {
        "name" : req.body.name,
        "type" : req.body.type,
        "id"   : req.params.id
    }

    categoryController.updateCategory(category)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err);
    })

}
module.exports=Router;