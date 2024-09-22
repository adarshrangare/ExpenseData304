import { useState } from 'react';
import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '../firebase/config';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddExpense = ({ userId }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseRef = ref(database, `expenses/${userId}`);
    await push(expenseRef, {
      name,
      amount: parseFloat(amount),
      date: date.toISOString(),
      createdAt: serverTimestamp(),
    });
    setName('');
    setAmount('');
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Expense name"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      {/* <DatePicker selected={date} onChange={(date) => setDate(date)} /> */}
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;