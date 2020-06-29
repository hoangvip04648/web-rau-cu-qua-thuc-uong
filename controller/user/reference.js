const referenceModel=require('../../model/reference.model');

function getAllReference(){
    return new Promise((resolve,reject)=>{
        referenceModel.find()
        .then(founded=>{
            if(founded.length===0)
            {
                return reject({message:'khong ton tai tham khao nao'});
            }
            else{
                return resolve(founded);
            }
        })
        .catch(err=>{
            return reject(err);
        })
    })
}


function searchReference(id){
    return new Promise((resolve,reject)=>{
        referenceModel.findById(id)
        .then(founded=>{
            if(!founded){
                return reject({message:'Tham khảo không tồn tại.'})
            }
            else{
                return resolve(founded);
            }
        })
        .catch(err=>{
            return reject(err);
        })
    })
}

function getReferenceByNumber(number)
{
    return new Promise((resolve,reject) => {
        referenceModel.find()
        .limit(number)
        .then(listReference=>{
            if(listReference.length>0)
            {
                resolve(listReference);
            }
            else{
                reject({message:'hien chua co bai viet nao'});
            }
        })
        .catch(err=>{
            reject({message:'database chua co bang reference'})
        })
    })
}

module.exports={
   getAllReference     : getAllReference,
   searchReference     : searchReference,
   getReferenceByNumber: getReferenceByNumber
}