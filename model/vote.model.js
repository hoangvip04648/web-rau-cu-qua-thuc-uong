const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    idUser : {
        type : String,
        require : true
    },
    idProduct : {
        type : String,
        require : true
    },
    numberStar : {
        type : Number
    }
})

module.exports = mongoose.model('Vote',voteSchema);