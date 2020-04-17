import React from 'react'
import {withRouter, Redirect, Route} from 'react-router-dom'
import Dashboard from '../pages/Main/index'

const PrivateRoute = ({component:Component, ...rest}) => (

  <Route {...rest} render={()=> (
      localStorage.getItem('token') ? <Dashboard /> : <Redirect to='/' />
  )

} />

)

export default withRouter(PrivateRoute);