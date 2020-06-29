const Router=require('express').Router();
const referenceMobileController=require('../../controller/user/reference-mobile');
Router.get('/',getAllReference);
Router.get('/:id',getReferenceById);
function getAllReference(req,res,next)
{
    referenceMobileController.getAllReference()
    .then(references => {
        res.json(references);
    })
    .catch(err => {
        res.json(err);
    })
}

function getReferenceById(req,res,next)
{
    referenceMobileController.getReferenceById(req.params.id)
    .then(reference => {
        res.json(reference);
    })
    .catch(err => {
        res.json(err);
    })
}
module.exports=Router;