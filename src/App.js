import React, {useState, useEffect} from 'react';
import './App.css';
import firebase from 'firebase';
import {firestore} from './firebaseConfig';
import ChatRoom from './comps/ChatRoom';
import LoginForm from './comps/LoginForm';

function App() {
    const [username, setUsername] = useState('');

    const [formValue, setFormValue] = useState('');
    
    const messagesRef = firestore.collection('messages');
    const usersRef = firestore.collection('users');

    const updateMessage = (e) => {
        setFormValue(e.target.value);
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        if (formValue === '')
        {
            return;
        }

        await messagesRef.add({
            text: formValue,
            sender: username,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()            
        });

        setFormValue('');

        e.target.reset();
    }

    useEffect(() => { // Everytime the username updates and isn't empty
        username != "" && addUsernameToDatabase();
    }, [username]);

    const addUsernameToDatabase = async () => {
        await usersRef.add({
            name: username,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()   
        })
    }

    return (
        <div className="app" style={{justifyContent: username ? "space-between" : "center"}}>
            {username ? <ChatRoom messagesRef={messagesRef} sendMessage={sendMessage} updateMessage={updateMessage} username={username}/> : <LoginForm setUsername={setUsername} usersRef={usersRef}/>}
        </div>
    )
}

export default App;