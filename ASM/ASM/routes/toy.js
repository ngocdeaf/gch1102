var express = require('express');
const ToyModel = require('../models/ToyModel');
var router = express.Router();

router.get('/', async (req, res) => {
   var toys = await ToyModel.find({});
   res.render('toy/index', { toys: toys });
});

router.get('/list', async (req, res) => {
   var toys = await ToyModel.find({});
   res.render('toy/list', { toys: toys });
})

//search function
router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   var toys = await ToyModel.find({ name: new RegExp(keyword, "i") })
   res.render('toy/index', { toys: toys })
})

//sort function
router.get('/ascending', async (req, res) => {
   var toys = await ToyModel.find().sort({ price: 1 })
   res.render('toy/index', { toys: toys })
})

router.get('/descending', async (req, res) => {
   var toys = await ToyModel.find().sort({ price: -1 })
   res.render('toy/index', { toys: toys })
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: DELETE * FROM toy WHERE id = 'id'
   await ToyModel.findByIdAndDelete(id)
      .then(() => { console.log("Delete toy succeed!") })
      .catch((err) => { console.log(err) });
   res.redirect('/toy');
})

router.get('/edit/:id', async (req, res) => {
   var toy = await ToyModel.findById(req.params.id);
   res.render('toy/edit', { toy: toy });
})

router.post('/edit/:id', async (req, res) => {
   const { name, brand, category, instock, price, image } = req.body;
   var id = req.params.id;
   await ToyModel.findByIdAndUpdate(id, {
      name: req.body.name, brand: req.body.brand, category: req.body.category, instock: req.body.instock,
      price: req.body.price, image: req.body.image
   })
      .then(() => { console.log('Edit toy succeed!') });
   res.redirect('/toy');
})

router.get('/add', (req, res) => {
   res.render('toy/add');
})

router.post('/add', async (req, res) => {
   const { name, brand, category, instock, price, image } = req.body;
   var toy = req.body;
   await ToyModel.create(toy)
      .then(() => { console.log('Add new toy succeed!') });
   res.redirect('/toy');
})

router.post('/orderconfirm', async (req, res) => {
   var id = req.body.id;
   var toy = await ToyModel.findById(id);
   var order_quantity = req.body.order_quantity;
   var price = req.body.price;
   var total_price = price * order_quantity;
   res.render('toy/orderconfirm', { toy: toy, order_quantity: order_quantity, total_price: total_price });
})

module.exports = router;