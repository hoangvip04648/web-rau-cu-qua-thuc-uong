const userModel=require('../../model/user.model');
const jwt=require('../../untils/jwt');
const bcryptjs=require('bcryptjs');

function login(body)
{
    return new Promise((resolve,reject)=>{
        userModel.findOne({email:body.email})
        .then(founded=>{
            if(!founded)
            {
                return reject({message:'Email không tồn tại'});
            }
            else
            {
                bcryptjs.compare(body.password,founded.password)
                .then(value=>{
                    if(!value)
                    {
                        return reject({message:'mat khau khong chinh xac'});
                    }
                    else
                    {
                        jwt.sign({email:body.email},(err,token)=>{
                            if(err)
                            {
                                return reject({message:err});
                            }
                            else{
                                return resolve({message:'ban da dang nhap thanh cong',token:token,user:founded});
                            }
                        })
                    }
                })
            }
        })
        .catch(err=>{
            return reject({message:'query khong hop le'});
        })
    })
}
module.exports={
    login : login
}