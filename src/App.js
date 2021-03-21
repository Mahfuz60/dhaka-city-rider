import logo from './logo.svg';
import './App.css';
import backgroundImage from "./images/bgimg.jpg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RideConfirm from './components/RideConfirm/RideConfirm';
import { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <Router>
        <Switch>
          <Route path="/home"> <Home /> </Route>
          <Route path="/login"> <Login /> </Route>
          <PrivateRoute path="/rides/:rideType"> <RideConfirm /> </PrivateRoute> 
          <Route exact path="/"><Home /></Route>
          <Route path="/rides/:rideType"> <RideConfirm /> </Route>
          <Route></Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
