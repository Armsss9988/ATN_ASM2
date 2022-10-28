const pg_conn = require('../configs/pg_config');
var express = require('express');
var router = express.Router();
var authen = require('../configs/authenticator');

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Minh' });
  });
router.post('/', function(req, res, next) {
    res.render('register', { title: 'Minh' });
  });
  
  module.exports = router;