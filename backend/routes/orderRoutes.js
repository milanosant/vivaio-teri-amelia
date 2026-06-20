const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Creare un ordine richiede solo di essere loggati (qualsiasi utente)
router.post('/', verifyToken, orderController.createOrder);

// Vedere e gestire tutti gli ordini richiede privilegi Admin
router.get('/', verifyToken, isAdmin, orderController.getOrders);
router.patch('/:id', verifyToken, isAdmin, orderController.updateOrderStatus);

module.exports = router;