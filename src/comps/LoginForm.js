import React, {useState} from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function LoginForm({setUsername, usersRef}) {
    const [enteredUsername, setEnteredUsername] = useState('');

    const [isUsernameTaken, setIsUsernameTaken] = useState(false);

    const [hasAccount, setHasAccount] = useState(false);

    const query = usersRef.orderBy('createdAt');   
    const [users] = useCollectionData(query, {idField: 'id'});

    const login = (e) => {
        e.preventDefault();
        
        if (!checkIfUsernameIsTaken(enteredUsername))
        {
            setUsername(enteredUsername);

            setIsUsernameTaken(false);
        }
        else
        {
            setIsUsernameTaken(true);
        }
    }

    const updateUsername = (e) => {
        setEnteredUsername(e.target.value);
    }

    const checkIfUsernameIsTaken = (username) => {
        let usernames = [];
        usernames = users.map(users => users.name);

        return usernames.includes(username);
    }
    
    return (
        <form className="login-form" onSubmit={login}>
            <p className="username">Username:</p>
            <input type="text" onChange={updateUsername}/>

            <button className="login-button">{hasAccount ? "Login" : "Sign up"}</button>

            <p className="taken-username" style={{visibility: isUsernameTaken ? "visible" : "hidden"}}>That username is taken!</p>
        </form>
    )
}

export default LoginForm;
