const express = require('express');
const mongoose = require('mongoose');
var CronJob = require('cron').CronJob;
var bodyParser = require('body-parser')
var axios = require('axios');
var cheerio = require('cheerio');
var cors = require('cors');
var userRegisterController = require('./controllers/userRegisterController');
var userLoginController = require('./controllers/userLoginController');
var dashboardController = require('./controllers/dashboardController')
var Post = require('./database/model/Post')
const puppeteer = require('puppeteer');
var emailConfirmationController = require('./controllers/emailConfirmationController')
var resetPasswordController = require('./controllers/resetPasswordController')
var newPasswordPutController = require('./controllers/newPasswordPutController')
var newPasswordPostController = require('./controllers/newPasswordPostController')
var registerGetController = require('./controllers/registerGetController')

// const messagebird = require('messagebird')('wnG7fUwdHsdIckvQFWX1EgCN1');


const app = express();



mongoose.connect('mongodb+srv://admin:admin@todo-flng1.mongodb.net/sys?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Connected to Database'))
    .catch((err) => {
        console.log(err);
    });




app.listen(4000, () => {
     console.log('Server running on port 4000');
 })
    
    
    
  

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());


app.post('/', userLoginController)
app.post('/register', userRegisterController);
app.get('/dashboard', dashboardController );
app.put('/activate/:token', emailConfirmationController)
app.post('/reset', resetPasswordController)
app.put('/reset/:token', newPasswordPutController)
app.post('/reset/:token', newPasswordPostController)
app.get('/register', registerGetController)




// Scraping Data


new CronJob('*/5 * * * *', async () => {

    //-------  Tayara -------------- 

        //   const params = {
        //     'originator': 'Trust it',
        //     'recipients': '+21658648120',
        //       'body': "Chère Madame et Cher Monsieur, Trust it est l’interlocuteur idéal pour réparer vous téléphone mobile avec des prix bas. Situés dans l'innovation center technopole el gazella."
        //     };
          
        //     messagebird.messages.create(params, function (err, response) {
        //       if (err) {
        //         return console.log(err);
        //       }
        //       console.log(response);
        //     });


    (async () => {
        try{
        
            const browser = await puppeteer.launch({ headless: true});
            const page = await browser.newPage();
            await page.setUserAgent( 'UA-TEST' );
            
            for (var i = 0 ; i<=36 ; i++) {
            await page.goto('https://www.tayara.tn/sc/informatique-et-multimedia/t%C3%A9l%C3%A9phones');
            await page.waitForSelector('.card')
            const cards = await page.$$('.card');
            const Card = cards[i];
            const button = await Card;
         

        const deviceLink = await button.$eval('a', a => a.href)
        await button.click();
        
        const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
        await page.waitForSelector("._3PJSU");
        const deviceName = await page.$eval('._3PJSU h1', h2 => h2.innerText)
        const price = await page.$eval('.sQocJ span', h2 => h2.innerText)
        const priceSplit = price.split('DT');
        const devicePriceSplit = priceSplit[0];
         const devicePrice = parseInt(devicePriceSplit.replace(/\s/g, ''), 10);
       

        await page.waitForSelector("._1q9YR");
        const userVille = await page.$eval('._1q9YR .l-BkY ._15IPb', h2 => h2.innerText)
        await page.waitForSelector("._2M5gD");
        const postDate = await page.$eval('._2M5gD ._15IPb span:nth-child(2)', h2 => h2.innerText)


             
            await axios.get(encodeURI(deviceLink)).then(async (reponse) => {


                var $ = cheerio.load(reponse.data);

        
                var split1 = reponse.data.split('{"e164":"+216');
                var split2 = split1[1].split('","national"');
                var numberPhone = split2[0];



                await Post.findOne({ deviceLink: deviceLink }, async (err, data) => {


                    if (data) {

                        console.log('------- Existe deja Tayara --------------')
                            
                    } else {
                        console.log('------- New data added to the Database --------------')

                         // Send SMS

                        Post({ deviceName, devicePrice, deviceLink, userVille, numberPhone, postDate }).save((err, data) => {
                            if (err) {
                                console.log(err)
                            };

                        });
                    }



                }).catch(err => {
                    console.log("---------------Tayara en panne-----------" + err)
                })




            }).catch(err => {
                console.log("---------------Tayara en panne-----------" + err)
            })

       
            
        }
     
    }
    catch(err){
        console.log("My errur" + err)
    }
        

      })();
        



    // -------------- Tunisie Annonce -------------- 



    await axios.get('http://www.tunisie-annonce.com/AnnoncesTelephonie.asp?rech_cod_rub=401').then(async (res) => {

        var $ = cheerio.load(res.data);



        await $('.Tableau1').each(async (index, element) => {


            var smartPhonePrice = $(element).find('td:nth-child(10)').text();
            const devicePrice = parseInt(smartPhonePrice.replace(/\s/g, ''), 10);
    
        

            var deviceLink = 'http://www.tunisie-annonce.com/' + $(element).find('td:nth-child(8)').children().attr('href');

            var userVille = $(element).find('td:nth-child(2)').text();
            var postDate = $(element).find('td:nth-child(12)').text();



            await axios.get(encodeURI(deviceLink)).then(async (res) => {


                var a = cheerio.load(res.data);


                var numberPhones = a('.cellphone .da_contact_value').text();
                var devicesName = a('.da_entete').eq(0).text();
                var deviceName = devicesName.split(']').pop();

                if(numberPhones.includes('+216')){

                    var splt1 = numberPhones.split('+216');
                    var numberPhone = splt1[1];
                 

                }
      

                await Post.findOne({ deviceLink: deviceLink }, async (err, data) => {

                    if (data) {
                        console.log("************Tunisie-Annonce Existe************")

                    } else {
                        console.log("************Tunisie-Annonce New Data************")

                        Post({ deviceName, devicePrice, deviceLink, userVille, numberPhone, postDate }).save((err, data) => {
                            if (err) throw err;

                        });
                    }


                }).catch(err => {
                    console.log("---------------Tunisie-Annonce en panne-----------" + err)
                })




            }).catch(err => {
                console.log("---------------Tunisie-Annonce en panne-----------" + err)

            })

        })


    }).catch(err => {
        console.log("---------------Tunisie-Annonce en panne-----------" + err)
    })



}, null, true, 'America/Los_Angeles');









