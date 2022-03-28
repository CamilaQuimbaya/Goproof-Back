const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({

    titulo: {
        type: String,
        require: true,
    },
    descripcion:{
        type: String,
        require: true
    },
    fecha:{
        type: String,
        require: true
    },
    hora:{
        type: String,
        require: true
    },
    lugar:{
        type: String,
        require:true
    },

});

module.exports = mongoose.model('booking', bookingSchema)