const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

//restaurante

router.post('/restaurant', restaurantController.crearRestaurante);
router.get('/restaurant', restaurantController.consultarRestaurante);

module.exports =  router