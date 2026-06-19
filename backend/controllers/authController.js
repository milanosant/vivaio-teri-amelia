const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// LOGICA DI REGISTRAZIONE
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Controlliamo se l'utente esiste già
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Utente già registrato' });

        // 2. Criptiamo la password prima di salvarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Creiamo l'utente nel database
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user' // Se non specificato, diventa un utente normale
        });
        await newUser.save();

        res.status(201).json({ message: 'Utente creato con successo!' });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante la registrazione', error });
    }
};

// LOGICA DI LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Cerchiamo l'utente
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Utente non trovato' });

        // 2. Confrontiamo la password inserita con quella criptata nel database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Password errata' });

        // 3. Se è tutto ok, generiamo il Token (Passaporto)
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Dati che inseriamo nel token
            process.env.JWT_SECRET,            // La chiave segreta del file .env
            { expiresIn: '1d' }                // Il token scade in 1 giorno
        );

        res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante il login', error });
    }
};