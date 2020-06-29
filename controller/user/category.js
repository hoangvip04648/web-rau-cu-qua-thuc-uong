const categoryModel=require('../../model/category.model');

function getCategory()
{
    return new Promise((resolve,reject)=>{
        categoryModel.find()
        .select(['_id','name','type','image'])
        .then(data=>{
            if(!data)
            {
                return reject({message:'database chua co danh muc nao'});
            }
            else
            {
                return resolve(data);
            }
        })
        .catch(err=>{
            return reject(err);
        }) 
    })
}

// function getDetailCategory(id)
// {
//     return new Promise((resolve,reject)=>{
//         categoryModel.findById(id)
//         .populate('product')
//         .exec((err,data)=>{
//             if(err)
//             {
//                 return reject({message:'id danh muc khong hop le'});
//             }
//             else
//             {
//                 return resolve(data);
//             }
          
//         })
//     });
// }

module.exports={
    getCategory       : getCategory,
    // getDetailCategory : getDetailCategory
}