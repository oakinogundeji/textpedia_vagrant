/**
 * Module dependencies
 */
//=============================================================================
const
  os = require('os'),
  express = require('express'),
  nodemailer = require('nodemailer'),
  sgTransport = require('nodemailer-sendgrid-transport'),
  config = require('../config/config'),
  router = express.Router();
//=============================================================================
/**
 * Module variables
 */
//=============================================================================
const
  SCRAPER_PATH = '/home/telios/webdev_projects/txtpedia/app01/textpedia/app01/scraper/scraper.py',
  PYTHON_PATH = '/usr/bin/python',
  testEmail = 'oakinogundeji@gmail.com',
  sgtOptions = {
    auth: {
        api_user: config.SendGrid.username,
        api_key: config.SendGrid.password
      }
    },
  mailer = nodemailer.createTransport(sgTransport(sgtOptions));
//=============================================================================
/**
 * Routes
 */
//=============================================================================
//UI Routes
router.get('/', function (req, res) {
  return res.status(200).render('pages/index')
});
router.post('/submit', function (req, res) {
  console.log('submit data from vue', req.body.data);
  return res.status(200).json('Got it!');
});
router.post('/confirm', function (req, res) {
  console.log('confirm data from vue', req.body.data);
  return res.status(200).json('Got it!');
});
//API Routes
router.post('/scrape', function (req, res) {
  console.log('scrape user phone number %s', req.body.p_num);
  console.log('scrape keyword', req.body.k_words);
  //NB child_process pattern is 'cmd, [file_path, args.....]'
  var
    words = req.body.k_words.split(','),
    args = [SCRAPER_PATH].concat(words),
    cp = require('child_process'),
    scraper = cp.spawn('python3', args),
    chunk = '';

  scraper.stdout.on('data', function (data) {
    chunk += data
  });
  scraper.stdout.on('close', function () {
    console.log('scraper finished sending data');
    console.log('data =', chunk);
    //compose email
    var email = {
      to: testEmail,
      from: 'research@textpedia.com',
      subject: 'Your research results',
      text: 'Hi, ' + os.EOL + os.EOL +'Thanks for using the Textpedia service, your' +
        ' research results are:' + os.EOL + os.EOL + chunk
    };
    //send email
    mailer.sendMail(email, function(err, res) {
      if(err) {
        console.log('There was an error sending the report');
        console.error(err);
        }
        console.log('The report was successfully sent');
        console.log(res);
    });
  });
  scraper.stderr.on('data', function (err) {
    console.log('there was an err with scraper');
    return console.error(err.toString());
  });
  return res.status(200).json('Got it!');
});
//=============================================================================
/**
 * Export Module
 */
//=============================================================================
module.exports = router;
//=============================================================================
