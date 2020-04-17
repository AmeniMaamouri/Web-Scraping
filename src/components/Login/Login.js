import React, { Component } from 'react'
import  '../Login/login.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'



class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginError: "",
      status: ''
    };
  }


 componentDidMount(){



   if (this.props.location.state !== undefined){
    this.setState({ status: this.props.location.state.status,
      loginError: this.props.location.state.loginError })
   }
     
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {


    event.preventDefault();


    axios.post("http://localhost:4000/", this.state).then(res => {

    

      this.setState({
        loginError: res.data.message,
        status: res.data.status
      })

      if (res.data.status === 200) {

        const token = res.data.userToken;
        localStorage.setItem('token', token);
      

        setTimeout(() => {
          this.props.history.push('/dashboard')
        }, 1000)
      }


    }).catch(err => {
      console.log(err)
    })


  }

  render() {

    // let msg

    // if (this.state.status === 200) {
    //  msg = <p className="successMsg">{this.state.loginError}</p>;
    // } else if (this.state.status === 0) {
    //   msg =  <div class="alert alert-success" role="alert">
    //   <h4 class="alert-heading">Activated</h4>
    //   <p>{this.state.loginError}.</p>
    // </div>
    //  }else {
    //  msg =  <p className="errorMsg">{this.state.loginError}</p>;
    // }
 
    return (

      <section className="connect full-screen full-padding sectionnn">
        <div className="container-fluid">

          <div className="row">

            <div className="col-0 col-lg d-none d-lg-block full-padding vh-100 mer" >
              <div className="full-screen bg-main-primary overlay "></div>
             
              <div className="content text-center padding-box px-5 txtright">
                <img className='logooImg' src={require("../../assets/images/logo.png")} alt='Logo'/>
                <p className="RegisterRow" >Don't have an account ?</p>
                <p className="SignUpRow" >Sign up Now</p>
                <div className="btnsignup">
                  <a className="signupbtn" href="/register">Sign up</a>
                </div>

              </div>
            </div>

            <div className="col bg-white padding-box">
              <div className="row justify-content-center ">
                <div className="col-12 col-md-10 col-lg-8">
                  <div className="my-3 py-5 text-center txtrightside">
                    <p className="welcometxt text-center text-main-primary mb-4">Welcome back</p>
                    <p className="logintxt">Login</p>
                    <img className="boyuser" src={require("../../img/boylogin.png")} alt="boyuser" />
                  </div>

                  {this.state.status === 200 ? <p className="successMsg">{this.state.loginError}</p>
                     : this.state.status === 0 ? <div class="alert alert-success" role="alert">
                      <h4 class="alert-heading">Activated</h4>
                      <p>{this.state.loginError} successfully, you can now sign in.</p>
                      </div> : this.state.status === 5 ? null
                            : <p className="errorMsg">{this.state.loginError}</p>}

                  <form method='POST' action='/' onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                      <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-12">
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" required autoFocus onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                      <div className="col-sm-12">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" required onChange={this.handleChange} />
                      </div>
                    </div>

                    <div className="row">
                    
                      <div className="btnlogin col-12">
                        <button type='submit'>Login</button>
                      </div>

                    </div>
                  </form>
                  <div className="col-12 forgotPw text-center">
                        <a href="/reset">Forgot Password?</a>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default withRouter(Login);