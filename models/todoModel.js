const {Schema, model} = require('mongoose')
const User = require('./userModel')

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: Boolean,
        default: false,
    },
    owner: String,
    completedAt: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

todoSchema.methods.turnTodo = function() {
    return !this.status
}

todoSchema.methods.getOwner = async function() {
    const user = await User.findById(this.owner)
    return user
}

module.exports = model('Todo', todoSchema)