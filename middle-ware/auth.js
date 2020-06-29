const jwt=require('../untils/jwt');
const userController=require('../controller/admin/user');

function authUser(req,res,next)
{
    const token=req.headers['x-access-token'];
    jwt.verify(token,(err,decode)=>{
        if(err)
        {
            res.json({message:'ban phai dang nhap de su dung chuc nang nay'});
        }
        else
        {
            userController.findUserByEmail(decode.email)
            .then(user=>{
                if(!user.email)
                {
                    res.json({message:'email khong chinh xac'});
                }
                else
                {
                    next();
                }
            })
        }
    })
}

function authAdmin(req,res,next)
{
    const token=req.cookies['x-access-token'];

    return new Promise((resolve,reject)=>{
        if(!token)
        {
            resolve(false);
        }
        else
        {
            jwt.verify(token,(err,decode)=>{
                if(err)
                {
                    // res.json({message:'ban phai dang nhap de su dung chuc nang nay'});
                    resolve(false);
                }
                else
                {
                    userController.findUserByEmail(decode.email)
                    .then(user=>{
                        if(!user.email)
                        {
                            // res.json({message:'email khong chinh xac'});
                            resolve(false);
                        }
                        else
                        {
                        if(user.role===1)
                        {
                            resolve(true);  
                        }
                        else
                        {
                            //    res.json({message:'ban phai la admin de su dung chuc nang nay'});
                            resolve(false);
                        }
                        }
                    })
                }
            
            })
        }
    })
   
}

function authAdminAPI(req,res,next)
{
    const token=req.headers['x-access-token'];
        if(!token)
        {
            res.json({message:'token khong ton tai'})
        }
        else
        {
            jwt.verify(token,(err,decode)=>{
                if(err)
                {
                    res.json({message:'token khong dung'});
                  
                }
                else
                {
                    userController.findUserByEmail(decode.email)
                    .then(user=>{
                        if(!user.email)
                        {
                            res.json({message:'Email không tồn tại'});
                          
                        }
                        else
                            {
                            if(user.role===1)
                            {
                                 next();
                            }
                            else
                            {
                                res.json({message:'ban phai la admin de su dung chuc nang nay'});
                        
                            }
                        }
                    })
                }
            
            })
        }
}

function handleAuthAdmin(req,res,next){
    authAdmin(req,res,next)
    .then(value=>{
        if(value)
        {
          next();
        }
        else
        {
            
            res.redirect('/admin/dang-nhap');
        }
  })
}


module.exports={
    authUser  : authUser,
    authAdmin : authAdmin,
    handleAuthAdmin : handleAuthAdmin,
    authAdminAPI    : authAdminAPI
}