const commentModel = require('../../model/comment.model');
const userController = require('./user');
const mongoose =require('mongoose');

function createComment(body){
    return new Promise((resolve,reject)=>{
        const Comment = new commentModel ({
            idUser : new mongoose.Types.ObjectId(body.idUser),
            idPageComment : body.idPageComment,
            content : body.content,
            pageComment : body.pageComment,
            date:   JSON.stringify(new Date())
        })
        Comment.save()
        .then(data=>{
            if(!data){
                reject({message : 'Không tạo được comment'})
            }
            else{
                resolve({message:'Coment thành công',data})
            }
        })
        .catch(err=>{
            reject(err)
        })
    })
}

function deleteCommentById(id,token){
    return new Promise((resolve,reject)=>{
        userController.getUserByToken(token)
        .then(user => {
            if(user !=null)
            {
                commentModel.findById(id)
                .then(data=>{
                    if(data.idUser==user._id){
                        commentModel.findById(id)
                        .then(()=>{
                            resolve({message:'Xóa thành công comment',success:true});
                        })
                        .catch(err => {
                            reject({success:false,message:'id khong hop le'})
                        })
                    }
                    else{
                        reject({message:'ban khong the xoa binh luan cua nguoi khac',success:false});
                    }
                })
                .catch(err=>{
                    reject(err);
                })
            }
            else
            {
                reject({success:false,message:'Ban khong co quyen xoa binh luan nay'})
            }
           
        })
        .catch(err => {
            reject({message:'ban chua dang nhap',err});
        })
       
    })
}

function getCommentByQuery(query)
{
    return new Promise((resolve,reject) => {
        commentModel.find({idPageComment:query.idPageComment,pageComment:query.pageComment})
        .limit(query.amount)
        .skip(query.skip)
        .sort({"date":-1})
        .populate('idUser',['name','avatar'],'User')
        .exec((err,data) => {
            if(err){
                reject({success:false,message:'id khong ton tai'});
            }
            resolve({success:true,data:data});
        })
        
    })
}

function updateComment(id,content,token){
    return new Promise((resolve,reject) => {
        userController.getUserByToken(token)
        .then(user => {
            if(user != null)
            {
                commentModel.findById(id)
                .then(data => {
                    if(data.idUser == user._id)
                    {
                        commentModel.findByIdAndUpdate(id,{content:content})
                        .then(()=>{
                            resolve({success:true,message:'cap nhat binh luan thanh cong'})
                        })
                        .catch(err => {
                            reject({success:false,message:'id khong hop le'});
                        })
                    }
                    else
                    {
                        reject({success:false,message:'ban khong the cap nhat binh luan cua nguoi khac'})
                    }
                })
                .catch(err => {
                    reject({success:false,message:'id comment khong hop le'})
                })
            }
            else
            {
                reject({success:false,message:'ban khong co quyen sua binh luan nay'})
            }
        }).catch(err => {
            reject({success:false,err})
        })
    })
}

module.exports ={
    createComment : createComment,
    deleteCommentById : deleteCommentById,
    getCommentByQuery : getCommentByQuery,
    updateComment     : updateComment
}