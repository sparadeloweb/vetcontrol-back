const express = require('express');
const app = express()
const appointmentMethods = require('../controllers/appointmentController');

// Rutas para el controlador de citas
app.get('/appointments', appointmentMethods.getAllAppointments);
app.get('/appointments/:id', appointmentMethods.getSingleAppointment);
app.post('/appointments', appointmentMethods.createAppointment);
app.put('/appointments/:id', appointmentMethods.updateAppointment);
app.delete('/appointments/:id', appointmentMethods.deleteAppointment);

module.exports = app;
