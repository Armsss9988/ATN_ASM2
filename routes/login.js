var express = require('express');
var router = express.Router();
var authen = require('../configs/authenticator');
const pg_conn = require('../configs/pg_config');
require('dotenv').config()
var sess; 


router.get('/', function(req, res, next) {
    sess = req.session;
    if(sess.username){res.redirect('/products'); return;}
    res.render('login', { title: 'This is login Page' });
  });
router.post('/authenticateCheck', async function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    let auth = await authen(username,password);
    const userQuery =
    {
      text: 'SELECT * FROM users WHERE name=$1 AND password =$2 ',
      values: [username,password]
    }
   var user_data = await pg_conn.query(userQuery);
    if( auth == true)
    {
      sess = req.session;
      sess.username = username;
      sess.shop_id = user_data.rows[0].shop_id;
      sess.role = user_data.rows[0].role;
      req.session.save(err => {
        if (err) {
          return;
        };
      });
      console.log(sess);
      res.render('users', { title: 'ATN Shop', user: user_data.rows[0], username: sess.username, session: sess});   
    }  
    if(auth == false)
    {
      res.render('login', { title: 'Wrong username or password!!!'});
    }
  });
  router.post('/logout', (req, res) => {
    if (req.session) {      
      req.session.destroy(err => {
          res.redirect('/');
      });
      console.log(session);
    } else {
      res.end()
    }
  })
  module.exports = router;