// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

// Styles
import './assets/styles/index.css';

// Pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Budget from './pages/Budget/Budget';
import Services from './pages/Services/Services';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/budgets" component={Budget} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/notfound" component={NotFound} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));