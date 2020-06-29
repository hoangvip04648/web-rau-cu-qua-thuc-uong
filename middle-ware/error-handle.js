module.exports=(err,req,res,next)=>{
    if(err)
    {
        res.json(err);
    }
}