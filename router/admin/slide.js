const Router =require('express').Router();
const slideController=require('../../controller/admin/slide');
const path =require('path');

Router.post('/them-slide',createSlide);
Router.put('/cap-nhat/:id',updateSlide);
Router.delete('/xoa/:id',deleteSlide);

function createSlide(req,res,next){
    const image=req.files.image;
    const background=req.files.background;
    if(!image || !background || !req.body.title || !req.body.logoText)
    {
        res.json({message:'vui long nhập đủ thông tin',success:false});
        
    }
    else
    {
        Promise.all([handleUpload(image),handleUpload(background)])
        .then(values => {
            const slide=req.body;
            slide.image=values[0];
            slide.background=values[1];
    
            slideController.createSlide(slide)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
            
        })
        .catch(err =>{
            res.json(err);
        })
        
    }

}

function handleUpload(file)
{
    if(file == undefined)
        {
           return  Promise.resolve(null);
        }
    else
    {
        const name= makeid(10) + getExtension(file.name);
        return new Promise((resolve,reject) => {
            file.mv(path.join(__dirname,'../../public/upload/slides/'+name),(err) => {
                if(err)
                {
                    reject({message:'luu file that bai',success:false});
                }
                else
                {
                    resolve(name);
                }
            })
        })
    }
  
}

function updateSlide(req,res,next)
{
    
    if(!req.files)
    {
        slideController.updateSlide(req.params.id,req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
    }
    else
    {
        Promise.all([handleUpload(req.files.image),handleUpload(req.files.background)])
        .then(values => {
            const slide = req.body;
            const [image,background] = values;
           if(image != null)
           {
            slide.image=image;
           }
           if(background !=null)
           {
               slide.background=background;
           }
           slideController.updateSlide(req.params.id,slide)
           .then(data => {
               res.json(data);
           })
           .catch(err => {
               res.json(err);
           })
        })
    }
    
}

function deleteSlide(req,res,next)
{
    slideController.deleteSlide(req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
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

module.exports=Router;