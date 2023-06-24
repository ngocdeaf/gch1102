var express = require('express');
const GameModel = require('../models/GameModel');
var router = express.Router();

router.get('/', async (req, res) => {
    var games = await GameModel.find({});
    res.render('game/index', { games: games });
});

router.post('/search', async (req, res) => {
    var keyword = req.body.keyword;
    var games = await GameModel.find({ name: new RegExp(keyword, "i") })
    res.render('game/index', { games: games })
})

router.get('/add', (req, res) => {
    res.render('game/add');
})

router.post('/add', async (req, res) => {
    const { name, category, quantity, price, image } = req.body;
    var game = req.body;
    await GameModel.create(game)
        .then(() => { console.log('Add new game succeed!') });
    res.redirect('/game');
})

router.get('/edit/:id', async (req, res) => {
    var game = await GameModel.findById(req.params.id);
    res.render('game/edit', { game: game });
})

router.post('/edit/:id', async (req, res) => {
    const { name, category, quantity, price, image } = req.body;
    var id = req.params.id;
    await GameModel.findByIdAndUpdate(id, {
        name: req.body.name, category: req.body.category, quantity: req.body.quantity,
        price: req.body.price, image: req.body.image
    })
        .then(() => { console.log('Edit game succeed!') });
    res.redirect('/game');
})

router.get('/ascending', async (req, res) => {
    var games = await GameModel.find().sort({ price: 1 })
    res.render('game/index', { games: games })
})

router.get('/descending', async (req, res) => {
    var games = await GameModel.find().sort({ price: -1 })
    res.render('game/index', { games: games })
})

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await GameModel.findByIdAndDelete(id)
        .then(() => { console.log("Delete game succeed!") })
        .catch((err) => { console.log(err) });
    res.redirect('/game');
})

router.get('/list', async (req, res) => {
    var games = await GameModel.find({});
    res.render('game/list', { games: games });
})

router.post('/orderconfirm', async (req, res) => {
    var id = req.body.id;
    var game = await GameModel.findById(id);
    var order_quantity = req.body.order_quantity;
    var price = req.body.price;
    var total_price = price * order_quantity;
    res.render('game/orderconfirm', { game: game, order_quantity: order_quantity, total_price: total_price });
})

module.exports = router;