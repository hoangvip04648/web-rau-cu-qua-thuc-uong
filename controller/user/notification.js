const notificationModel = require('../../model/notification.model');
const subcribeModel = require('../../model/email-subcribe.model');
const nodemailer = require('nodemailer');
function createEmailSubcribe(body){
    return new Promise((resolve,reject) => {
        const email = new subcribeModel({
            email:body.email
        })
        subcribeModel.findOne({email:body.email})
        .then(founded => {
            if(founded != null)
            {
                resolve({message:'Email đã tồn tại',success:false})
            }
            else
            {
                email.save()
                .then(()=>{
                    resolve({message:"Đăng ký nhận thông báo thành công",success:true})
                })
                .catch(err=>{
                    reject({message:'Đăng ký nhận email thất bại',err:err,success:false});
                })
            }
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
      
    })
}

function sendMailNotice(email,subject,content){
    return new Promise((resolve,reject) => {
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '17521230@gm.uit.edu.vn',
                pass: '1068936240'
            }
            });
            
            var mailOptions = {
            from: '17521230@gm.uit.edu.vn',
            to: email,
            subject: subject,
            text: content
            };
            
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
            });
    })
}

function handeSentMail(subject,content){
    subcribeModel.find()
    .then(data => {
        data.forEach(item => {
            sendMailNotice(item.email,subject,content)
        })
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    createEmailSubcribe : createEmailSubcribe,
    handeSentMail       : handeSentMail
}