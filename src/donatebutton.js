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

    const instance = axios.create({baseURL: 'http://localhost:3000'})

    const options = {
        method: 'POST',
        url: '/create-payment-intent',
        data: 
            {
              amount: "2500",
              currency: 'USD'
            },
        
    };

    instance
    .request(options)
    .then(function (response) {
      console.log(response.data);
      // div innerHTML
      return response.data;

    })
    .catch(function (error) {
        console.error(error);
    });
    

  };

  return (
    <div>
      <h2>Make a Donation 23</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
          />
        </label>
        <button type="submit">Donate blah ablah</button>
        
      </form>
      <div>
        {resp.map(p => (
          <div>
            <ProductCard productName={p.productName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentForm;
