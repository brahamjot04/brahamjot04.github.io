import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKX2C8qBy-DpZi3eCC1Uv0sQfdYLLnKXE",
  authDomain: "project1-33ab8.firebaseapp.com",
  projectId: "project1-33ab8",
  storageBucket: "project1-33ab8.appspot.com",
  messagingSenderId: "512489570769",
  appId: "1:512489570769:web:e3392b2825bd9e9baba0f0"
};

const db = getFirestore(app);
const app = initializeApp(firebaseConfig);

export { db  };




