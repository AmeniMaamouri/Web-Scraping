import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';



class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/' ? 'active' : null}>
       <div className="champLeft">
            <i className="pe-7s-graph"></i>
            <p>Dashboard</p>
            </div>
        </li>
    
  
 
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);