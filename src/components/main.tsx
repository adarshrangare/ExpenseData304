import { useState } from 'react';
import ExpenseList from './expenseList';
import AddExpense from './addExpense';


const users = ['user1', 'user2', 'user3', 'user4'];

export default function Main() {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        {users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
      <AddExpense userId={selectedUser} />
      <ExpenseList userId={selectedUser} />
    </div>
  );
}