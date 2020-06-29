const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
    },
    image :{
        type:String
    }

})

categorySchema.virtual('numProduct', {
    ref: 'Product', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'idCategory', 
    count: true 
});



module.exports=mongoose.model('Category',categorySchema);