const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userDelete, userPut, userPatch } = require('../controllers/userController');
const { validarCampos } = require('../middlewares/valida-campos');
const { validaJWT } = require('../middlewares/valida-jwt')
const { validaRole, validaCorreoExiste, validaIdExiste } = require('../helpers/db-validaciones');

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido.').isEmail(),
    check('correo').custom(validaCorreoExiste),
    check('password', 'El password debe ser de más de 6 caracteres').isLength({ min: 6 }),
    check('rol').custom(validaRole),
    validarCampos,
], userPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validaIdExiste),
    check('rol').custom(validaRole),
    validarCampos
], userPut);

router.delete('/:id', [
    validaJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validaIdExiste),
    validarCampos
], userDelete);

router.patch('/', userPatch);

module.exports = router;