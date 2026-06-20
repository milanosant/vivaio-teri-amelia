const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },

    items: [{
        plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
        quantity: { type: Number, required: true, min: 1 },
        priceAtPurchase: { type: Number, required: true }
    }],

    totalAmount: { type: Number, required: true },

    shippingMethod: { 
        type: String, 
        enum: ['ritiro in sede', 'spedizione'], 
        required: true 
    },

    status: { 
        type: String, 
        enum: ['in attesa', 'confermato', 'pronto', 'ritirato/spedito'], 
        default: 'in attesa' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);