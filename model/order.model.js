const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderCode:{
        type:String,
        require:true
    },
    idProduct : {
        type :mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require:true
    },
    idUser : {
        type : String,
        require: true
    },
    numberItem : {
        type : Number
    },
    totalPrice : {
        type : Number
    },
    date : {
        type : String
    },
    destination : {
        type : String
    },
    note : {
        type : String
    },
    status:{
        type:String,
        default: 'chua-xu-ly'
    }

})

module.exports  = mongoose.model('Order',OrderSchema);