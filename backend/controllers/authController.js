const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Utente già registrato' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: 'user' // Forzato sempre: il ruolo admin non è auto-assegnabile dalla registrazione pubblica
        });
        await newUser.save();

        res.status(201).json({ message: 'Utente creato con successo!' });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante la registrazione', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Utente non trovato' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Password errata' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante il login', error });
    }
};