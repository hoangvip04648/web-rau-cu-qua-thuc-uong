const voteModel = require('../../model/vote.model');
const productModel = require('../../model/product.model');


function getVoteByIDProduct(id){
    return new Promise((resolve,reject)=>{
        voteModel.find({idProduct : id})
        .then(data=>{
        
            if(data.length == 0){
                reject({message: "Không có vote"});
            }   
            else{
                resolve({message:'Có vote',data});
            }
        })
        .catch(err=>{
            reject(err);
        })   
    })
}

function createVote(body){
    return new Promise((resolve,reject)=>{
        voteModel.findOne({idProduct:body.idProduct,idUser:body.idUser}).then(vote=>{
            if(vote){
                voteModel.findOneAndUpdate({idProduct:body.idProduct,idUser:body.idUser},{'numberStar' : body.numberStar},(err,doc)=>{}).then(data=>{
                    averageNumberStar(body.idProduct)
                .then(rate => {
                    productModel.findByIdAndUpdate(body.idProduct,{rate:rate})
                    .then(data => {
                        console.log(rate);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
                    resolve({message:'thành công',data});
                }).catch(err=>{
                    reject({message:'không thành công',err})
                })
            }else{
                const Vote = new voteModel({
                    idUser : body.idUser,
                    idProduct : body.idProduct,
                    numberStar : body.numberStar
                });
                Vote.save()
                .then(data=>{
                    averageNumberStar(body.idProduct)
                    .then(rate => {
                        productModel.findByIdAndUpdate(body.idProduct,{rate:rate})
                        .then(data => {
                            console.log(rate);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    })
                    resolve({message:'Tạo vote thành công',data});
                })
                .catch(err=>{
                    reject(err);
                })
            }
           
        }).catch(err=>{
            reject(err);
        });
    })
   
}

function deleteVoteByIdProduct(id){
    return new Promise((resolve,reject)=>{
        voteModel.deleteMany({idProduct:id},(err)=>{if(err){reject(err)}else{resolve({message:"Xóa thành công đánh giá"})}})
        .then(data =>{
           
        })
        .catch(err=>{
            reject(err);
        })
    })
}

function averageNumberStar(idProduct)
{
    return new Promise((resolve,reject) => {
        voteModel.find({idProduct : idProduct})
        .then(founded => {
            if(founded.length>0)
            {
                let sumVote = 0;
                voteModel.countDocuments({idProduct:idProduct},(err,numVote)=>{
        
                    if(err => {
                        reject({message:'san pham khong ton tai',err:err});
                    })
                   
                     for(let i=0;i<founded.length;i++)
                     {
                         sumVote += parseInt(founded[i].numberStar) ;
                     }
                
                    const pointVote = Math.round(sumVote * 10 / numVote)/10 ;
                    resolve(pointVote);
                })
            }
            else
            {
                resolve({message:'Hiện chưa có đánh giá nào về sản phẩm này',success:false});
            }
        })
        .catch( err => {
            reject(err);
        })
    
    })
}

function getRateProductByIdUser(idUser,idProduct){
    return new Promise((resolve,reject) => {
        voteModel.findOne({idUser:idUser,idProduct:idProduct})
        .then(data => {
            if(data == null)
            {
                resolve(0)
            }
            else{
               
                resolve(data.numberStar);
            }
           
        })
        .catch(err => {
            reject(err);
        })
    })
}

function countVoteByIdProduct(idProduct)
{
    return new Promise((resolve,reject) => {
        voteModel.countDocuments({idProduct:idProduct})
        .then(number => {
            resolve(number);
        })
        .catch(err => {
            reject(err);
        })
    })
}

module.exports = {
    createVote : createVote,
    getVoteByIDProduct : getVoteByIDProduct,
    deleteVoteByIdProduct : deleteVoteByIdProduct,
    averageNumberStar     : averageNumberStar,
    getRateProductByIdUser: getRateProductByIdUser,
    countVoteByIdProduct  : countVoteByIdProduct
}
