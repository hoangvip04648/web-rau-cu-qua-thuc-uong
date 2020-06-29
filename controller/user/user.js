const userModel=require('../../model/user.model');
const bcryptjs=require('bcryptjs');
const path = require('path');
const jwt = require('../../untils/jwt');
const nodemailer = require('nodemailer');

function getUser(id){
    return new Promise((resolve,reject)=>{
        userModel.findById(id)
        .then(founded=>{
            if(!founded){
                return reject({message:'Tài khoản không tồn tại.'});
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

function createUser(body){
    return new Promise((resolve,reject)=>{
        userModel.findOne({email:body.email})
        .then(founded=>{
            if(founded)
            {
                return reject({message:'Email đã tồn tại!'});
            }
            else{
                bcryptjs.hash(body.password,10)
                .then(hash=>{
                    const User=new userModel({
                        email:body.email,
                        password:hash
                    });
                    User.save()
                    .then(data=>{
                        return resolve({message:'Tạo tài khoản thành công!',success:true});
                    })
                    .catch(err=>{
                        return reject(err);
                    })
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

function updateUser(body){
    return new Promise((resolve,reject)=>{
        userModel.findByIdAndUpdate(body.id)
        .then(founded=>{
            if(!founded){
                return  reject({message:'ID tài khoản không tồn tại.'})
            }
            else{
                if(body.email){founded.email=body.email};
                if(body.password){founded.password=body.password};
                if(body.name){founded.name=body.name};
                if(body.avatar){founded.avatar=body.avatar}
                if(body.address){founded.address=body.address}
                if(body.phoneNumber){founded.phoneNumber=body.phoneNumber}
                if(body.gender){founded.gender=body.gender}
                if(body.date){founded.date=body.date}
                founded.save()
                .then(data=>{
                    return resolve({message:'Cập nhật thành công.',data});
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

function updateAvatar(file,id){
    return new Promise((resolve,reject)=>{
        if(file==undefined){
            reject({message:"Không thể đọc file"});
        }
        else{
            const nameAvatar=makeid(20)+getExtension(file.name);
            console.log(nameAvatar);
            console.log(id)
            userModel.findById(id)
            .then(data=>{
                    data.avatar=nameAvatar;
                    data.save();
                    file.mv(path.join(__dirname,'../../public/upload/avatar/'+nameAvatar),(err=>{
                        if(err){
                            reject(err)
                        }
                        else{
                            resolve(data);
                        }
                    }))
                   
                })
            .catch(err=>{
                reject(err)
            })
        }
    })
}

function isExistUser(idUser){
    return new Promise((resolve,reject) => {
        userModel.findById(idUser)
        .then(founded => {
            if(founded){
                resolve(true);
            }
            else
            {
                resolve(false);
            }
        })
        .catch(err => {
            reject({message: 'id user khong ton tai',err:err})
        })
    })
}

function getUserByToken(token){
    return new Promise((resolve,reject) => {
        jwt.verify(token,(err,decode) => {
            if(err)
            {
                reject(err);
            }
            else
            {
                userModel.findOne({email:decode.email})
                .then(user => {
                    resolve(user);
                })
                .catch(err =>{
                    reject(err);
                })
            }
        })
    })
}

function handleForgotPassword(email)
{
    return new Promise((resolve,reject) => {
        userModel.findOne({email:email})
        .then(founded => {
            if(founded == null)
            {
                resolve({success:false,message:'Email bạn nhập không tồn tại'})
            }
            else
            {
             jwt.sign(email,(err,token) => {
                 if(err)
                 {
                     reject(err);
                 }
                 else
                 {
                     resolve({token:token});
                 }
             })   
                 
            }
        })   
    })
  
}

function handleAuthForgorPassword(token,newPass)
{
    return new Promise((resolve,reject) => {
        jwt.verify(token,(err,decode) => {
            if(err)
            {
                reject(err);
            }
            else
            {
                console.log(decode)
                userModel.findOne({email:decode})
                .then(founded => {
                    console.log(founded);
                    if(founded == null)
                    {
                        reject({message:'Email không tồn tại',success:false});
                    }
                    else
                    {
                        bcryptjs.hash(newPass,10,(err,hash) => {
                            if(err)
                            {
                                reject(err);
                            }
                            else
                            {
                                founded.password = hash;
                                founded.save()
                                .then(()=>{
                                    resolve({message:'Đổi mật khẩu thành công',success:true});
                                })
                                .catch(err => {
                                    reject(err);
                                })
                            }
                        })
                    }
                })
            }
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

function updatePassword(body){
    return new Promise((resolve,reject)=>{
        bcryptjs.hash(body.currentPassword,10)
        .then(oldPassword=>{
            userModel.findOneAndUpdate({email:body.email,password:oldPassword})
            .then(data=>{
                if(data){
                    bcryptjs.hash(body.newPassword,10)
                    .then(hash=>{
                        data.password= hash;
                        console.log(data)
                        data.save()
                        .then(data=>{
                            return resolve({message:'Cập nhật thành công.',data});
                        })
                        .catch(err=>{
                            return reject(err);
                        })
                       
                    })
                    .catch(err=>{
                        reject(err);
                    })
                      
                 }
                 else{
                     reject("Vui lòng nhập lại mật khẩu cũ");
                 }
            })
            .catch(err=>{
                reject({message:"Không thể thay đổi mật khẩu, vui lòng thử lại"});
            })
    
        })
        .catch(err=>{
            reject(err);
        })
        
    })
}

module.exports={
    createUser     : createUser,
    updateUser     : updateUser,
    getUser        : getUser,
    updateAvatar   : updateAvatar,
    isExistUser    : isExistUser,
    getUserByToken : getUserByToken,
    handleForgotPassword: handleForgotPassword,
    handleAuthForgorPassword:handleAuthForgorPassword,
    updatePassword : updatePassword
}