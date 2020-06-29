const Router=require('express').Router();
const orderController = require('../../controller/admin/order');
const categoryController=require('../../controller/user/category');
const auth=require('../../middle-ware/auth');
Router.get('/',auth.handleAuthAdmin,renderDashboard);

function renderDashboard(req,res,next)
{

        Promise.all([orderController.getOrderToday(),orderController.getRevenue('ngay'),orderController.getRevenue('thang'),orderController.getRevenue('nam')])
        .then(data => {
                
                res.render('admin/pages/dashboard',{data});
        })
        .catch(err => {
                res.json(err);
        })
       
    
}


module.exports=Router;