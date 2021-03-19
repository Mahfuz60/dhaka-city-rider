import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Component/Header/Header';



function App() {
  return (
    <Router>
    <Header></Header>
      <Switch>
        <Route path='/home'>
        
        
        </Route>
        <Route path='/'>
        
        </Route>

        <Route path='/*'>

        </Route>
        <Route path='/login'>
        
        </Route>
        <Route path='/contact'>
        
        </Route>
        <Route path='/blog'>

        </Route>
      
      
      </Switch>
    
    
    </Router>
  );
}

export default App;
