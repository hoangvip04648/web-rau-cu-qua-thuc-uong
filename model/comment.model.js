const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
    idUser : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    idPageComment : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : false
    },
    pageComment : {
        type : String,
        required : false
    },
    date:{
        type:String,
    }
})

module.exports = mongoose.model('Comment',commentSchema);