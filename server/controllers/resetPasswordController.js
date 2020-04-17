var User = require('../database/model/User')
var jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars')
var path = require('path')

module.exports = (req,res) => {

    User.findOne({email: req.body.email}).then(user =>{

        if(user){

           const temporarytoken = jwt.sign({}, '3023b0f5ec57' ,{});


            User.updateOne(
                { email: req.body.email },
                { $set : { temporarytoken:temporarytoken } },
                function( err, data ) {

                    if ( err ) throw err;


                    res.json({
                        message: 'Message has been sent to your email address',
                        status: 500,
                        success: true,
                    })
     
                    
    
             
    
                let transporter = nodemailer.createTransport({
                        
                    service: 'Gmail',
                    auth: {
                        type: "OAuth2",
                        user: process.env.PASSWORD,
                        pass:process.env.EMAIL,
                        clientId: '43035351914-mocn83d2o5c88agsl71u70ln9gsa2qvt.apps.googleusercontent.com',
                        clientSecret:'SZ17y8XV6jvK3ptzibMrpr5f',
                        refreshToken: "1//04co3lW6L5M6uCgYIARAAGAQSNwF-L9IrPzy5LiskuKvILProFnoI8Wa7tAs1LDe54BEmZChWiEu3xnAr_w_lE5fGSrNEFdpicUs",
                    //    accessToken :'ya29.a0Adw1xeWqqp93ETb-DxjNzIJqAcq-1iajBO0VK6_h1Y6c_FPZgrcgTOLo0Yxh-xArVZAet1MZSFB_AouWLQHGQIBtIUY-GWznuFpxTWG0RvYUm5oOMpbWw7GnSnfzhIiPMomb7-T3wtJo-orbHAHNRNzOt1OpEytvA88'
                    }
                });
    
                transporter.use('compile', hbs({
                    viewEngine: {
                      extName: ".handlebars",
                      defaultLayout: false,
                    },
                    viewPath: path.join(__dirname+'/../views')
                  }));
                  
                  
    
                let mailOptions = {
                    from : 'Web Scraping <maamourikhouloud2@gmail.com>',
                    to : user.email,
                    subject : 'Reset your password',
                    template: 'resetPw',
                    context: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: temporarytoken
                    }
                }
    
                transporter.sendMail(mailOptions, (err,data)=> {
                        if (err){
                            console.log(err)
                        }else {
                           console.log('******* message sent ********')
                        }
                })



                }
            );


                

      
        }else{

            return res.json({
                message: "Email doesn't existe",
                status: 450,
                success: false

            })

        }
        
    })

}