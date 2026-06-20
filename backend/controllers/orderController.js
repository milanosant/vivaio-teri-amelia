const Order = require('../models/Order');
const User = require('../models/User');
const { inviaNotificaOrdine } = require('../utils/mailer');

exports.createOrder = async (req, res) => {
  try {
    const utente = await User.findById(req.user.id);
    if (!utente) return res.status(404).json({ message: 'Utente non trovato' });

    const nuovoOrdine = new Order({
      user: utente._id,
      customerName: utente.name,
      customerPhone: utente.phone,
      shippingMethod: req.body.shippingMethod,
      items: req.body.items,
      totalAmount: req.body.totalAmount
    });

    await nuovoOrdine.save();

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const ordineCompleto = await Order.findById(nuovoOrdine._id).populate('items.plant');
      inviaNotificaOrdine(ordineCompleto).catch(err =>
        console.error('Errore invio email notifica:', err)
      );
    } else {
      console.log('📧 Email non configurata: notifica saltata (ordine salvato comunque).');
    }

    res.status(201).json(nuovoOrdine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const ordini = await Order.find()
      .populate('items.plant')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(ordini);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const ordine = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!ordine) return res.status(404).json({ message: 'Ordine non trovato' });
    res.json(ordine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};