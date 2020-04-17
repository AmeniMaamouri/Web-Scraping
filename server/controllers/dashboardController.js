var Post = require('../database/model/Post')
var moment = require('moment');

module.exports = (req,res) => {

    Post.find({}, (err,data) => {

  
        res.json(data);
  
      
    }).sort({createdAt:-1});

}