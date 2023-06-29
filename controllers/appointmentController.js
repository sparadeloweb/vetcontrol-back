const Appointment = require('../models/appointmentModel');
const Pet = require('../models/petModel');

const appointmentMethods = {}

// Traer todas las citas
appointmentMethods.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('pet');
        res.json({ status: 200, appointments });
    } catch (err) {
        res.json({ status: 400, message: err.message });
    }
}

// Traer una sola cita
appointmentMethods.getSingleAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('pet');
        if (appointment == null) {
            return res.json({ status: 400, message: 'No se pudo encontrar la cita' });
        }
        res.json({ status: 200, appointment });
    } catch (err) {
        return res.json({ status: 400, message: err.message });
    }
}

// Crear una cita
appointmentMethods.createAppointment = async (req, res) => {
    const { petId, notes, cost, appointmentDate } = req.body;

    if (!petId || !cost) {
        return res.json({ status: 400, message: 'Los campos petId y cost son requeridos' });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
        return res.json({ status: 404, message: 'Mascota no encontrada' });
    }

    const newAppointment = new Appointment({
        pet: petId,
        appointmentDate,
        notes,
        cost
    });

    try {
        const appointment = await newAppointment.save();
        res.json({ status: 200, appointment });
    } catch (err) {
        res.json({ status: 400, message: err.message });
    }
}

// Editar una cita
appointmentMethods.updateAppointment = async (req, res) => {
    const { petId, notes, cost, appointmentDate } = req.body;
    const id = req.params.id;

    try {
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.json({ status: 404, message: 'Cita no encontrada' });
        }

        if (petId) {
            const pet = await Pet.findById(petId);
            if (!pet) {
                return res.json({ status: 404, message: 'Mascota no encontrada' });
            }
            appointment.pet = petId;
        }

        appointment.notes = notes;
        appointment.cost = cost;
        appointment.appointmentDate = appointmentDate;

        await appointment.save();

        return res.json({ status: 200, appointment });
    } catch (err) {
        return res.json({ status: 500, message: err.message });
    }
}

// Eliminar una cita
appointmentMethods.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (appointment == null) {
            return res.json({ status: 400, message: 'No se pudo encontrar la cita para eliminar' });
        }
        await appointment.remove();
        res.json({ status: 200, message: 'Cita eliminada' });
    } catch (err) {
        return res.json({ status: 400, message: err.message });
    }
}

module.exports = appointmentMethods;
