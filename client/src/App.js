import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Register from './regisiter';
import Dashboard from './dashboard';
import './App.css';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path="/dashboard" component={Dashboard}  />
      <Route path="/" component={Register}  />
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
