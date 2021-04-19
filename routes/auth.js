const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/valida-campos');
const { login } = require('../controllers/authController');

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validarCampos
], login);

module.exports = router;
