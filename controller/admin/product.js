const productModel=require('../../model/product.model');
const categoryModel=require('../../model/category.model');
const categoryController= require('./category');
const {handeSentMail} = require('../user/notification');
const fs= require('fs');
var path = require('path');

function createProduct(body,fileNames){
    return new Promise((resolve,reject)=>{
        productModel.findOne({name:body.name})
        .then(founded=>{
            if(founded)
            {
                return reject({message:'ten san pham da ton tai'});
            }
            else{
                var date = new Date();
                const product=new productModel({
                    name:body.name,
                    price:body.price,
                    discount:body.discount,
                    description:body.description,
                    image:fileNames,
                    date:date,
                    idCategory:body.idCategory,
                    type:body.type,
                    place:body.place,
                    expiryDate:body.expiryDate,
                    createDate:body.createDate
                })
                product.save()
                .then(data=>{
                    let content = `
                        Thông tin sản phẩm: 
                        tên sản phẩm: ${body.name} \n
                        giá: ${body.price} \n
                        discount: ${body.discount} \n
                        ngày sản xuất: ${body.createDate} \n
                        hạn sử dụng: ${body.expiryDate}
                    `
                    handeSentMail('Cửa hàng có thêm sản phẩm mới',content);
                    return resolve({
                        message:'tao san pham thanh cong',
                        data
                    });
                })
                .catch(err=>{
                    return reject(err);
                })
            }
        })
        .catch(err=>{
            return reject(err);
        })
    })
}

function deleteProduct(id){
    return new Promise((resolve,reject)=>{
        productModel.findByIdAndDelete(id)
        .then(()=>{
            productModel.find()
            .then(products=>{
                resolve({message:'xoa san pham thanh cong',products : products});
            })
           
        })
        .catch(err=>{
             reject({message:'id san pham khong hop le'});
        })
    })
}

function countProductByCategory(){
   
    return new Promise((resolve,reject) => {
        let arrayNumProduct=Array();
        categoryModel.find({}).then(categories=>{
            for(let i=0;i<categories.length;i++){
                categoryModel.find({idCategory:categories[i]._id}).count().then(numProduct=>{
                    categoryController.findNumProduct(categories[i]._id)
                    arrayNumProduct.push(numProduct);

               
                }).catch(err=>{
                     reject(err);
                })
            }
         resolve({"category":categories,"numProduct":arrayNumProduct});
        }).catch(err=>{
             reject(err);
        })
    })
}

function updateProduct(body,fileNames){
    return new Promise((resolve,reject)=>{
        productModel.find({_id:body.id}).then(data=>{           
            productModel.findByIdAndUpdate({_id:body.id},{
                name:body.name,
                description:body.description,
                price:body.price,
                discount:body.discount,
                idCategory:body.idCategory,
                image:[...data[0].image, ...fileNames],
                date:new Date(),
                type:body.type,
                place:body.place,
                expiryDate:body.expiryDate,
                createDate:body.createDate
            }).then(data=>{
                return resolve({message:'cap nhat san pham thanh cong',data});
            })
            .catch(err=>{
                return reject(err);
            })
        }).catch(err=>{
            reject(err);
        })    
    })
}   


function getProductById(id){
    return new Promise((resolve,reject)=>{
        productModel.findById(id)
        .then(data=>{
            resolve(data);
        })
        .catch(err=>{
            reject({message:'id khong hop le'});
        })
    })
}



function getProductsByCategoryId(idCategory)
{
    return new Promise((resolve,reject)=>{
        productModel.find({idCategory: idCategory})
        .then(listProduct=>{
            if(!listProduct)
            {
                reject({message:'danh muc hien chua co san pham nao'});
            }
            else
            {
                resolve(listProduct);
            }
        })
        .catch(err=>{
            reject({message:'id khong hop le'});
        })
    })
}

function deleteProductImage(idProduct,imageName){
    return new Promise((resolve,reject)=>{
        productModel.update({_id:idProduct},{$pullAll:{image: [imageName]}}).then(data=>{
            fs.unlink(path.join(__dirname, '../../public/product-image/')+imageName,(err)=>{
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve("ok ok");
                }
            });
        }).catch(err=>{
             reject(err);
        });
    });
}

function getAllProduct(){
    return new Promise((resolve,reject)=>{
        productModel.find().then(products=>{
            resolve(products);
        }).catch(err=>{
            reject(err);
        })
    });
}




module.exports={
    createProduct :  createProduct,
    updateProduct : updateProduct ,
    deleteProduct : deleteProduct,
    getProductById: getProductById,
    getProductsByCategoryId : getProductsByCategoryId,
    countProductByCategory:countProductByCategory,
    deleteProductImage:deleteProductImage,
    getAllProduct:getAllProduct
}