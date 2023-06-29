const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: true,
    },
    appointmentDate: {
        type: Date,
        default: new Date(),
    },
    notes: {
        type: String,
    },
    cost: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

module.exports = model('Appointment', appointmentSchema)
