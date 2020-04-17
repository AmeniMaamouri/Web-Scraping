var User = require('../database/model/User')

module.exports = (req,res) =>  {

    let emails = [];

    User.find({}, (err,data) => {

        let i = 0;

        data.forEach(val => {
        
            emails[i] = val.email;
            i++;

        })
     
        res.json(emails);

        
  
      
    })


}