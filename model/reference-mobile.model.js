const mongoose=require('mongoose');
const referenceMobileSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:[],
        default:[]
    },
    content:{
        type:[],
        required:true
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
module.exports=mongoose.model('ReferenceMobile',referenceMobileSchema);