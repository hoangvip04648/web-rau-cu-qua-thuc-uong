const referenceMobileModel=require('../../model/reference-mobile.model');

function getAllReference()
{
    return new Promise((resolve, reject) => {
        referenceMobileModel.find()
        .then(references => {
            resolve(references);
        })
        .catch(err => {
            reject(err);
        })
    })
}

function getReferenceById(id) {
    return new Promise((resolve,reject) => {
        referenceMobileModel.findById(id)
        .then(founded=>{
            if(!founded)
            {
                reject({message:'khong tim thay bai tham khao phu hop id'});
            }
            else
            {
                resolve(founded);
            }
        })
        .catch(err =>{
            reject(err);
        })
    })
}

module.exports={
    getAllReference  : getAllReference,
    getReferenceById : getReferenceById
}