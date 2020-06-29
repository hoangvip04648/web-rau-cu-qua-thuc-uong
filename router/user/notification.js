const notificationController = require('../../controller/user/notification');
const Router = require('express').Router();

Router.post('/dang-ky-nhan-tin',(req,res,next) => {
    const body = req.body;
    notificationController.createEmailSubcribe(body)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
})


module.exports = Router;