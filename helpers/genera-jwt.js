const jwt = require('jsonwebtoken');

const generaJWT = ( uid) => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETOFPRIVATEKEY, {
            expiresIn: '4h'
        },(err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo general el token');
            }else{
                resolve(token);
            }
        })
    })

}

module.exports = {
    generaJWT
};
