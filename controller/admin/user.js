const userModel=require('../../model/user.model');


function getAllUser(){
    return new Promise((resolve,reject)=>{
        userModel.find()
        .then(founded=>{
            if(founded.length===0){
                return reject({message:'Không có tài khoản nào'});
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

function findUserByEmail(email)
{
    return new Promise((resolve,reject)=>{
        userModel.findOne({email:email})
        .then(founded=>{
            if(!founded)
            {
                return reject({message:'khong tim thay user'});
            }
            else
            {
                return resolve(founded);
            }
        })
        .catch(err=>{
            return reject(err);
        })
    })
}

module.exports={
    getAllUser      : getAllUser,
    findUserByEmail : findUserByEmail
}
