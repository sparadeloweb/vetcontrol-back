const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.confirmPassword = async function(password) {
    const same_password = await bcrypt.compare(password, this.password)
    return same_password
}

module.exports = model('User', userSchema)