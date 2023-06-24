var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact/index', { title: 'Toy Station' });
});

module.exports = router;