import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';


class UserInfo extends Component {

  state = {
    isShowingUserMenu: false,
    
  };

  handleClick = (e) => {
    localStorage.clear();
    this.props.history.push('/')
  }


  render() {
   
    return (
      <div className="user-wrapper">
        <div className="user">
          <img src={require("../../img/user.png")} alt='avatar' className="photo" />
          <div className="userinfo">
            <div className="username">
            {this.props.username}
            </div>
            <a onClick={this.handleClick}>Logout</a>
          </div>
          
        </div>
       
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.Auth.user
});

export default withRouter(
  connect(mapStateToProps)(UserInfo))