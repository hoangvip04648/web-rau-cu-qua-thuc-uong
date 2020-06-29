const Router=require('express').Router();

const productController=require('../../controller/user/product');

Router.get('/danh-sach/:id',getProductsByCategoryId);
Router.get('/',getProductByQuery);
Router.get('/:id',getProductById);
Router.get('/san-pham-noi-bat/danh-sach',getProductByStar);
Router.get("/search-by-string/:str",searchByString);

function getProductsByCategoryId(req,res,next)
{
    productController.getProductsByCategoryId(req.params.id)
    .then(products => {
        res.json(products);
    })
    .catch(err=> {
        res.json(err);
    })
}

function getProductByQuery(req,res,next)
{
    const query={
        amount:parseInt(req.query.amount)||8,
        page:parseInt(req.query.page)||1,
        idCategory:req.query.idCategory||null,
        sort:parseInt(req.query.sort)||1,
        sortBy:req.query.sortBy||"price"
    }
    productController.getProductByQuery(query)
    .then(products=>{
        res.json(products);
    })
    .catch(err=>{
        res.json(err);
    })
}

function getProductById(req,res,next)
{
    productController.getProductById(req.params.id)
    .then(product => {
        res.json(product);
    })
    .catch(err => {
        res.json(err);
    })
}

function searchByString(req,res,next){
    var str=req.params.str;
    productController.searchByString(str).then(products=>{
        res.json({"products":products});
    }).catch(err=>{
        console.log(err);
    })
}

function getProductByStar(req,res,next){
    productController.getProductByStar(req.query)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err);
    })

}
module.exports=Router;