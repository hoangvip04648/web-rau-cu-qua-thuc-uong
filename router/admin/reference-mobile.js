const Router=require('express').Router();
const referenceMobileController=require('../../controller/admin/reference-mobile');
Router.post('/them-bai-viet',createReferenceMobile)
Router.put('/:id',updateReference);
Router.delete('/:id',deleteReference);
function createReferenceMobile(req,res,next)
{
    let files;
    if(req.files==null)
    {
        files=[];
    }
    else
    {
        files=req.files.image;
    }
   
    let reference=req.body;
    reference.content=JSON.parse(reference.content);
    if(!reference.title || !reference.content)
    {
        res.json({message:'tieu de va noi dung khong duoc de trong'});
    }
    else
    {
      
        if(files.length==undefined)
        {
            files=[files];
        
        }
        referenceMobileController.createReferenceMobile(reference,files)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
    }
}

function updateReference(req,res,next) {
    referenceMobileController.updateReference(req.params.id,req.body)
    .then(data=> {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
}

function deleteReference(req,res,next) {
    referenceMobileController.deleteReference(req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
}

module.exports=Router;