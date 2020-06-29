const Router=require('express').Router();
const userController=require('../../controller/user/user');
const file = require('fs')
const nodemailer = require('nodemailer');
Router.put('/upAvatar/:id',updateAvatar);
Router.post('/tao-tai-khoan',createUser);
Router.put('/thay-doi-thong-tin',updateUser);
Router.get('/thong-tin-ca-nhan/:id',getUser);
Router.post('/quen-mat-khau',handleForgotPassword);
Router.post('/xac-thuc-mat-khau/:token',handleAuthForgorPassword);
Router.post('/doi-mat-khau',changePassword);

function getUser(req,res,next){
    const user=req.params.id;
    userController.getUser(user)
    .then(data=>{
        data.avatar = req.protocol + "://" + req.get('host') +"/upload/avatar/"+ data.avatar;
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

function createUser(req,res,next){
    const user=req.body;
    userController.createUser(user)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}


function updateUser(req,res,next){
    const user=req.body;
    userController.updateUser(user)
    .then(data=>{
        console.log(data);
        data.data.avatar= req.protocol + "://" + req.get('host') +"/upload/avatar/"+ data.data.avatar;
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}
function updateAvatar(req,res,next){
    let file = req.files.file;
    
    const id = req.params.id;
    userController.updateAvatar(file,id)
    .then(data=>{
        data.avatar = req.protocol + "://" + req.get('host') +"/upload/avatar/"+ data.avatar;
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

function handleForgotPassword(req,res,next){
    userController.handleForgotPassword(req.body.email)
    .then(data => {
        console.log(data);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '17521230@gm.uit.edu.vn',
              pass: '1068936240'
            }
          });
          
          var mailOptions = {
            from: '17521230@gm.uit.edu.vn',
            to: req.body.email,
            subject: 'Quên mật khẩu',
            text: `${ req.protocol + '://' + req.get('host')}/page/xac-thuc-mat-khau/?token=${data.token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.json('Bạn kiểm tra email để đổi mật khẩu mới !! ')
            } else {
              console.log('Email sent: ' + info.response);
              res.json('Bạn kiểm tra email để đổi mật khẩu mới !! ')
            }
          })
    })

    .catch(err => {
        res.json(err);
    })

}

function handleAuthForgorPassword(req,res,next)
{
    const token = req.params.token;
    userController.handleAuthForgorPassword(token,req.body.password)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
}
function changePassword(req,res,next){
    userController.updatePassword(req.body)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

module.exports=Router;