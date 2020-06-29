const Router =  require('express').Router();
const orderController = require('../../controller/user/order');

Router.post('/',createOrder);
Router.get('/danh-sach-mua-hang/:id',getListOrderByIdUser);//lấy danh sach order theo id cua user;
Router.delete('/xoa-order/:id',deleteListOrderByIdOrder);//xoa tat cả các order theo id user
Router.get('/san-pham-ban-chay',getListOrderByNumberItem);
function createOrder(req,res,next){
    orderController.createOrder(req.body)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

function getListOrderByIdUser(req,res,next){
    orderController.getListOrderByIdUser(req.params.id)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

function deleteListOrderByIdOrder(req,res,next){
    orderController.deleteListOrderByIdOrder(req.params.id)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}
function getListOrderByNumberItem(req,res,next){
    orderController.getListOrderByNumberItem()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err);
    })
}



module.exports = Router;