const Router=require('express').Router();
const fs=require('fs');
const auth=require('../../middle-ware/auth');
const path=require('path');
Router.get('/',loginAdmin);

function loginAdmin(req,res,next)
{
   const data= fs.createReadStream(path.join(__dirname+'../../../views/admin/pages/login.html'),{encoding:'utf-8'});
   data.pipe(res);
  
}
module.exports=Router;