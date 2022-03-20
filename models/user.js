const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true 
    },
    name:{
        type: String,
        required: true
    },
    phoneNo:{
        type: Number,
        required: true
    }
    ,
    password:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('User', userSchema);

