const path=require('path');

function handleUploadImage(file){
    return new Promise((resolve,reject) => {
        const nameImage=makeid(20)+getExtension(file.name);
        file.mv(path.join(__dirname,'../../public/upload/image-reference/'+nameImage),(err) =>{
            if(err)
            {
                reject({message:'luu hinh anh khong thanh cong'});
            }
            else
            {
                resolve({message:'luu hinh anh thanh cong',imageUrl:`/upload/image-reference/${nameImage}`});
            }
        });
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
    handleUploadImage : handleUploadImage
}