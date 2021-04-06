import './Styles/App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

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

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom />:<SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>SignOut</button>
  )
}

function ChatRoom(){
  const dummy = useRef()

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [inputText, setInputText] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: inputText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setInputText('');

    dummy.current.scrollIntoView({behaviour: 'smooth'})
  }

  return(
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage}>
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} required/>

        <button type="submit">Send</button>
      </form>
    </>
  )
}

function ChatMessage(props){
  const {text, uid, photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
}

export default App;
