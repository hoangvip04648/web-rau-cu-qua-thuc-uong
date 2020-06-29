const categoryModel=require('../../model/category.model');

const productModel=require('../../model/product.model');
const path = require('path');


function createCategory(body)
{   
    
    return new Promise((resolve,reject)=>{
        if(!body.name || !body.type){
            return reject({message:"Vui lòng nhập vào đầy đủ thông tin."})
        }
        else{
            categoryModel.findOne({name: body.name})
            .then(founded=>{
                if(founded)
                {
                    return reject({message:'danh muc da ton tai'});
                }
                else
                {
                    const category=new categoryModel({  
                        name:body.name,
                        type:body.type,
                        image :body.image ||''
                    });
                    category.save()
                    .then(()=>{
                        categoryModel.find()
                        .then(founded1=>{
                            return resolve(
                                {   
                                    message:'tao danh muc thanh cong',
                                    data:founded1
                                })
                        })
                    
                    })
                }
            })
            .catch(err=>{
                return reject(err);
            })
        }
    }
    )
}

function deleteCategory(id)
{
    return new Promise((resolve,reject)=>{
        categoryModel.findByIdAndDelete(id)
        .then(data=>{
            categoryModel.find()
            .then(founded=>{
                 resolve({message:'xoa danh muc thanh cong',data:founded});
            })
            .catch(err=>{
                 reject(err);
            })
        })
        .catch(err=>{
             reject({message:'id danh muc khong hop le'})
        })
    })
}

function getListCategory(){

    return new  Promise((resolve,reject)=>{
        categoryModel.find()
        .then(founded=>{
           
            return resolve(founded);
            
        })
        .catch(err=>{
            return reject({message:"Lỗi chỗ getListCategory"});
        })
    })
}


function getCategoryById(id)
{
    return new Promise((resolve,reject)=>{
        categoryModel.findById(id)
        .then(founded=>{
            if(!founded)
            {
                return reject({message:'danh muc khong ton tai'});
            }
            else
            {
                resolve(founded);
            }
        })
        .catch(err=>{
            reject({message:'id danh muc khong hop le'})
        })
    })
}



function updateCategoryImage(body,file){
    return new Promise((resolve,reject)=>{
        if(!file){
            reject({message :"file không tồn tại"})
        }
        else{
            const nameImage=makeid(20)+getExtension(file.name);
            categoryModel.findByIdAndUpdate(body.id,
                {image : nameImage})
            .then(
                categoryModel.find()
                .then(data=>{

                    file.mv(path.join(__dirname,'../../public/upload/category/'+nameImage),(err=>{
                        reject(err);
                    }))

                    resolve(data);
                })
            )
            .catch(err=>{
                reject(err);
            })
        }
    })
}

function updateCategory(body){
    return new Promise((resolve,reject)=>{
        categoryModel.findByIdAndUpdate(body.id,{
            name:body.name,
            type : body.type
        })
        .then(
            resolve({message : "Cập nhật thành công"})
        )
        .catch(err=>{
            reject(err);
        })
    })
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

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

module.exports={
    createCategory         : createCategory,
    deleteCategory         : deleteCategory,
    getCategoryById        : getCategoryById,
    getListCategory        : getListCategory,
    updateCategoryImage    : updateCategoryImage,
    updateCategory         : updateCategory
    // addProductIntoCategory : addProductIntoCategory,
    // removeProduct          : removeProduct
}