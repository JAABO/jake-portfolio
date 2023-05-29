const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51MFXToL4FK38puHVjaE9fqsdyomkYOovXrIbkKkJ3pLezts65yvCYFkS2Hb1Xz8xLLtVvBrnOFMkcHtlzdDomIoo00pD8JErxU');

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
