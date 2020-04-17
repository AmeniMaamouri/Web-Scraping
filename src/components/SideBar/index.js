import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import UserInfo from './UserInfo';
import Nav from './Nav';
import backgroundImage from 'assets/images/sidebar-5.jpg';

class SideBar extends Component {

  state = {
    username:''
  };

  componentDidMount(){
    var token =  localStorage.getItem('token');
    const tokenPayload = jwt.decode(token);
   
    this.setState({
     username: tokenPayload.userName
    })
 
   }

  render() {
    let {
     
      enableBackgroundImage,
    } = this.props;

    return (
      <div className="sidebar" >

        <div className="brand">
         
            <img src={require("../../img/logo_new.png")} alt="logo" className="logo" />
       
        </div>

        <div className="sidebar-wrapper">
          <UserInfo username={this.state.username}/>
          <div className="line"></div>
          <Nav />
        </div>
        <div
          className="sidebar-background"
          style={{
            backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
          }}>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
  backgroundColor: state.ThemeOptions.backgroundColor,
  backgroundImage: state.ThemeOptions.backgroundImage
});

export default withRouter(
  connect(mapStateToProps)(SideBar)
);