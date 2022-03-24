const express = require('express');
const router = express.Router();

//restaurante

router.use('/auth', require('./auth'));
router.use('/', require('./restaurants'));
module.exports =  router;