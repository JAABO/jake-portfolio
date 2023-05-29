import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51MFXToL4FK38puHVD2sHabbMjyZWi0ONqVKCoImV1iw0XKzMRpaQ1GsvXNyGRV7Bzgkx8Jdv1ZhBkfWcnfN1gb1D00e5dwmxgU");

const PaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.get("/create-payment-intent", {
      amount,
    });
    const { clientSecret } = response.data;

    setClientSecret(clientSecret);

    const stripe = await stripePromise;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          number: "4242424242424242",
          exp_month: 12,
          exp_year: 2023,
          cvc: "123",
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log("Payment succeeded:", result.paymentIntent.id);
    }
  };

  return (
    <div>
      <h2>Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
        </label>
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default PaymentForm;
