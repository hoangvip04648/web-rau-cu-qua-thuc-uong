const Router=require('express').Router();
const referenceControllerRouter=require('../../controller/user/reference');

Router.get('/',createReference);
Router.get('/:id',searchReference);


function searchReference(req,res,next){
    const reference=req.params.id;
    referenceControllerRouter.searchReference(reference)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}


function createReference(req,res,next){
    referenceControllerRouter.getAllReference()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

module.exports=Router;
