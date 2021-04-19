const { response, request } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const { generaJWT } = require('../helpers/genera-jwt');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        //Valida email existe.
        const usuario =  await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: "usuario / password no son correctos - correo"
            })
        }
 
        //Valida usuario activo
        if(usuario.estado ===  false){
            return res.status(400).json({
                msg: "usuario / password no son correctos - estado = false"
            })
        }

        //Valida contraseña
        const validaPassword = bcrypt.compareSync(password, usuario.password);
        if(!validaPassword){
            return res.status(400).json({
                msg: "usuario / password no son correctos - password"
            })
        }


        //Gerera JWT
        const token = await generaJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Omg, algo salió mal! Contactece con el admin!"
        })
    }


}

module.exports = {
    login
};