const { Schema, model } = require('mongoose');
const { required } = require('nodemon/lib/config');


const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    }
});

module.exports = model('Usuario', UsuarioSchema );