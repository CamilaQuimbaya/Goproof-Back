const Restaurant = require('../models/Restaurant')
exports.crearRestaurante = async(req, res) => {
    try {
        let data_restaurant;
        data_restaurant = new Restaurant(req.body);
        await data_restaurant.save();
        res.send(data_restaurant)
    }catch(error){
        console.log(error)
        res.status(500).send('ups... Hay un error Comuniquese con soporte')
    }
}
exports.consultarRestaurante = async(req,res) => {
    try{
        const data_restaurant = await Restaurant.find();
        res.json(data_restaurant);
    }catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}