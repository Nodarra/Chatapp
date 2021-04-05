import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDmTuxoKxiaCBc1Dy5I6MpV7DghwP_Hvkw",
  authDomain: "chatapp-83aad.firebaseapp.com",
  projectId: "chatapp-83aad",
  storageBucket: "chatapp-83aad.appspot.com",
  messagingSenderId: "666424059177",
  appId: "1:666424059177:web:abd7d297fd36995c490338"
})

const auth = firebase.auth();
const firestore = firebase.firestore()

function App() {
  return (
    <div className="App">
      Hello World!!!
    </div>
  );
}

export default App;
