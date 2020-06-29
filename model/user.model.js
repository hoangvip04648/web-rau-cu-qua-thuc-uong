const moongoose=require('mongoose');
const userSchema=new moongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    phoneNumber:{
        type:Number,
        default:0
    },
    role:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        default:true
    },
    avatar:{
        type:String,
        default:''
    },
    gender : {
        type:String,
        default:''
    },
    date : {
        type:String,
        default:'1/1/2001'
    }
});
module.exports=moongoose.model("User",userSchema);