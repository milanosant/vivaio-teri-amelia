const mongoose = require('mongoose');

// Creiamo lo "Scheletro" (Schema) della nostra Piantina
const plantSchema = new mongoose.Schema({
    // Dati base e-commerce
    name: { type: String, required: true },               // Nome commerciale (es. "Pomodoro Cuore di Bue")
    scientificName: { type: String, required: true },     // Nome scientifico (es. "Solanum lycopersicum")
    description: { type: String, required: true },        // Descrizione per il catalogo
    price: { type: Number, required: true },              // Prezzo in euro
    
    // Gestione magazzino e disponibilità
    status: { 
        type: String, 
        enum: ['pronte', 'prenota', 'non disponibili'],   // Accetta SOLO uno di questi tre valori
        default: 'pronte' 
    },
    
    // Immagine (qui salveremo l'URL generato da Cloudinary più avanti)
    imageUrl: { type: String },

    // Scheda Botanica Dettagliata (un oggetto "annidato")
    botanicalInfo: {
        temperature: { type: String },                    // Es. "20-25°C"
        watering: { type: String },                       // Es. "Frequente, evitare ristagni"
        sunlight: { type: String },                       // Es. "Pieno sole"
        companions: [{ type: String }]                    // Array di stringhe (es. ["Basilico", "Carote"])
    }
}, { 
    timestamps: true // Aggiunge in automatico "createdAt" e "updatedAt" ad ogni salvataggio
});

// Esportiamo il modello per poterlo usare negli altri file del nostro backend
module.exports = mongoose.model('Plant', plantSchema);