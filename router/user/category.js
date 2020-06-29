const Router=require('express').Router();
const categoryController=require('../../controller/user/category');

Router.get('/',getCategory);
// Router.get('/:id',getDetailCategory);
function getCategory(req,res,next){
    categoryController.getCategory()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}
// function getDetailCategory(req,res,next)
// {
//     categoryController.getDetailCategory(req.params.id)
//     .then(data=>{
//         res.json(data);
//     })
//     .catch(err=>{
//         res.json(err);
//     })
// }

module.exports=Router;