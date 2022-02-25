const { response } = require("express");
const User = require('../models/user')
const bcrypjs = require('bcryptjs');
const { getJWT } = require("../helpers/get-jwt");


const login = async(req, res =response) => {
    const {email, password} = req.body;

    try {

        //verificar si el email existe
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            });
        }

        // Si el usuario está activo
        if(!user.state) {
            return res.status(400).json({
                msg: 'Usuario No está activo'
            });
        }

        // Verificar la constraseña
        const isPasswordValid = bcrypjs.compareSync( password, user.password );
        if(!isPasswordValid){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await getJWT (user.id);

        res.json({
            user,
            token
        })
    
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({            
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}