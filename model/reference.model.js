const mongoose=require('mongoose');
const referenceSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:"",
    content:{
        type:String,
        required:true
    },
    previewContent:{
        type:String,
        default:''
    },
    date:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    }
})
module.exports=mongoose.model('Reference',referenceSchema);