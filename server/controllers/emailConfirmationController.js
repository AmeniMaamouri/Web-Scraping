
var User = require('../database/model/User');

module.exports = (req,res)=> {

    const url = JSON.parse(JSON.stringify(req.body.url))


    User.findOne({temporarytoken: url}, (err,user)=>{

    

        if (err) throw err;


        if(!user) {
            res.json({success: false, status: 5, message: '404 page'})
        }else {
            user.temporarytoken = false;
            user.emailConfirmation = true;

            user.save((err) => {
                if (err) {console.log(err)}
                else {
                    res.json({success: true, status: 0, message: 'Your account has been activated'})
                }
            })
            
        }

    })
}