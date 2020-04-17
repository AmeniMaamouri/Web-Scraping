const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    email: {

     type: String,
     required: true

    },

    emailConfirmation: {

        type: Boolean,
        default: false,
        required: true
   
       },

       temporarytoken: {

        type: String,
        required: true
   
       },
    password: {

        type: String,
        required: true

       },

     date: {
        type: Date,
        default: Date.now
    }
    
    })

const User = mongoose.model('User',userSchema);



module.exports = User;