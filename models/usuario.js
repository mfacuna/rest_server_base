const { Schema, model } = require('mongoose');

rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, `El nombre es ogligatorio`]
    },
    correo: {
        type: String,
        required: [true, `El correo es ogligatorio`]
    },
    password: {
        type: String,
        required: [true, `La contraseña es ogligatoria`]
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, `El rol es ogligatorio`],
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function() {
    const { __v, _id, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);