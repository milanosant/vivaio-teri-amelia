const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true }, // Utile per WhatsApp
    
    // Un array (lista) di oggetti comprati
    items: [{
        plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
        quantity: { type: Number, required: true, min: 1 },
        priceAtPurchase: { type: Number, required: true } // "Congeliamo" il prezzo al momento dell'acquisto
    }],
    
    totalAmount: { type: Number, required: true },
    
    shippingMethod: { 
        type: String, 
        enum: ['ritiro in sede', 'spedizione'], 
        required: true 
    },
    
    // Il ciclo di vita dell'ordine
    status: { 
        type: String, 
        enum: ['in attesa', 'confermato', 'pronto', 'ritirato/spedito'], 
        default: 'in attesa' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);