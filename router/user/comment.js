const Router = require('express').Router();
const commentController = require('../../controller/user/comment');

Router.get('/',getCommentByQuery);
Router.post('/them-binh-luan',createComment);
Router.put('/cap-nhat/:id',updateComment);
Router.delete('/xoa-binh-luan/:id',deleteCommentById);

function getCommentByQuery(req,res,next){
    if(!req.query.id || !req.query.page)
    {
        res.json({message:'id page là cần thiết'})
    }
    else
    {
        const query={
            idPageComment:req.query.id,
            pageComment:req.query.page,
            amount: parseInt(req.query.amount) || 8,
            skip: parseInt(req.query.skip) || 0
        }
        commentController.getCommentByQuery(query)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
    }
    
}

function createComment(req,res,next){
    const commentBody=req.body;
    if(!commentBody.idUser || !commentBody.idPageComment || !commentBody.content || !commentBody.pageComment)
    {
        res.json({message:'content , id,page comment khong duoc de trong'});
    }
    else
    {
        commentController.createComment(commentBody)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.json(err);
        })
    }
   
}

function deleteCommentById(req,res,next){
    const token = req.headers['x-access-token'];
    commentController.deleteCommentById(req.params.id,token)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })

}

function updateComment(req,res,next){
    const token = req.headers['x-access-token'];
    const {content} = req.body;
    if(content == "")
    {
        res.json({success:false,message:'noi dung khong duoc de trong'});
    }
    else
    {
        commentController.updateComment(req.params.id,content,token)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
    }
    
    
}

module.exports = Router;