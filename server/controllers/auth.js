const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = response) => {

    const { email, name, password } = req.body;

    try {
        // Verificar el email
        const usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario( req.body );

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar el JWT
        const token = await generarJWT( dbUser.id, name );

        // Crear usuario de DB
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        });

    

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const dbUser = await Usuario.findOne({ email });

        if(  !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            });
        }

        // Generar el JWT
        const token = await generarJWT( dbUser.id, dbUser.name );

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            profile: dbUser.profile,
            token
        });



    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const revalidarToken = async(req, res = response ) => {

    const { uid } = req;

    // Leer la base de datos
    const dbUser = await Usuario.findById(uid);

    // Generar el JWT
    const token = await generarJWT( uid, dbUser.name );

    return res.json({
        ok: true,
        uid, 
        name: dbUser.name,
        email: dbUser.email,
        profile: dbUser.profile,
        token
    });

}

const consultarUsuarios = async(req, res) => {
    try {
        const dbUser = await Usuario.find();
        res.json(dbUser)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups.. Hay un error, comunicate con soporte')
    }
}

const consultarUsuario = async(req, res) => {
    try {
        const dbUser = await Usuario.findById(req.params.id);
        if(!dbUser){
            res.status(404).json({msg: 'No se encontraron coincidencias'})
        }
        res.json(dbUser)

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups.. Hay un error, comunicate con soporte')
    }
}

 const actualizarUsuario = async(req, res) => {
    try {
        const {name, email,password, profile} = req.body
        let dbUser = await Usuario.findById(req.params.id);

        if(!dbUser){
            res.status(404).json({mensaje: 'No se encontraron coincidencias para la actualizacion'})
        }

        dbUser.name = name;
        dbUser.email = email;
        dbUser.password = password;
        dbUser.profile = profile;
        

        dbUser = await Usuario.findOneAndUpdate({_id: req.params.id}, dbUser, {new: true})
        res.json(dbUser);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups.. Hay un error, comunicate con soporte')
    }
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    consultarUsuarios,
    consultarUsuario,
    actualizarUsuario
}