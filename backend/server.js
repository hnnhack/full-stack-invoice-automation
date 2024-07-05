import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { getAllOrders, getOrderById, getInvoiceRequest, getAllShipments, getShipmentById } from './apiGetOrders.js'
import sendInvoiceEmail from './sendInvoiceMail.js'
const port = process.env.PORT || 5000

const app = express()

app.use(express.json());

app.get('/', (req,res) => {
  res.send('API running ...')
})

// Fetch all orders
app.get('/api/orders', async (req, res) => {
  try {
      const orders = await getAllOrders();
      res.json(orders);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Fetch an order by Id
app.get('/api/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
      const order = await getOrderById(orderId);
      res.json(order);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Fetch all invoice request
app.get('/api/invoice-request', async (req, res) => {
  try {
      const incoiceRequest = await getInvoiceRequest();
      res.json(incoiceRequest);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Send Invoice Email
app.post('/api/send-invoice-email', async (req, res) => {
  const { clientEmail } = req.body;

  if (!clientEmail) {
    return res.status(400).send('Client email is required');
  }

  try {
    await sendInvoiceEmail(clientEmail);
    res.status(200).send('Invoice email sent successfully!');
  } catch (error) {
    console.error('Error sending invoice email:', error);
    res.status(500).send('Internal server error');
  }
});

// Fetch all shipments
app.get('/api/shipments', async (req, res) => {
  try {
      const shipments = await getAllShipments();
      res.json(shipments);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Fetch a shipment by Id
app.get('/api/shipment/:id', async (req, res) => {
  const shipmentId = req.params.id;
  try {
      const order = await getShipmentById(shipmentId);
      res.json(order);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`))