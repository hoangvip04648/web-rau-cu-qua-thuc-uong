const referenceModel=require('../../model/reference.model');
function createReference(body){
    return new Promise((resolve,reject)=>{
        referenceModel.findOne({title:body.title})
        .then(founded=>{
            if(founded){
                resolve('tieu de bai tham khao da ton tai');
            }
            else{
                const reference=new referenceModel({
                    title:body.title,
                    image:body.image,
                    content:body.content,
                    previewContent:body.previewContent,
                    date:body.date,
                    description:body.description
                })
                reference.save()
                .then(data=>{
                    return resolve({message:'tao thanh cong reference',data});
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

function getReferenceById(id)
{
    return new Promise((resolve,reject) => {
        referenceModel.findById(id)
        .then( reference => {
            if(!reference)
            {
                reject({mesage:'bai viet khong ton tai'});
            }
            else
            {
                resolve(reference);
            }
        })
        .catch(err=>{
            reject({message:'id khong hop le'})
        })
    })
}

function updateReference(body,id){
    return new Promise((resolve,reject)=>{
        referenceModel.findByIdAndUpdate(id,body)
        .then(data=>{
            resolve({message:"cap nhat thanh cong",data});
        })
        .catch(err=>{
            return reject(err);
        })
    })
       
}
function deleteReference(idReference){
    return new Promise((resolve,reject)=>{
        referenceModel.findByIdAndDelete(idReference)
        .then(()=>{
            return resolve({message:'ban da xoa thanh cong'});
        })
        .catch(err=>{
            return reject({message:"id tham khao khong hop le"},err);
        })
    })
}

function getAllReferences()
{
    return new Promise((resolve,reject) => {
        referenceModel.find()
        .then(references => {
            resolve(references);
        })
        .catch( err =>{
            reject({mesage:'khong tim thay model reference'});
        })
    })
}

module.exports={
    createReference  : createReference,
    updateReference  : updateReference,
    getAllReferences : getAllReferences,
    deleteReference  : deleteReference,
    getReferenceById : getReferenceById
}