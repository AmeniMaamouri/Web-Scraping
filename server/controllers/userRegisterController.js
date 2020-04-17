var bcrypt = require('bcrypt');
var User = require('../database/model/User');
require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars')
var jwt = require('jsonwebtoken')
var path = require('path')
var xoauth2 = require('xoauth2')

module.exports =  async (req, res) => {


    
   await User.findOne({email : req.body.email}).then(user => {



        if(!user){

            
            req.body.password = bcrypt.hashSync(req.body.password , 12);
            req.body.temporarytoken = jwt.sign({username: req.body.firstName}, '3023b0f5ec57' ,{});

            User(req.body).save((err,data)=> {


               res.json({
                    message: 'Please active your account with the link sent to your email address',
                    status: 201,
                    success: true
                })

                if (err) console.log(err)

               
               

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
                    to : data.email,
                    subject : 'Confirm your email',
                    template: 'main',
                    context: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        token: data.temporarytoken
                    }
                }

                transporter.sendMail(mailOptions, (err,data)=> {
                        if (err){
                            console.log(err)
                        }else {
                           console.log('******* message sent ********')
                        }
                })

                
            })

        }else {


            res.json({
                message: 'Email already exist',
                status: 200,
                success: false
            })

        }

       

    })



}
