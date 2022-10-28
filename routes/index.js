var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  if(sess.username){res.redirect('/products'); return;}
  res.render('index', { title: 'ATN Shop' });
});
router.post('/login', function(req, res, next) {
  res.redirect('/login');
  console.log('loginPage');
});
module.exports = router;
