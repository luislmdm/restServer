const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user');



const usuariosGet = async (req, res = response) => {
    
    const { limit = 5, start = 0 } = req.query;
    const query = {state:true}

    const [total, users] = await Promise.all([
        User.countDocuments(query), 
        User.find(query)
            .skip(start)
            .limit(limit)
    ])

    res.json({
        total,
        users
    
    });
}

const usuariosPost = async (req, res = response) => {



    const {name, email, password, rol} = req.body;
    const user = new User({name, email, password, rol});

    // Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    // Guardar en DB
    await user.save();

    res.json({
        user
    });
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    //TODO Valida contra base de datos
    if ( password ) {
        // Encriptar la constraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate( id, resto)

    res.json({
        user
    });
}

const usuariosDelete = async(req, res = response) => {
    
    const {id} = req.params;

    //Fisicamente lo borramos
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, {state:false})

    res.json({
        user
    });
}

const usuariosPatch = (req, res = response) => {

    res.json({
        'msg': 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
    
}