var User = require('../database/model/User')
var bcrypt = require('bcrypt');

module.exports = (req, res) =>{
  

    User.findOne({email: req.body.email}).then(user => {


        if(user){

            req.body.newPassword = bcrypt.hashSync(req.body.newPassword , 12, (err, hash) => { 
                if(err) throw (err)
            });

            User.updateOne( 
                { email: req.body.email },
                { $set : { password:req.body.newPassword } },
                function( err, data ) {
    
                    if ( err ) throw err;
    
                }
                )

                return res.json({
                    message: 'Your password has been changed, you can now sign in',
                    status: 700,
                    success: true
                })
        }else {
            return res.json({
                message: 'Error please try again',
                status: 750,
                success: false
            })
        }
    })
}