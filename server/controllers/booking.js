const Booking = require('../models/Booking');

exports.createBooking = async(req, res) => {
    try {
        let dbBooking;
        dbBooking = new Booking(req.body);
        await dbBooking.save();
        res.send(dbBooking)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups.. Hay un error, comunicate con soporte')
    }
}

exports.consultBookings = async(req, res) => {
    try {
        const dbBooking = await Booking.find();
        res.json(dbBooking)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups.. Hay un error, comunicate con soporte')
    }
}
exports.consultBooking = async(req, res) => {
    try {
        const dbBooking = await Booking.findById(req.params.id);
        if(!dbBooking){
            res.status(404).json({msg: 'No se encontraron coincidencias'})
        }
        res.json(dbBooking)

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups.. Hay un error, comunicate con soporte')
    }
}

exports.updateBooking = async(req, res) => {
    try {
        const {titulo, descripcion, fecha, hora, lugar} = req.body
        let dbBooking = await Booking.findById(req.params.id);

        if(!dbBooking){
            res.status(404).json({mensaje: 'No se encontraron coincidencias para la actualizacion'})
        }

        dbBooking.titulo = titulo;
        dbBooking.descripcion = descripcion;
        dbBooking.fecha = fecha;
        dbBooking.hora = hora;
        dbBooking.lugar = lugar;

        dbBooking = await Booking.findOneAndUpdate({_id: req.params.id}, dbBooking, {new: true})
        res.json(dbBooking);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups.. Hay un error, comunicate con soporte')
    }
}

exports.deleteBooking = async(req, res) => {
    try {
        const dbBooking = await Booking.findById(req.params.id);
        if(!dbBooking){
            res.status(404).json({mensaje: 'No se encontraron coincidencias'})
        }
        await Booking.findByIdAndRemove({_id: req.params.id});
        res.json({mensaje: 'reserva eliminada correctamente'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups.. Hay un error, comunicate con soporte')
    }
}