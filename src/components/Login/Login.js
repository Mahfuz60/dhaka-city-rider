import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig'
import { useState } from "react";
import Header from '../Header/Header';
import { useParams } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import FacebookIcon from '../../images/facebook.png';
import GoogleIcon from '../../images/google.png';
import GithubIcon from '../../images/github.png';
import { UserContext } from '../../App';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState(
        {
            isSignedIn: false,
            name: '',
            email: '',
            password: '',
            photo: '',
            error: '',
            success: false
        });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const { rideType } = useParams()

    const [googleUser, setGoogleUser] = useState({});
    const [facebookUser, setFacebookUser] = useState({});
    const [githubUser, setGithubUser] = useState({});

    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var facebookProvider = new firebase.auth.FacebookAuthProvider();
    var githubProvider = new firebase.auth.GithubAuthProvider();

    const blurHandler = (event) => {
        let isFieldValid = true;
        let name = event.target.name;
        let value = event.target.value;
        console.log(event.target.name, event.target.value);
        if (name === 'email') {
            // "/ regular expression /"
            //  "\s" = string 
            // const isEmailValid = /\S+@\S+\.\S+/.test(evnt.target.value);
            // console.log(isEmailValid);
            isFieldValid = /\S+@\S+\.\S+/.test(value);
            console.log(isFieldValid);
        }
        if (name === 'password') {
            const isPasswordContain6Digit = value.length >= 6;
            const isPasswordContain1umber = /\d{1}/.test(value);
            console.log(isPasswordContain6Digit);
            console.log(isPasswordContain1umber);
            isFieldValid = isPasswordContain6Digit && isPasswordContain1umber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }


    const updateUserInfo = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile(
            {
                displayName: name,
            })
            .then(() => {
                console.log('user name update successfully');
                // Update successful.
            }).catch((error) => {
                console.log(error);
                // An error happened.
            });
    }


    const submitHandler = (event) => {
        if (newUser && user.name && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    const { displayName, email } = user;
                    const signedInUser = { name: displayName, email };
                    setUser(newUserInfo);
                    setLoggedInUser(signedInUser)
                    console.log('User data from', user.providerData[0].providerId, "\n", user);
                    setUser(user);
                    console.log(from.pathname);
                    // history.push(`${from.pathname}`)
                    history.replace(from);

                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo)
                    console.log('Signed user data from', user.providerData[0].providerId, "\n", user);
                    // ...
                })
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserInfo(user.name);
                    history.replace(from);
                    const { displayName, email } = user;
                    const signedInUser = { name: displayName, email };
                    setUser(newUserInfo);
                    setLoggedInUser(signedInUser)
                    console.log('User data from', user.providerData[0].providerId, "\n", user);
                    setUser(user);
                    console.log(from.pathname);
                    // history.push(`${from.pathname}`)
                    history.replace(from);

                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo)

                    console.log(res);
                })
                .catch((error) => {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);

                    console.log(errorCode, errorMessage);
                    console.log(newUserInfo);
                    // ..
                });
            console.log(user.name, user.email, user.password);
            console.log('form submitted');
        }
        if (!newUser && user.email && user.password) {
            console.log(user.email, user.password);

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    const { displayName, email } = user;
                    const signedInUser = { name: displayName, email };
                    setUser(newUserInfo);
                    setLoggedInUser(signedInUser)
                    console.log('User data from', user.providerData[0].providerId, "\n", user);
                    setUser(user);
                    console.log(from.pathname);
                    // history.push(`${from.pathname}`)
                    history.replace(from);

                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo)
                    console.log('Signed user data from', user.providerData[0].providerId, "\n", user);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }
        event.preventDefault();
    }

    const signInHandler = (provider, setUser) => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                const newUserInfo = { ...user };
                newUserInfo.error = '';
                newUserInfo.success = true;
                const { displayName, email } = user;
                const signedInUser = { name: displayName, email };
                setUser(newUserInfo);
                setLoggedInUser(signedInUser)
                console.log('User data from', user.providerData[0].providerId, "\n", user);
                setUser(user);
                console.log(from.pathname);
                // history.push(`${from.pathname}`)
                history.replace(from);

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode);
                console.log(errorCode, errorMessage, email);
            });
    };
    return (
        <div >
            <Header />
            <div className="row mt-5 pt-5" style={{ marginTop: '3rem' }}>
                <div className="col-lg-7 mt-5"></div>
                <div className="col-lg-4 mt-4">
                    <div className="container bg-light p-3 border rounded text-primary text-center">
                        {
                            newUser
                                ? <h1 className="mb-3">Sign up</h1>
                                : < h1 className="mb-3">Sign in</h1>
                        }
                        <input className="form-check-input" type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                        <label className="form-check-label fw-bold" htmlFor="newUser">New user</label>
                        <form className="container" action="" onSubmit={submitHandler}>
                            {
                                newUser &&
                                <input className="m-1 border form-control" onBlur={blurHandler} name="name" placeholder="Name" type="text" required />
                            }
                            <input className="m-1 border form-control" onBlur={blurHandler} name="email" placeholder="Email" type="text" required />
                            <input className="m-1 border form-control" onBlur={blurHandler} name="password" placeholder="Password" type="password" required />
                            <input className="btn fs-5 fw-bold m-1 bg-danger border form-control" type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
                        </form>
                        <h4>or continue with </h4>
                        <button className="btn m-1" onClick={() => signInHandler(googleProvider, setGoogleUser)}><img src={GoogleIcon} width="30rem" alt="" /></button>
                        <button className="btn m-1" onClick={() => signInHandler(facebookProvider, setFacebookUser)}><img src={FacebookIcon} width="30rem" alt="" /></button>
                        <button className="btn m-1" onClick={() => signInHandler(githubProvider, setGithubUser)}><img src={GithubIcon} width="30rem" alt="" /></button>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default Login;