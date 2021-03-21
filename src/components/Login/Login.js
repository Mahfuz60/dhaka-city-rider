import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";
import { useState,useEffect} from "react";

import Header from "../Header/Header";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Login = () => {
  const [user, setUser] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [googleUser, setGoogleUser] = useState({});
  const [facebookUser, setFacebookUser] = useState({});
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  var githubProvider = new firebase.auth.GithubAuthProvider();

  const blurHandler = (event) => {
    let isFieldValid = true;
    console.log(event.target.name, event.target.value);
    if (event.target.name === "email") {
      
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isFieldValid);
    }
    if (event.target.name === "password") {
      const isPasswordContainDigit = event.target.value.length >= 6;
      const isPasswordContainNumber = /\d{1}/.test(event.target.value);
      console.log(isPasswordContainDigit);
      console.log(isPasswordContainNumber);
      isFieldValid = isPasswordContainDigit && isPasswordContainNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const submitHandler = (event) => {
    if (newUser && user.name && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
        })
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          // updateUserInfo(user.name);

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
      console.log("form submitted");
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)

        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log("signed in user info", res.user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(errorCode, errorMessage);
        });
    }
    event.preventDefault();
  };

  const signInHandler = (provider, setUser) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log(
          "User data from",
          user.providerData[0].providerId,
          "\n",
          user
        );
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
       
        console.log(errorCode);
        console.log(errorCode, errorMessage, email);
      });
  };
  return (
    <div>
      <Header />
      <div className="row" style={{ marginTop: "3rem" }}>
        <div className="col-lg-7"></div>
        <div className="col-lg-4">
          <div className="container bg-light p-3 border rounded text-primary text-center">
            {newUser ? (
              <h1 className="mb-3">Sign Up</h1>
            ) : (
              <h1 className="mb-3">Sign In</h1>
            )}
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => setNewUser(!newUser)}
              name="newUser"
              id=""
            />
            <label className="form-check-label fw-bold" htmlFor="newUser">
              New user
            </label>
            <form action="" onSubmit={submitHandler}>
              {newUser && (
                <input
                  className="m-1 border form-control"
                  onBlur={blurHandler}
                  placeholder="Name"
                  type="text"
                />
              )}
              <input
                className="m-1 border form-control"
                onBlur={blurHandler}
                placeholder="Email"
                type="text"
              />
              <input
                className="m-1 border form-control"
                placeholder="Password"
                type="text"
              />
              {newUser && (
                <input
                  className="m-1 border form-control"
                  onBlur={blurHandler}
                  placeholder="Confirm 
                                Password"
                  type="text"
                />
              )}
              <input
                className="btn fs-5 fw-bold m-1 bg-warning border form-control"
                type="submit"
                value={newUser ? "Sign Up" : "Sign In"}
              />
            </form>
            <h4>or</h4>
            <button
              className="btn btn-primary m-1"
              onClick={() => signInHandler(googleProvider, setGoogleUser)}
            >
              {" "}
              Google User
            </button>
            <br />
            <button
              className="btn btn-primary m-1"
              onClick={() => signInHandler(facebookProvider, setFacebookUser)}
            >
              {" "}
              Facebook User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
