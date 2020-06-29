const Router =  require('express').Router();
const voteController = require('../../controller/user/vote');

Router.get('/danh-gia-san-pham/:id',getVoteByIDProduct);
Router.post('/',createVote);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
Router.delete('/:id',deleteVoteByIdProduct);
Router.get('/point-vote/:id',getAverageStar);
Router.get('/san-pham',getRateProductByIdUser);

function getVoteByIDProduct(req,res,next){  
    voteController.getVoteByIDProduct(req.params.id)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

function createVote(req,res,next){
    voteController.createVote(req.body)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

function deleteVoteByIdProduct(req,res,next){   
    voteController.deleteVoteByIdProduct(req.params.id)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

function getAverageStar(req,res,next){
    voteController.averageNumberStar(req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
}

function getRateProductByIdUser(req,res,next)
{
    const {idUser,idProduct} = req.query;
    voteController.getRateProductByIdUser(idUser,idProduct)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
}

module.exports = Router;