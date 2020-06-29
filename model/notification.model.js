const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    emailRecieves:{
        type:[],
        ref:'EmailSubcribe'
    },
    content:{
        type:String,
        default:''
    },
    dateCreate:{
        type:Date
    },
    title:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model('notification',notificationSchema);