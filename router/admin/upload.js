const Router=require('express').Router();

const uploadController=require('../../controller/admin/upload');

Router.post('/image/reference',handleUploadImage);

function handleUploadImage(req,res,next) {
    const file=req.files.image;
    console.log(file);
    uploadController.handleUploadImage(file)
    .then(data=>{
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
}



module.exports=Router;