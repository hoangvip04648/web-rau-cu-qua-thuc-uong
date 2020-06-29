const slideModel = require('../../model/slide-homepage.model');

function createSlide(body){
    return new Promise((resolve,reject) => {
        const newSlide = new slideModel({
            title:body.title,
            subTitle:body.subTitle,
            background:body.background,
            image: body.image,
            logoText:body.logoText
        });
       newSlide.save()
       .then(data => {
           resolve({message:'Thêm slide thành công',success:true});
       })
       .catch(err => {
           reject({message:'Thêm slide thất bại',success:false})
       })
    })
}

function updateSlide(id,body)
{
    return new Promise((resolve,reject) => {
        slideModel.findByIdAndUpdate(id,body)
        .then(data => {
            resolve({message:'Cập nhật thành công',success:true});
        })
        .catch(err => {
            reject({message:'Cập nhật thất bại do slide không tồn tại',success:false});
        })
    })
}

function deleteSlide(id)
{
    return new Promise((resolve,reject) => {
        slideModel.findByIdAndDelete(id)
        .then(data => {
            resolve({message:'xóa slide thành công ',success: true});
        })
        .catch(err => {
            reject({message:'xóa slide thất bại do id không hop lệ',success:false,err:err})
        })
    })
}

module.exports={
    createSlide : createSlide,
    updateSlide : updateSlide,
    deleteSlide : deleteSlide
}