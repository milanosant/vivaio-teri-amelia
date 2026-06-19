// ==========================================
// 1. IMPORTAZIONE DELLE LIBRERIE
// ==========================================
const express = require('express');   // Framework principale per il server
const mongoose = require('mongoose'); // Ci servirà a breve per il database
const cors = require('cors');         // Permette ad Angular di comunicare con Node
require('dotenv').config();           // Carica le variabili dal file .env

// ==========================================
// 2. INIZIALIZZAZIONE DELL'APP
// ==========================================
const app = express();

// ==========================================
// 3. MIDDLEWARE (Configurazioni globali)
// ==========================================
// Abilitiamo le richieste cross-origin (dal frontend al backend)
app.use(cors()); 
// Diciamo ad Express di convertire automaticamente i dati in arrivo in formato JSON
app.use(express.json()); 

// ==========================================
// 4. ROTTE DI BASE (Test)
// ==========================================
app.get('/', (req, res) => {
    res.send('🌿 Server del Vivaio Teri Amelia funzionante in modo eccellente!');
});

// ==========================================
// 5. AVVIO DEL SERVER
// ==========================================
// Recuperiamo la porta dal file .env, altrimenti usiamo la 3000 di default
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server avviato con successo sulla porta ${PORT}`);
});