import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token =
        "sk_test_51MFXToL4FK38puHVjaE9fqsdyomkYOovXrIbkKkJ3pLezts65yvCYFkS2Hb1Xz8xLLtVvBrnOFMkcHtlzdDomIoo00pD8JErxU";
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.get(
          "https://api.stripe.com/v1/payment_intents",
          config
        );
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Latest 10 Donations:</h2>
      <ol>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            Amount donated: {transaction.amount} {transaction.currency}.
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TransactionsList;
