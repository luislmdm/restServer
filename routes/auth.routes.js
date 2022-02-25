const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { fieldValidator } = require('../middlewares/fields-validator');

const router = Router();

router.post('/login', [
    check('email', 'el correo es obligatorio').isEmail(),
    check('password', 'La Constraseña es obligatoria').not().isEmpty(),
    fieldValidator
],login);

module.exports = router;