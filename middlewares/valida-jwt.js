const { request, response } = require('express');
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario');

const validaJWT = async ( req= request, res= response, next) => {
    const token = req.header('x-token')
    
    if(!token){
        res.status(401).json({
            msg:'El token es obligatorio.'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETOFPRIVATEKEY)
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            res.status(401).json({
                msg: 'Token No válido - Usuario autenticado no existe en Bd.'
            })
        }

        if(!usuario.estado){
            res.status(401).json({
                msg: 'Token No válido - Usuario autenticado con estado: false'
            })
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'El token no es válido.'
        })
    }
}

module.exports = {
    validaJWT
};