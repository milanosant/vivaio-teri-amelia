const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Rotte Pubbliche (Visibili a tutti i clienti)
router.get('/', plantController.getPlants);
router.get('/:id', plantController.getPlantById);

// Rotte Protette (Accessibili SOLO con Token e ruolo Admin)
router.post('/', verifyToken, isAdmin, plantController.createPlant);
router.put('/:id', verifyToken, isAdmin, plantController.updatePlant);
router.delete('/:id', verifyToken, isAdmin, plantController.deletePlant);

module.exports = router;