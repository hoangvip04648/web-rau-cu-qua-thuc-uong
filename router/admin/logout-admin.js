const Router = require('express').Router();


Router.get('/',handleLogout);

function handleLogout(req,res,next)
{
    res.clearCookie("x-access-token");
    res.json({message:'dang xuat thanh cong'});
}

module.exports = Router;