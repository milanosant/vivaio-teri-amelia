const Plant = require('../models/Plant');

// ==========================================
// R - READ (Pubblico): Ottieni tutte le piantine
// ==========================================
exports.getPlants = async (req, res) => {
    try {
        const plants = await Plant.find(); // Cerca tutte le piantine nel DB
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recupero del catalogo', error });
    }
};

// ==========================================
// R - READ (Pubblico): Ottieni una singola piantina tramite ID
// ==========================================
exports.getPlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) return res.status(404).json({ message: 'Piantina non trovata' });
        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ message: 'Errore nella ricerca', error });
    }
};

// ==========================================
// C - CREATE (Solo Admin): Aggiungi una piantina
// ==========================================
exports.createPlant = async (req, res) => {
    try {
        const newPlant = new Plant(req.body);
        const savedPlant = await newPlant.save();
        res.status(201).json(savedPlant);
    } catch (error) {
        res.status(400).json({ message: 'Errore nella creazione', error });
    }
};

// ==========================================
// U - UPDATE (Solo Admin): Modifica una piantina
// ==========================================
exports.updatePlant = async (req, res) => {
    try {
        const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPlant);
    } catch (error) {
        res.status(400).json({ message: 'Errore nella modifica', error });
    }
};

// ==========================================
// D - DELETE (Solo Admin): Elimina una piantina
// ==========================================
exports.deletePlant = async (req, res) => {
    try {
        await Plant.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Piantina eliminata con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nell\'eliminazione', error });
    }
};

// FUNZIONE: Crea una nuova piantina (Metodo POST)
exports.createPlant = async (req, res) => {
  try {
    // 1. Estraiamo i dati che il frontend ci ha inviato nel "corpo" della richiesta
    const plantData = req.body;

    // 2. Creiamo una nuova "Entity" basata sul nostro Modello Mongoose
    // (Assicurati che il nome 'Plant' corrisponda a come lo hai importato in alto nel file, es. const Plant = require('../models/Plant');)
    const newPlant = new Plant(plantData);

    // 3. Salviamo fisicamente nel database (MongoDB creerà in automatico l' _id)
    const savedPlant = await newPlant.save();

    // 4. Rispondiamo al frontend con un codice 201 (Created) e restituiamo la pianta appena salvata
    res.status(201).json(savedPlant);
    
  } catch (error) {
    console.error('🔴 Errore durante il salvataggio della piantina:', error);
    // Rispondiamo con un codice 500 (Internal Server Error) se qualcosa va storto
    res.status(500).json({ message: "Errore interno del server durante il salvataggio" });
  }
};