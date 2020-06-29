const path=require('path');
const Router=require('express').Router();
const auth=require('../../middle-ware/auth');
const orderController=require('../../controller/admin/order');

Router.get('/danh-sach-don-hang',renderPageOrderList);
Router.get('/cap-nhat-trang-thai-don-hang/:id',updateStatus);
Router.get('/danh-sach-don-hang-chua-xu-ly',getOrderListPending);
Router.get('/danh-sach-don-hang-da-xu-ly',getOrderListHaveProcessed);

Router.get('/doanh-thu/:type',(req,res,next) => {
    orderController.getRevenue(req.params.type)
    .then(count => {
        res.json({count});
    })
    .catch(err => {
        res.json(err);
    })
})
Router.get('/don-hang-hom-nay', (req,res,next) => {
    orderController.getOrderToday()
    .then(numberOrder => {
        res.json(numberOrder);
    })
    .catch(err => {
        res.json(err);
    })
})
Router.get('/don-hang-theo-thang',(req,res,next) => {
    orderController.getNumOrderCurrMonth()
    .then(arrOrder => {
        res.json(arrOrder);
    })
    .catch(err => {
        res.json(err);
    })
})

Router.get('/don-hang-theo-nam',(req,res,next) => {
    orderController.getNumOrderCurrYear()
    .then(arrOrder=>{
        res.json(arrOrder);
    })
    .catch(err => {
        res.json(err);
    })
})

function updateStatus(req,res,next){
    
    orderController.updateOrderStatus(req.params.id).then(order=>{
        res.json({"status":"success"});
    }).catch(err=>{
        console.log(err);
    })
}

Router.get('/doanh-thu-theo-loai-san-pham/:thang',(req,res,next) => {
   orderController.getRevenueByProductTypeOfMonth(req.params.thang)
   .then(data => {
      res.json(data);
   })
   .catch(err => {
       res.json(err)
   })
})

function renderPageOrderList(req,res,next){
    res.render("admin/pages/order-list",{layout:"admin/layout"});
}

function getOrderListPending(req,res,next){
    orderController.getOrderListPending().then(pending=>{
        res.json({"pending":pending});
    }).catch(err=>{
        console.log(err);
    })
}

function getOrderListHaveProcessed(req,res,next){
    orderController.getOrderListHaveProcessed().then(processed=>{
        res.json({"processed":processed});
    }).catch(err=>{
        console.log(err);
    })
}



module.exports=Router;