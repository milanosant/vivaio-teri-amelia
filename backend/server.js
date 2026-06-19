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
// 5. ROTTE DELL'APPLICAZIONE
// ==========================================
// Rotta di test
app.get('/', (req, res) => {
    res.send('🌿 Server del Vivaio Teri Amelia funzionante in modo eccellente!');
});

// Importiamo e usiamo le rotte di autenticazione
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); 
// Questo significa che tutte le rotte in authRoutes avranno "/api/auth" come prefisso
// Importiamo e usiamo le rotte del catalogo piantine
app.use('/api/plants', require('./routes/plantRoutes'));

// ==========================================
// 6. AVVIO DEL SERVER
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server avviato con successo sulla porta ${PORT}`);
});