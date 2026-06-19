const jwt = require('jsonwebtoken');

// Verifica se l'utente ha un token valido
exports.verifyToken = (req, res, next) => {
    // Il token arriva di solito nell'header "Authorization" come "Bearer [token]"
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Accesso negato. Nessun token fornito.' });

    const token = authHeader.split(' ')[1]; // Prendiamo solo la parte dopo "Bearer"
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Aggiungiamo i dati dell'utente alla richiesta
        next(); // Tutto ok, facciamo passare la richiesta al passaggio successivo
    } catch (error) {
        res.status(400).json({ message: 'Token non valido' });
    }
};

// Verifica se l'utente è un Admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accesso negato. Richiesti privilegi di Admin.' });
    }
    next();
};