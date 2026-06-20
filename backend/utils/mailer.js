const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.inviaNotificaOrdine = async (ordine) => {
  const righeArticoli = ordine.items
    .map(i => `- ${i.plant.name} x${i.quantity} — € ${(i.priceAtPurchase * i.quantity).toFixed(2)}`)
    .join('\n');

  const testoEmail = `
Nuovo ordine ricevuto su Vivaio Teri Amelia!

Cliente: ${ordine.customerName}
Telefono: ${ordine.customerPhone}
Modalità: ${ordine.shippingMethod}

Articoli ordinati:
${righeArticoli}

Totale: € ${ordine.totalAmount.toFixed(2)}
Data: ${new Date(ordine.createdAt).toLocaleString('it-IT')}

Accedi al Pannello Admin per gestire l'ordine.
  `;

  await transporter.sendMail({
    from: `"Vivaio Teri Amelia" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🌿 Nuovo Ordine - ${ordine.customerName}`,
    text: testoEmail
  });
};