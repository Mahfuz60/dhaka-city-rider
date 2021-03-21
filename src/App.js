import logo from './logo.svg';
import './App.css';
import backgroundImage from "./images/bgImg.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRouter/PrivateRoute';

if (!firebase.apps.length===0) {
  firebase.initializeApp(firebaseConfig);
}
function App() {

  return (
      <Router>
        <Switch>
          <Route path="/home"> <Home/> </Route>
          <Route path="/login"> <Login/> </Route>
          <PrivateRoute path="/rides/:rideType">  </PrivateRoute>
          <Route exact path="/"><Home/></Route>
          <Route> </Route>
          <Route></Route>
        </Switch>
      </Router>
  );
}

export default App;
