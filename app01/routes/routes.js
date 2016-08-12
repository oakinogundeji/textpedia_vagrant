/**
 * Module dependencies
 */
//=============================================================================
const
  express = require('express'),
  PythonShell = require('python-shell'),
  router = express.Router();
//=============================================================================
/**
 * Module variables
 */
//=============================================================================
const
  SCRAPER_PATH = '/home/telios/webdev_projects/txtpedia/app01/textpedia/app01/scraper/scraper.py',
  PYTHON_PATH = '/usr/bin/python';
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
  /*var words = req.body.k_words.split(',');
  for(var i = 0; i < words.length; i++) {
    console.log('k_word', words[i]);
    console.log('calling scraper');
    var
      args = [SCRAPER_PATH, words[i]],
      cp = require('child_process'),
      scraper = cp.spawn('python', args),
      chunk = '';

    scraper.stdout.on('data', function (data) {
      console.log('received data from scraper');
      chunk += data
    });
    scraper.stdout.on('close', function () {
      console.log('scraper finished sending data');
      console.log('data =', chunk);
      //return res.status(200).json(chunk)
    });
    scraper.stderr.on('data', function (err) {
      console.log('there was an err with scraper');
      return console.error(err.toString());
    });
  }*/
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
    //return res.status(200).json(chunk)
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
