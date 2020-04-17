var User = require('../database/model/User');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

module.exports = (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {



        if (user) {


            if(user.emailConfirmation === false){

               return res.json({

                    message: 'Please activate your account first',
                   
                    success: false,
                    

                })
                
            }


            bcrypt.compare(req.body.password, user.password, (err, same) => {

                if (same) {

                
                    

                    var payload = {

                        userName: user.firstName + " " + user.lastName

                    }

                   return res.json({

                        message: 'Successful authentication',
                        status: 200,
                        success: true,
                        userToken: jwt.sign(payload, '3023b0f5ec57', {})

                    })

                } else { // incorrect password

                   return  res.json({
                        message: 'Email or password incorrect',
                        status: 401,
                        success: false
                    })

                }

            })




        } else {  // incorrect email

           return res.json({

                message: 'Email or password incorrect',
                status: 404,
                success: false

            });

        }

    }).catch( err => {

        return res.json({

                message: 'Error occured',
                status: 500,
                success: false

            });


    })

}