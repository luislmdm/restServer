
const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') =>{
    const roleExists = await Role.findOne({role});
    if( !roleExists ) {
        throw new Error(`El rol ${ role } no está registrado en la base de datos`)
    }
}

const emailAlreadyExists = async (email = '') => {
    //verificar si el correo existe
    const emailExists =  await User.findOne({email});
    if ( emailExists ) {
        throw new Error(`El correo: ${ email } ya está registrado`);
    }
}

const userByIDExists = async (id) => {
    //verificar si el usuario existe
    const userExists =  await User.findById(id);
    if ( !userExists ) {
        throw new Error(`El usuario no está registrado`);
    }
}

module.exports = {
    isRoleValid,
    emailAlreadyExists,
    userByIDExists
}

