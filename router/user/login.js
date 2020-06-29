const Router=require('express').Router();
const loginController=require('../../controller/user/login');
Router.post('/',login);

function login(req,res,next)
{
    const user=req.body;
    if(!user)
    {
        res.json({message:'tai khoan hoac mat khau khong duoc de trong'});
    }
    else
    {
        loginController.login(user)
        .then(data=>{
            res.cookie('x-access-token', data.token, { maxAge: 9000000000000, httpOnly: true });
            data.user.avatar = req.protocol +"://" + req.get('host') +"/upload/avatar/"+ data.user.avatar;
            res.json(data);
        })
        .catch(err=>{
            res.json(err);
        })
    }
}

module.exports=Router;