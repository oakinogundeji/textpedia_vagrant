/**
 * Module dependencies
 */
//=============================================================================
const
  express = require('express'),
  router = express.Router();
//=============================================================================
/**
 * Routes
 */
//=============================================================================
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
//=============================================================================
/**
 * Export Module
 */
//=============================================================================
module.exports = router;
//=============================================================================
