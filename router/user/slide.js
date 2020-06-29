const Router =require('express').Router();
const slideController =require('../../controller/user/slide');
Router.get('/list-slides',getAllSlides);

function getAllSlides(req,res,next){
    slideController.getAllSlide()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
}

module.exports= Router;