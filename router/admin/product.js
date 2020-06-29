const path=require('path');
const Router=require('express').Router();
const auth=require('../../middle-ware/auth');
const categoryController=require('../../controller/admin/category');
const productController=require('../../controller/admin/product');

Router.get('/danh-sach-san-pham/:id',renderPageProduct);
Router.post('/them-san-pham',createProduct);
Router.get('/them-san-pham',renderAddProductPAge);

function renderAddProductPAge(req,res,next){
    categoryController.getListCategory().then(categories=>{
        res.render('admin/pages/add-product',{"categories":categories});
    }).catch(err=>{
        res.send(err);
    });
}


Router.get('/cap-nhat-san-pham/:id',renderUpdateProductPage);
Router.post('/cap-nhat-san-pham',updateProduct);
Router.delete('/xoa-san-pham/:id',deleteProduct);
Router.get('/xoa-hinh-anh-san-pham/:idProduct/:imageName',deleteImageProduct);

function renderPageProduct(req,res,next)
{
    productController.getProductsByCategoryId(req.params.id)
    .then(products => {
        categoryController.getCategoryById(req.params.id)
        .then(category=>{
            res.render('admin/pages/list-product',{data:{products : products,category: category}});
        })
    })
    .catch(err=>{
        res.json(err);
    })
   
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

function createProduct(req,res,next)
{
    const file=req.files.image;
    
    console.log(file.length);
    var array_name=Array();

    if(typeof file.length==="undefined"){
        array_name.push(makeid(20)+getExtension(file.name));
    }else{
        for(let i=0;i<file.length;i++){
            var new_file_name=makeid(20)+getExtension(file[i].name);
            array_name.push(new_file_name);
        }
    }

    var data=req.body;
    var idCategory=data.idCategory;
    productController.createProduct(data,array_name).then(data=>{
        if(array_name.length===1){
            file.mv(path.join(__dirname,'../../public/product-image/'+array_name[0]),function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("success");
                }
            });
        }else{
            for(let i=0;i<file.length;i++){
                file[i].mv(path.join(__dirname,'../../public/product-image/'+array_name[i]),function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("success");
                    }
                });
            }
        }
        console.log(data);
        res.redirect("/admin/san-pham/danh-sach-san-pham/"+idCategory);
    }).catch(err=>{
        res.send(err);
    });
    
}

function updateProduct(req,res,next){
    console.log(req.files);

    if(req.files===null){
        console.log("da vao");
        var array_name=Array();
        var data=req.body;
        var idCategory=data.idCategory;
        productController.updateProduct(data,array_name).then(data=>{
            res.redirect("/admin/san-pham/danh-sach-san-pham/"+idCategory);
        }).catch(err=>{
            console.log("bi error");
            console.log(err);
            res.send(err);
        });
    }else{
        const file=req.files.image;
    
        var array_name=Array();
    
        if(typeof file.length==="undefined"){
            array_name.push(makeid(20)+getExtension(file.name));
        }else{
            for(let i=0;i<file.length;i++){
                var new_file_name=makeid(20)+getExtension(file[i].name);
                array_name.push(new_file_name);
            }
        }
    
        var data=req.body;
        var idCategory=data.idCategory;
        productController.updateProduct(data,array_name).then(data=>{
            if(array_name.length===1){
                file.mv(path.join(__dirname,'../../public/product-image/'+array_name[0]),function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("success");
                    }
                });
            }else{
                for(let i=0;i<file.length;i++){
                    file[i].mv(path.join(__dirname,'../../public/product-image/'+array_name[i]),function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("success");
                        }
                    });
                }
            }
            res.redirect("/admin/san-pham/danh-sach-san-pham/"+idCategory);
        }).catch(err=>{
            res.send(err);
        });
    }
    

    
}

function deleteProduct(req,res,next)
{
    productController.deleteProduct(req.params.id)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err);
    })
}

function renderUpdateProductPage(req,res,next){
    productController.getProductById(req.params.id).then(product=>{
        categoryController.getListCategory().then(categories=>{
            res.render('admin/pages/update-product',{"categories":categories,"product":product});
        }).catch(err=>{
            res.send(err);
        });
    }).catch(err=>{
        res.send(err);
    })
}

function deleteImageProduct(req,res,next){
    productController.deleteProductImage(req.params.idProduct,req.params.imageName).then(data=>{
        res.json({"status":"deleted"});
    }).catch(err=>{
        res.json({"status":err});
    })
}

module.exports=Router;