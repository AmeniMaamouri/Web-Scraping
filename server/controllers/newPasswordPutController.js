var User = require('../database/model/User')

module.exports = (req, res) => {
    
    User.findOne({temporarytoken : req.body.token}).then(user => {


        if (user){

            User.updateOne(
                { temporarytoken: req.body.token },
                { $set : { temporarytoken:false } },
                function( err, data ) {
    
                    if ( err ) throw err;
    
                }
            )

            return res.json({
                status: 600,
                email: user.email,
                success: true
            })

        

        }else {
           return res.json({
                 status: 650,
                success: false
            })
        }
        



    })


}