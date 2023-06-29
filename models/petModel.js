const {Schema, model} = require('mongoose');

const petSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    type: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    lastVisit: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})


module.exports = model('Pet', petSchema)