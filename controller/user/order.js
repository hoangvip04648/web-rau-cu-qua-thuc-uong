const orderModel = require('../../model/order.model');
const userController = require('./user');
const productController = require('./product');
const nodemailer = require('nodemailer');

function createOrder(orderBody){
    const orderCode = makeid(10).toUpperCase();
    return new Promise((resolve,reject)=>{
        userController.isExistUser(orderBody.idUser)
      .then(val => {
          if(val)
          {
              const action = [];
              const orders = [];
              let temp;
              for(let i=0; i<orderBody.products.length;i++)
              {
                 temp = productController.isExistProduct(orderBody.products[i].idProduct);
                action.push(temp);
              }
             
              Promise.all(action)
              .then(values => {
    
                 for (let i =0 ;i< values.length;i++)
                 {
                     if(values[i])
                     {
                         orders.push(new orderModel({
                             orderCode : orderCode,
                             idProduct : orderBody.products[i].idProduct,
                             idUser    : orderBody.idUser,
                             numberItem: orderBody.products[i].numberItem,
                             totalPrice: orderBody.products[i].totalPrice,
                             date      : JSON.stringify(new Date()),
                             destination: orderBody.destination,
                             note       : orderBody.note  
                         }).save().then(()=>Promise.resolve(true).catch(err=>Promise.reject(err))))
                     }
                 }
                 Promise.all(orders)
                 .then(() => {
                     const productInfo = orderBody.products.map(item => `Tên sản phẩm : ${item.name}, Số lượng: ${item.numberItem} \n`);
                     const content = `Chúc mừng bạn đã đặt hàng thành công \n 
Thông tin đơn hàng: \n
Mã đơn hàng: ${orderCode} \n
Địa chỉ nhận hàng: ${orderBody.destination} \n
${productInfo}
tổng giá : ${orderBody.totalPrice}đ
                     `
                     sendMailOrder(orderBody.idUser,'Thông tin đơn hàng',content)
                     .then(()=>{
                         console.log('gui mail thanh cong');
                     })
                     .catch(err => {
                        console.log(err);
                     })
                      resolve({message:'chuc mung ban da dat hang thanh cong',success:true});
                 })
                 .catch(err=>{
                     console.log(err);
                      reject(err);
                 })
              })
              .catch(err => {
                  console.log(err);
                  reject(err);
              })
          }
      }).catch(err => {
          reject(err);
      })
    })
}

function sendMailOrder(idUser,subject,content){
    return new Promise((resolve,reject) => {
        userController.getUser(idUser)
        .then(user => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: '17521230@gm.uit.edu.vn',
                  pass: '1068936240'
                }
              });
              
              var mailOptions = {
                from: '17521230@gm.uit.edu.vn',
                to: user.email,
                subject: subject,
                text: content
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  reject(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  resolve(true);
                }
              });
        })
    })
}

function getListOrderByIdUser(id){
    return new Promise((resolve,reject)=>{
        orderModel.find({idUser : id})
        .sort({'date':-1})
        .populate("idProduct",["image","_id","name"],"Product")
        .then(data=>{
            if(data.length!=0)
            {
                resolve({message:`Lấy thành công ${data.length} Order`,data})
            }
            else{
                resolve({message:'Không có order nào'})
            }
            
        })
        .catch(err=>{
            reject(err);
        })
    })
}


function deleteListOrderByIdOrder(id){
    return new Promise((resolve,reject)=>{
        orderModel.findByIdAndDelete(id)
        .then(data=>{
            if(data.length==0){
                reject({message:'Không tồn tại order'});
            }
            else{
                resolve({message:'Xóa thành công order',data});
            }
        })
    });
}



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function getListOrderByNumberItem(id){
    return new Promise((resolve,reject)=>{
        orderModel.find()
        .populate("idProduct",["image","_id","name"],"Product")
        .then(data=>{
            let listProduct = [];
            var flag=0;
            data.forEach(item => {
                console.log(item)
                for(var i=0;i<listProduct.length;i++){
                    if(item.idProduct._id===listProduct[i]._id){
                        listProduct[i].numberItem+=item.numberItem;
                        flag=1;
                    }
                }
              if(flag==0){
                listProduct.push({"_id":item.idProduct._id,"name":item.idProduct.name,"image":item.idProduct.image[0],"numberItem":item.numberItem});              }
              flag=0;
            });
            resolve(listProduct.sort(compareValues('numberItem','desc')));
        })
        .catch(err=>{
            reject(err);
        })
    })
}

function compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // không tồn tại tính chất trên cả hai object
          return 0; 
      }
    
      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
    
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
   }

module.exports = {
    createOrder : createOrder,
    getListOrderByIdUser : getListOrderByIdUser,
    deleteListOrderByIdOrder : deleteListOrderByIdOrder,
    getListOrderByNumberItem : getListOrderByNumberItem
}