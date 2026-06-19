const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    // Colleghiamo la recensione all'ID esatto della piantina
    plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
    
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Da 1 a 5 stelle
    comment: { type: String, required: true },
    imageUrl: { type: String }, // Foto opzionale caricata dal cliente
    
    approved: { type: Boolean, default: false } // Moderazione Admin
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);