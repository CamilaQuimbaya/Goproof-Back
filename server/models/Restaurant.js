const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion:{
        type: String,
        require: true
    },
    menu:{
        type: [String],
        require: true
    },
    categoria:{
        type: String,
        require: true
    },
    numero: {
        type: Number,
        require: true
    },
    ciudad: {
        type: String,
        require: true
    },
    parqueadero: {
        type: String,
        require: true
    },
    horario: {
        type: String,
        require: true
    },
    longitud:{
        type: String,
        require: true
    },
    latitud:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('restaurant', restaurantSchema)