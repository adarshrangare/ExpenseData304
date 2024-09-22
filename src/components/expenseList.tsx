import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/config';

const ExpenseList = ({ userId }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const expenseRef = ref(database, `expenses/${userId}`);
    const unsubscribe = onValue(expenseRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expenseList = Object.entries(data).map(([id, expense]) => ({
          id,
          ...expense,
        }));
        setExpenses(expenseList);
      } else {
        setExpenses([]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.name} - ${expense.amount} - {new Date(expense.date).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;