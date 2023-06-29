const authMethods = {}
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

authMethods.signup = async (req, res) => {
    const { email, password, name, lastname } = req.body
    
    if(!email){
        res.json({
            status: 500,
            message: "Debes ingresar un nombre de correo electronico valido"
        })
    }

    if(password.length < 8) {
        res.json({
            status: 500,
            message: "La contraseña debe tener al menos 8 digitos"
        })
    }
    
    const newUser = new User ({
        email, password, name, lastname
    })
    
    newUser.password = await newUser.encryptPassword(password)
    
    newUser.save(function (err) {
        if(err){
            if(err && err.keyPattern.hasOwnProperty("email")){
                return res.json({
                    status: 500,
                    message: "Ya existe una cuenta registrada con ese correo electronico"
                })
            }
        } else {
            return res.json({
                status: 500,
                message: "Cuenta registrada con exito"
            })   
        }
    })
}

authMethods.signin = async (req, res) => {
    const {email, password} = req.body
    
    console.log(email, password)

    const user = await User.findOne({email: email})
    
    if(!user){
        return res.json({
            status: 500,
            message: "El correo electronico ingresado es incorrecto"
        })
    }

    const authenticate = await user.confirmPassword(password)

    if(!authenticate){
        return res.json({
            status: 500,
            message: "La contraseña ingresada es incorrecta"
        })
    }

    const token = jwt.sign(user._id.toString(), process.env.SECURE_KEY)

    if(!token){
        return res.json({
            status: 500,
            auth: false,
            message: "Hubo un problema en tu inicio de sesion"
        })
    }

    return res.json({
        status: 200,
        user: user,
        auth: true,
        token: token,
        message: "Inicio de sesión exitoso"
    })
    
}

module.exports = authMethods