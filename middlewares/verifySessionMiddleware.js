const jwt = require('jsonwebtoken')
require('dotenv').config()

const verify = {
    verifySessionMiddleware
};

function verifySessionMiddleware(req, res, next) {
    const token = req.headers['x-access-token']
    
    if(token === undefined || token === null || token === ''){
        return res.status(500).json({
            auth: false,
            message: "No tienes acceso a esta seccion"
        })
    }

    const auth = jwt.verify(token, process.env.SECURE_KEY)

    if(!auth){
        return res.status(500).json({
            auth: false,
            message: "No tienes acceso a esta seccion"
        })
    }

    req.user_id = auth;

    next()
}

module.exports = verify;