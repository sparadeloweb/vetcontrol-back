const authMethods = {}
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

authMethods.signup = async (req, res) => {
    const { username, email, password, name, lastname } = req.body

    if(!username){
        res.status(500).json({
            message: "Debes ingresar un nombre de usuario valido"
        })
    }
    
    if(!email){
        res.status(500).json({
            message: "Debes ingresar un nombre de correo electronico valido"
        })
    }

    if(password.length < 8) {
        res.status(500).json({
            message: "La contraseña debe tener al menos 8 digitos"
        })
    }
    
    const newUser = new User ({
        username, email, password, name, lastname
    })
    
    newUser.password = await newUser.encryptPassword(password)
    
    newUser.save(function (err) {
        if(err){
            if(err && err.keyPattern.hasOwnProperty("username")){
                return res.status(500).json({
                    message: "Ya existe una cuenta registrada con ese nombre de usuario"
                })
            }
            if(err && err.keyPattern.hasOwnProperty("email")){
                return res.status(500).json({
                    message: "Ya existe una cuenta registrada con ese correo electronico"
                })
            }
        } else {
            return res.json({
                message: "Cuenta registrada con exito"
            })   
        }
    })
}

authMethods.signin = async (req, res) => {
    const {user_or_email, password} = req.body
    
    const user = await User.findOne({$or: [{'email': user_or_email}, {'username': user_or_email}]})
    
    if(!user){
        return res.status(500).json({
            message: "El usuario o correo electronico ingresado es incorrecto"
        })
    }

    const authenticate = await user.confirmPassword(password)

    if(!authenticate){
        return res.status(500).json({
            message: "La contraseña ingresada es incorrecta"
        })
    }

    const token = jwt.sign(user._id.toString(), process.env.SECURE_KEY)

    if(!token){
        return res.status(500).json({
            auth: false,
            message: "Hubo un problema en tu inicio de sesion"
        })
    }

    return res.json({
        auth: true,
        token: token,
    })
    
}

module.exports = authMethods