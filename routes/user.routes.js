
const {Router} = require('express');
const { check } = require('express-validator');

const {fieldValidator, validateJWT, isAdminRole, isRole} = require('../middlewares')

const { usuariosGet, usuariosPost, usuariosPut, userDelete, usuariosPatch } = require('../controllers/users.controller');
const { 
    isRoleValid, 
    emailAlreadyExists, 
    userByIDExists 
} = require('../helpers/db-validators');


const router = Router();

router.get('/',  usuariosGet);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 caracteres').isLength({ min: 6}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailAlreadyExists ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( isRoleValid ),
    fieldValidator
    ],usuariosPost);
router.put('/:id',  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userByIDExists),
    check('rol').custom( isRoleValid ),
    fieldValidator
],usuariosPut);
router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    isRole('ADMIN_ROLE', 'SALES-ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userByIDExists),
    fieldValidator
],userDelete);
router.patch('/',  usuariosPatch);



module.exports = router;