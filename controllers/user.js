const { response, request } = require('express');
const bcrypt = require('bcrypt');


const Usuario = require('../models/usuario');

const userGet = async(req = request, res = response) => {
    const { skip = 0, limit = 10 } = req.query;

    //Filtrar solo usuarios activos. En false se considera eliminador.
    const query = {
        estado: true
    }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(skip))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        usuarios
    })
}

const userPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //ToDO validar en base de datos.
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario)
}

const userPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol })

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)

    //Guarda
    usuario.save();

    res.json({
        usuario
    })
}


const userDelete = async(req, res = response) => {

    const { id } = req.params;
    //Elimina fisicamente de BDD Mongo
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Cambia estado a falso, elimina teoricamente.
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    })
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch Api - userPatch controller'
    })
}


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch,
};