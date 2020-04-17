import React, { Component } from 'react'
import './register.css'
import axios from 'axios';

const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formValid = (state) => {
  let valid = true;


  Object.values(state.formsError).forEach(val => {
    
    val.length > 0 && (valid = false);
    if (val.length > 0 || (!state.firstName) || (!state.lastName) || (!state.email) || (!state.password)){
      valid = false;
   
    }
  })

  return valid;
}

class Register extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    registerError: "",
    status: "",
    formsError:{
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    dbEmails: '',
    notSubmited: false,
    
  }

  componentDidMount = () =>{

    axios.get('http://localhost:4000/register').then(res => {
      this.setState({
       dbEmails : res.data
      })
    })

  }


  handleChange = (e) => {

    this.setState({
      notSubmited: false
    })

    const {name,value} = e.target
    let formsError = this.state.formsError

    switch(name){
      case "firstName": 
      formsError.firstName = value.length < 3   ? "Minimum 3 characters" : ''
      break;

      case "lastName": 
      formsError.lastName = value.length < 3 ? "Minimum 3 characters" : ''
      break;

      case "email": 
  
      formsError.email = regexp.test(value) ? formsError.email = this.state.dbEmails.includes(value) ?
      'Email aleardy existe' : '' : 'Invalid email address'
   
      break;

      case "password": 
      formsError.password = value.length < 6  ? "Minimum 6 characters " : ''
      break;
      default:
      break;
    }
    this.setState({formsError,
      [name]: value
    });

    
  }


  handleSubmit = (event) => {

  

    event.preventDefault();

    if(formValid(this.state)){
      console.log('SUBMITED')

      axios.post("http://localhost:4000/register", this.state).then(res => {

        this.setState({
          registerError: res.data.message,
          status: res.data.status
        })
  
  
  
      }).catch(err => {
        console.log(err)
      })

    }else {
      console.log('Not Submitted Invalid input')
      
      this.setState({
        notSubmited: true
      })

    

    }
  

  }


  render() {


    return (


      <section className="connect full-screen full-padding sectionn">
        <div className="container-fluid">

          <div className="row">

            <div className="col-0 col-lg d-none d-lg-block full-padding vh-100" >
              <div className="full-screen bg-main-primary overlay "></div>
              <div className="content text-center padding-box px-5 txtleft">
                <img className="boyuser" src={require('../../img/boysignup.png')} alt="boyuser" />
                <p>Create your Account</p>
                <p>Register now</p>
                <img className="btnsignup" src={require("../../img/btnsignup.png")} alt='btn-register' />

              </div>
            </div>

            <div className="col bg-white padding-box">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                  <div className="my-3 py-5 text-center txtrightside">
                    <p className="text-center text-main-primary mb-4 welcometxt">Hello, There</p>
                    <p className="logintxt">Sign up now</p>
                  </div>
                  {
                    this.state.status === 201 ? (

                      <div className="alert alert-success" role="alert">
                           <h4 className="alert-heading">Active your account</h4>
                              <p>{this.state.registerError}.</p>
                             
                                </div>

                    ) : null
                  }
                  <form method="POST" action="/register" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                      <label htmlFor="name" className="col-sm-12 col-form-label">First name</label>
                      <div className="col-sm-12">
                        <input onChange={this.handleChange} type="text" className={"form-control " + (this.state.formsError.firstName || this.state.notSubmited ? 'is-invalid' : this.state.firstName ? 'is-valid' : null)} id="name" name="firstName" placeholder="First name"  autoFocus />
                        {this.state.formsError.firstName? <span className="errorMessage">{this.state.formsError.firstName}</span> : ''}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="confirm" className="col-sm-12 col-form-label">Last name</label>
                      <div className="col-sm-12">
                        <input onChange={this.handleChange} type="text" className={"form-control " + (this.state.formsError.lastName || this.state.notSubmited ? 'is-invalid' : this.state.lastName ?  'is-valid' : null)} id="lastName" name="lastName" placeholder="Last name"  />
                        {this.state.formsError.lastName? <span className="errorMessage">{this.state.formsError.lastName}</span> : ''}
                  </div>
                    </div>


                    <div className="form-group row">
                      <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-12">
                        <input onChange={this.handleChange} type="email" className={"form-control " + (this.state.formsError.email || this.state.notSubmited ? 'is-invalid' : this.state.email? 'is-valid' : null )} id="email" name="email" placeholder="name@example.com"  />
                        {this.state.formsError.email?  <span className="errorMessage">{this.state.formsError.email}</span> : ''}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                      <div className="col-sm-12">
                        <input onChange={this.handleChange} type="password" className={"form-control " + (this.state.formsError.password || this.state.notSubmited ? 'is-invalid' : this.state.password ?  'is-valid' : null)} id="password" name="password" placeholder="Password"  />
                        {this.state.formsError.password? <span className="errorMessage">{this.state.formsError.password}</span> : ''}
                      </div>
                    </div>



                    <div className="row ">
                      <div className="col-12 btn-sign text-right">
                        <button className="btn2">Register</button>


                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-12  text-center textloginexist">
                        <p>Already have an account? <a href="/">Login</a></p>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>


    )

  }



}


export default Register;