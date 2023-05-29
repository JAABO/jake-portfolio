import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions');
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Last 10 Transactions:</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            Amount: {transaction.amount} {transaction.currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
