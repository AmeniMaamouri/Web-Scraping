const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({


    deviceName: String,
    devicePrice: Number,
    deviceLink: String,
    userVille : String,
    numberPhone: String,
    postDate:String, 
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Post = mongoose.model('Post',postSchema);

module.exports = Post;