var express = require('express');
var router = express.Router();

// Controllers
var helloWord = require('../controllers/helloWord');

// Add Routes
router.get('/hello-world', helloWord.helloGetDemo);
router.post('/hello-world', helloWord.helloPostDemo);

// Restricted Routes
const restrictedUrlPatter = '/api/';

module.exports = router;
