const mongoose=require('mongoose');

const Schema = mongoose.Schema;
const slideSchema = new Schema ({
    background:{
        type:String,
        requrie:true,
    },
    title:{
        type:String,
        requrie:true,
    },
    subTitle:{
        type:String,
    },
    logoText:{
        type:String,
        requrie:true
    },
    image:{
        type:String
    }
})
module.exports=mongoose.model("SlideHome",slideSchema);