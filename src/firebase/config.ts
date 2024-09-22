import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyC2Y5WtCA5bTL2Wk9o_aIfMN5TDRUcKvWg",
  authDomain: "testproject-c69fa.firebaseapp.com",
  databaseURL: "https://testproject-c69fa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testproject-c69fa",
  storageBucket: "testproject-c69fa.appspot.com",
  messagingSenderId: "1092858725521",
  appId: "1:1092858725521:web:5c34c2941a2886374aab30",
  measurementId: "G-C6W8CTQNJS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };