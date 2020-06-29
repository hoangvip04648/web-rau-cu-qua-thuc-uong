const slideModel = require('../../model/slide-homepage.model');

function getAllSlide()
{
     return new Promise((resolve,reject) => {
         slideModel.find()
         .then(founded => {
             resolve(founded);
         })
         .catch(err => {
             reject({message:'chưa có bảng slide',success:false});
         })
     })
}

module.exports={
    getAllSlide : getAllSlide
}