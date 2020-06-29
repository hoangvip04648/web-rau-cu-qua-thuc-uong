const Router=require('express').Router();

const referenceController=require('../../controller/admin/reference')

const auth=require('../../middle-ware/auth');

Router.get('/danh-sach-bai-viet',auth.handleAuthAdmin,renderPageListReference);
Router.get('/danh-sach-bai-viet/:id',auth.handleAuthAdmin,renderPageReferenceDetail);
Router.get('/danh-sach-bai-viet/preview/:id',auth.handleAuthAdmin,renderPagePreviewReference);
Router.get('/them-bai-viet',auth.handleAuthAdmin,renderPageAddReference);
Router.get('/tat-ca-bai-viet',auth.authAdminAPI,getAllReferences);

Router.post('/them-bai-viet',auth.authAdminAPI,createReference);

Router.put('/sua-bai-viet/:id',auth.authAdminAPI,updateReference);

Router.delete('/xoa-bai-viet/:id',auth.authAdminAPI,deleteReference);

function renderPageListReference(req,res,next)
{
    referenceController.getAllReferences()
    .then(references => {
        res.render('admin/pages/list-reference',{data:references});
    })
  
}

function renderPageAddReference(req,res,next)
{
    res.render('admin/pages/reference');
}

function renderPageReferenceDetail(req,res,next){
    referenceController.getReferenceById(req.params.id)
    .then( reference => {
        res.render('admin/pages/modify-reference',{data:reference});
    })
}

function renderPagePreviewReference(req,res,next)
{
    referenceController.getReferenceById(req.params.id)
    .then(reference => {
        res.render('admin/pages/preview-reference',{data:reference});
    })
    .catch(err=>{
        res.json(err);
    })
}

function getAllReferences(req,res,next)
{
    referenceController.getAllReferences()
    .then(references => {
        res.json(references);
    })
    .catch(err => {
        res.json(err);
    })
}

function createReference(req,res,next){
    const reference=req.body;
    referenceController.createReference(reference)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}
 
function updateReference(req,res,next){
    const reference=req.body;
    referenceController.updateReference(reference,req.params.id)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}
function deleteReference(req,res,next){
    const idReference=req.params.id;
    referenceController.deleteReference(idReference)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}



module.exports=Router;