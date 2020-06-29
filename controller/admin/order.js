const orderModel=require('../../model/order.model');


function getOrderListPending(){
    return new Promise((resolve,reject)=>{
        orderModel.find({status:"chua-xu-ly"})
        .populate('idProduct',["name"],"Product")
        .populate('idUser',["name","email"],"User")
        .then(orders=>{
            resolve(orders);
        }).catch(err=>{
            reject(err);
        })
    });
}

function getOrderListHaveProcessed(){
    return new Promise((resolve,reject)=>{
        orderModel.find({status:"da-xu-ly"})
        .populate('idProduct',["name"],"Product")
        .populate('idUser',["name","email"],"User")
        .then(orders=>{
            resolve(orders);
        }).catch(err=>{
            reject(err);
        })
    });
}

function updateOrderStatus(orderId){
    return new Promise((resolve,reject)=>{
        orderModel.update({_id:orderId},{status:"da-xu-ly"}).then(newOrder=>{
            resolve(newOrder);
        }).catch(err=>{
            reject(err);
        })
    });
}

function getRevenue(type){
    return new Promise((resolve,reject) => {
        const currDate = new Date();
        let sum = 0;
        orderModel.find()
        .then( orders => {
            switch(type)
            {
                case 'ngay':
                        orders.forEach((item,index) => {
                            const orderDate = parseDate(item.date);
                          
                             if(orderDate.getDate() == currDate.getDate() && orderDate.getMonth() == currDate.getMonth() && orderDate.getFullYear() == currDate.getFullYear())
                             {
                                 sum= sum + item.totalPrice;
                             }
                         })
                         resolve(sum);
                         break;
                case 'thang':
                        orders.forEach((item,index) => {
                            const orderDate = parseDate(item.date);
                             if( orderDate.getMonth() == currDate.getMonth() && orderDate.getFullYear() == currDate.getFullYear())
                             {
                                sum= sum + item.totalPrice;
                             }
                         })
                         resolve(sum);
                         break;
                case 'nam':
                     orders.forEach((item,index) => {
                    const orderDate = parseDate(item.date);
                     if(orderDate.getFullYear() == currDate.getFullYear())
                     {
                        sum = sum + item.totalPrice;
                     }
                 })
                 resolve(sum);
                 break;
            }
            
        })
        .catch(err => {
            reject(err);
        })
    })
}

function getOrderToday(){
    return new Promise( (resolve,reject) => {
        const currDate = new Date();
        let count = 0;
        orderModel.find()
        .then(orders => {
            orders.forEach((item,index) => {
                if(parseDate(item.date).getDate() == currDate.getDate() && parseDate(item.date).getMonth() == currDate.getMonth() && parseDate(item.date).getFullYear() == currDate.getFullYear())
                {
                    count++;
                }
            })
            resolve(count);
        })
        .catch(err => {
            reject(err);
        })
    })
}


function getNumOrderCurrMonth(){
    const currDate = new Date();
    const numDateOfMonth = new Date(currDate.getFullYear(),currDate.getMonth()+1,0).getDate();
    console.log(numDateOfMonth);
    let numOrders= Array();
    for( let i =0 ; i<numDateOfMonth;i++)
    {
        numOrders.push(0);
    }
    return new Promise((resolve,reject ) => {
        orderModel.find()
        .then(orders => {
            orders.forEach(item => {
                dateOfOrder=parseDate(item.date);
                if(dateOfOrder.getMonth() == currDate.getMonth() && dateOfOrder.getFullYear() == currDate.getFullYear())
                {
                    numOrders[dateOfOrder.getDate()-1]++;
                }
            })
            resolve(numOrders);
        })
        .catch(err => {
            reject(err);
        })
    })
}

function getNumOrderCurrYear(){
    const currDate = new Date().getFullYear();
    let numOrders = Array();
    for( let i =0 ; i<12;i++)
    {
        numOrders.push(0);
    }
    return new Promise((resolve,reject ) => {
        orderModel.find()
        .then(orders => {
                 orders.forEach(item => {
                dateOfOrder=parseDate(item.date);
                if(dateOfOrder.getFullYear() == currDate)
                {
                    numOrders[dateOfOrder.getMonth()]++;
                }
            })
            resolve(numOrders);
        })
        .catch(err => {
            reject(err);
        })
    })
}

function getRevenueByProductTypeOfMonth(month){
    const arrProductType = {
        'trai-cay':0,
        'rau-cu':0,
        'thuc-uong':0,
        'do-kho':0
    }
    const currYear = new Date().getFullYear();
    return new Promise((resolve,reject) => {
        orderModel.find()
        .populate('idProduct',['type'],'Product')
        .then(data => {
           
            data.forEach((item,index) => {
                if(parseDate(item.date).getMonth()+1 == month && currYear == parseDate(item.date).getFullYear())
                {
                   
                    arrProductType[item.idProduct.type] += item.totalPrice;
                }    
            })
            resolve(arrProductType);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
        })
}

function parseDate(str)
{
    const date = new Date(str.substr(1,10));
    return date;
}

module.exports={
    getOrderListHaveProcessed        :  getOrderListHaveProcessed,
    getOrderListPending :getOrderListPending,
    updateOrderStatus    : updateOrderStatus,
    getRevenue           : getRevenue,
    getNumOrderCurrMonth : getNumOrderCurrMonth,
    getNumOrderCurrYear  : getNumOrderCurrYear,
    getOrderToday        : getOrderToday,
    getRevenueByProductTypeOfMonth:getRevenueByProductTypeOfMonth,

}