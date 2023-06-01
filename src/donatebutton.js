import React, { useState } from "react";
import { CardElement, loadStripe } from "@stripe/react-stripe-js";

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const [donationMade, setDonationMade] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a request to the backend to obtain the client secret
      const response = await fetch(
        "https://api.stripe.com/v1/payment_intents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount, currency: "USD" }),
        }
      );

      const data = await response.json();
      setClientSecret(data.clientSecret);

      // Create a Stripe payment intent and handle the payment process
      const stripe = loadStripe(
        "pk_test_51MFXToL4FK38puHVD2sHabbMjyZWi0ONqVKCoImV1iw0XKzMRpaQ1GsvXNyGRV7Bzgkx8Jdv1ZhBkfWcnfN1gb1D00e5dwmxgU"
      );
      const elements = stripe.elements();

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error(error);
        // Handle error
      } else {
        // Payment successful
        console.log("Payment successful");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }

    setAmount("");
    setDonationMade(true);
  };

  return (
    <div>
      {donationMade ? (
        <div>
          <h3>Thank you for donating!</h3>
          <p>We appreciate your contribution.</p>
        </div>
      ) : (
        <div>
          <h3>Make a Donation</h3>
          <form>
            <label>
              Amount:
              <input
                type="text"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </label>
            <br />
            <button type="button" onClick={handleSubmit}>
              Donate
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DonationForm;
