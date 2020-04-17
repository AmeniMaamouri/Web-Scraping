import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Activate from './components/activate/Activate'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Main/index'
import NotFound from './components/NotFound/NotFound';
import Reset from './components/Reset/Reset';
import NewPassword from './components/Reset/NewPassword';



class App extends Component {




  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/reset" render={() => <Reset />} />
          <Route exact path="/activate/:token" render={() => <Activate />} />
          <Route exact path="/reset/:token" render={() => <NewPassword />} />
          <PrivateRoute exact path="/dashboard" render={() => <Dashboard />} />
          <Route path='*' exact={true} render={() => <NotFound />} />
        </Switch>
      </BrowserRouter>
    )



  }


}

export default App;
