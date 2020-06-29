const referenceMobileModel=require('../../model/reference-mobile.model');
const path=require('path');
function createReferenceMobile(reference,files){
    return new Promise((resolve,reject) => {
        let arrImage= new Array();
        let imageName="";
        let count=0;
        if(files.length>0)
        {
            for(let i=0;i<files.length;i++)
            {
                imageName = makeid(10)+getExtension(files[i].name);
                files[i].mv(path.join(__dirname+'../../../public/upload/image-reference/')+imageName,(err) => {
                    if(err){
                        reject(err);
                    }
                    else
                    {
                        count++;
                        arrImage.push('/upload/image-reference/'+imageName);
                        if(count==files.length)
                            {
                            
                                const newReference = new referenceMobileModel({
                                    title:reference.title,
                                    image:arrImage,
                                    content:reference.content,
                                    date:reference.date,
                                    description:reference.description
                                }) 
                                newReference.save()
                                .then(data => {
                                    resolve({message:'them bai viet thanh cong',success:true})
                                })
                                .catch(err => {
                                    reject({message:'them bai viet that bai',err:err});
                                })
                            } 
                    }
                }) 
               
            }
            
        }
        else
        {
            const newReference = new referenceMobileModel({
                title:reference.title,
                content:reference.content,
                date:reference.date,
                description:reference.description
            }) 
            newReference.save()
            .then(data => {
                resolve({message:'them bai viet thanh cong',success:true})
            })
            .catch(err => {
                reject({message:'them bai viet that bai',err:err});
            })
        }
       
       
        
    })
   
    
}

function updateReference(id,reference)
{
    return new Promise((resolve,reject) => {
        referenceMobileModel.findByIdAndUpdate(id,reference)
        .then(()=>{
            resolve({message:"cap nhat thanh cong",success:true})
        })
        .catch(err => {
            reject(err);
        })
    })
}

function deleteReference(id)
{
    return new Promise((resolve,reject) => {
        referenceMobileModel.findByIdAndDelete(id)
        .then(()=>{
            resolve({message:'xoa bai viet thanh cong',success:true});
        })
        .catch(err => {
            reject({message:'xoa bai viet that bai',err:err});
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
    createReferenceMobile : createReferenceMobile,
    updateReference       : updateReference,
    deleteReference       : deleteReference
}