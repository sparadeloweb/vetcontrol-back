const Pet = require('../models/petModel');

const petMethods = {}

// Traer a todas las mascotas
petMethods.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json({ status: 200, data: pets });
    } catch (err) {
        res.json({ status: 400, message: err.message });
    }
}

// Traer a una sola mascota
petMethods.getSinglePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (pet == null) {
            return res.json({ status: 400, message: 'No se pudo encontrar la mascota' });
        }
        res.json({ status: 200, data: pet });
    } catch (err) {
        return res.json({ status: 400, message: err.message });
    }
}

// Crear una mascota con validaciones
petMethods.createPet = async (req, res) => {
    const { name, dateOfBirth, type, owner, lastVisit } = req.body;

    if (!name || !type || !owner) {
        return res.json({ status: 400, message: 'Los campos nombre, tipo y dueño son requeridos' });
    }

    const newPet = new Pet({
        name,
        dateOfBirth,
        type,
        owner,
        lastVisit
    });

    try {
        const pet = await newPet.save();
        res.json({ status: 200, data: pet });
    } catch (err) {
        res.json({ status: 400, message: err.message });
    }
}

// Editar Mascota
petMethods.updatePet = async (req, res) => {
    const id = req.params.id;
    const { name, dateOfBirth, type, owner } = req.body;
    
    try {
      const pet = await Pet.findById(id);
  
      if (!pet) {
        return res.json({ status: 404, message: 'Mascota no encontrada' });
      }
  
      pet.name = name;
      pet.dateOfBirth = dateOfBirth;
      pet.type = type;
      pet.owner = owner;
      await pet.save();
  
      return res.json({ status: 200, data: pet });
    } catch (err) {
      return res.json({ status: 500, message: err.message });
    }
}  

// Eliminar una mascota
petMethods.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (pet == null) {
            return res.json({ status: 400, message: 'No se pudo encontrar la mascota para eliminar' });
        }
        await pet.remove();
        res.json({ status: 200, data: 'Mascota eliminada' });
    } catch (err) {
        return res.json({ status: 400, message: err.message });
    }
}

module.exports = petMethods;
