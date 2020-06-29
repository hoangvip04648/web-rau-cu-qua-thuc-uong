const Router=require('express').Router();
const userController=require('../../controller/admin/user');
const auth=require('../../middle-ware/auth');

Router.get('/',getUser);

//Router.get('/',auth.authAdmin,getUser);

function getUser(req,res,next){
    userController.getAllUser()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

module.exports=Router;