const Role = require('../models/role');
const Usuario = require('../models/usuario')

const validaRole = async(rol = '') => {

    const rolExiste = await Role.findOne({ rol })

    if (!rolExiste) {
        throw new Error(`EL rol ${rol} no existe en la base de datos.`)
    }
}

const validaCorreoExiste = async(correo = '') => {
    const correoExiste = await Usuario.findOne({ correo })
    if (correoExiste) {
        throw new Error(`El correo: ${correo} ya se encuentra registrado en la base de datos.`)
    }
}

const validaIdExiste = async(id) => {
    const idExite = await Usuario.findById(id)
    if (!idExite) {
        throw new Error(`El id: ${id} no se encuentra registrado en la base de datos.`)
    }
}



module.exports = {
    validaRole,
    validaCorreoExiste,
    validaIdExiste
};