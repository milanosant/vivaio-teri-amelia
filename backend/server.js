// ==========================================
// 1. IMPORTAZIONE DELLE LIBRERIE
// ==========================================
const express = require('express');   
const mongoose = require('mongoose'); 
const cors = require('cors');         
require('dotenv').config();           

// ==========================================
// 2. INIZIALIZZAZIONE DELL'APP
// ==========================================
const app = express();

// ==========================================
// 3. MIDDLEWARE (Configurazioni globali)
// ==========================================
app.use(cors()); 
app.use(express.json()); 

// ==========================================
// 4. CONNESSIONE AL DATABASE MONGODB
// ==========================================
// Mongoose usa l'URI nascosto nel file .env per collegarsi
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🟢 Connesso con successo a MongoDB!'))
    .catch((err) => console.error('🔴 Errore di connessione a MongoDB:', err));

// ==========================================
// 5. ROTTE DI BASE (Test)
// ==========================================
app.get('/', (req, res) => {
    res.send('🌿 Server del Vivaio Teri Amelia funzionante in modo eccellente!');
});

// ==========================================
// 6. AVVIO DEL SERVER
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server avviato con successo sulla porta ${PORT}`);
});