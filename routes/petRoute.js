const express = require('express');
const app = express()
const petMethods = require('../controllers/petController');

// Rutas para el controlador de mascotas
app.get('/pets', petMethods.getAllPets);
app.get('/pets/:id', petMethods.getSinglePet);
app.post('/pets', petMethods.createPet);
app.put('/pets/:id', petMethods.updatePet);
app.delete('/pets/:id', petMethods.deletePet);

module.exports = app;
