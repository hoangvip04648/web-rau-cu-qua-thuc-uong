const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    idCategory:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:''
    },
    image:[],
    createDate:{
        type:String
    },
    type:{
        type:String
    },
    place:{
        type:String
    },
    expiryDate:{
        type:String,
    },
    date:{
        type:String,
        default:''
    },
    rate:{
        type:Number,
        default:0
    }
})

productSchema.index({name: 'text', description: 'text'});

module.exports=mongoose.model('Product',productSchema);