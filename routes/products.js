var express = require('express');
const pg_conn = require('../configs/pg_config');
var router = express.Router();
pg_conn.connect();

/* GET product home page. */
router.post('/shop/:id', async function(req, res, next) {
  sess = req.session;
  if(!sess.username){res.redirect('/login'); return;}
  username = sess.username;
  shop_id = sess.shop_id;
  if(sess.role != 'User'){res.redirect('/products'); return;}
    const accs_query = 
    {
        text: 'SELECT * FROM products WHERE shop_id = $1',
        values: [shop_id],
    }
    var query_dataa = await pg_conn.query(accs_query);
    res.render('products/products_user', { title: 'Product' , products: query_dataa, message: 'Product Show', username: username });

});
router.get('/shop/:id', async function(req, res, next) {
  sess = req.session;
  if(!sess.username){res.redirect('/login'); return;}
  username = sess.username;
  var shop_id = sess.shop_id;
  if(sess.role != 'User'){res.redirect('/products/'); return;}
  const accs_query = 
  {
      text: 'SELECT * FROM products WHERE shop_id = $1',
      values: [shop_id],
  }
  var query_dataa = await pg_conn.query(accs_query);
  res.render('products/products_user', { title: 'Product' , products: query_dataa, message: 'Product Show', username : username });

});
router.get('/', async function(req, res, next) {
  sess = req.session;
  if(!sess.username){res.redirect('/login'); return;}
  else if(sess.role == 'User'){res.redirect('/products/shop/' + sess.shop_id); return;}
  else{
  username = sess.username;

  var selected_shop = 'all';
  const shop_query = 
  {
      text: 'SELECT * FROM shops',
  }
  var shop_data = await pg_conn.query(shop_query);

  const accs_query = 
  {
      text: 'SELECT * FROM products',
  }
  var query_dataa = await pg_conn.query(accs_query);
  res.render('products/products_index', { title: 'Product' , shop: shop_data, selectedShop : selected_shop , products: query_dataa, message: 'Product Show', username : username  });
}
});
router.post('/', async function(req, res, next) {
  sess = req.session;
  if(!sess.username){res.redirect('/login'); return;}
  else if(sess.role == 'User'){res.redirect('/products/shop/' + sess.shop_id); return; }
  username = sess.username;
  var selected_shop = req.body.shop;
  const shop_query = 
  {
      text: 'SELECT * FROM shops',
  }
  var shop_data = await pg_conn.query(shop_query);
  const accs_query = 
  {
      text: 'SELECT * FROM products WHERE shop_id = $1',
      values: [selected_shop]
  }
  if (selected_shop == 'all')
  {
    res.redirect('/products/');
  } 
  else{  
  var query_dataa = await pg_conn.query(accs_query);
  res.render('products/products_index', { title: 'Product' , selectedShop : selected_shop ,shop: shop_data, products: query_dataa, message: 'Product shop', username : username });
  }
});
router.post('/create/', async function(req, res, next) {
  sess = req.session;
  let name = req.body.name;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let shopID = sess.shop_id;
    const accs_query = 
    {
        text: 'INSERT INTO products(name,price,quantity,shop_id) VALUES ($1,$2,$3,$4)',
        values: [name,price,quantity,shopID]
    }
    pg_conn.query(accs_query);

    res.redirect('/products');
/* GET product update page. */
});
router.post('/edit/:id', function(req, res, next) {
  sess = req.session;
  let id = req.params.id;
  let name = req.body.name;
  let price = req.body.price;
  let quantity = req.body.quantity;
  console.log(id,name,price);
      const updatequery = 
      {
          text: 'UPDATE products SET name = $1, price = $2, quantity = $3 WHERE id = $4',
          values: [name, price, quantity, id]
      }
      pg_conn.query(updatequery);

    res.redirect('/products/');
  
});
router.post('/delete/:id', async function(req, res, next) {
  sess = req.session;
  if(!sess.username){res.redirect('/login'); return;}
  var id = req.params.id;
      const deleteQuery = 
      {
        text: 'DELETE FROM products WHERE id=$1',
          values: [id]
      }
  pg_conn.query(deleteQuery);
  res.redirect('/products/');
});

module.exports = router;
