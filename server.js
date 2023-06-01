const express = require('express');
const app = express();
const stripe = require('stripe')("sk_test_51MFXToL4FK38puHVjaE9fqsdyomkYOovXrIbkKkJ3pLezts65yvCYFkS2Hb1Xz8xLLtVvBrnOFMkcHtlzdDomIoo00pD8JErxU");
const PORT = 3000;

app.use(express.json());

// Create a payment intent for the donation
app.post('/donate', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
