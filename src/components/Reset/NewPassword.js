import React, { Component } from 'react'
import '../Register/register.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import NotFound from '../NotFound/NotFound';


const formValid = (state) => {
  let valid = true;


  Object.values(state.formsError).forEach(val => {
    
    val.length > 0 && (valid = false);
    if (val.length > 0 || (!state.newPassword) || (!state.confirmPassword) ){
      valid = false;
    }

})

if ( state.newPassword !== state.confirmPassword ){
  valid = false;
 
  state.formsError.newPassword = 'Not conform'
  state.formsError.confirmPassword= 'Not conform'

}
return valid;
}

class NewPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          newPassword: "",
          confirmPassword: "",
          status:'',
          email:'',
          messageError:'',
          formsError: {
            newPassword:'',
            confirmPassword:'',
          },
          notSubmited: false
        };
      }


      componentDidMount(){

        axios.put("http://localhost:4000/reset/:token", this.props.match.params).then(res => {
         
           

            this.setState({
                status: res.data.status,
                email: res.data.email,
                messageError: res.data.message
            })

            
   
        })
          
       }

  handleChange = (e) => {
   

    this.setState({
      notSubmited: false,
  
    })

    const {name,value} = e.target
    let formsError = this.state.formsError

    switch(name){
     

      case "newPassword": 
      formsError.newPassword = value.length < 6 ? "Minimum 6 characters " : ''
    
      
  
      break;

      case "confirmPassword": 
      formsError.confirmPassword = value.length < 6  ? "Minimum 6 characters " : ''
      if(this.state.newPassword) formsError.confirmPassword =  value !== this.state.newPassword ? "Not conform" : ''

      break;


      default:
      break;
    }
    this.setState({formsError,
      [name]: value
    });
  }


  handleSubmit = (e) => {

    
    e.preventDefault();

    if(formValid(this.state)){
      console.log('SUBMITED')

      axios.post("http://localhost:4000/reset/:token", this.state).then(res => {

      this.setState({
        messageError: res.data.message,
        status: res.data.status
      })

      setTimeout(() => { 
        this.props.history.push('/')
      }, 3000);
      


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

        <div>
      { this.state.status === 600 || this.state.status === 750 || this.state.status === 700 ? <section className="connect full-screen full-padding sectionn">
      <div className="container-fluid">

        <div className="row">

             <div className="col-0 col-lg d-none d-lg-block full-padding vh-100" >
               <div className="full-screen bg-main-primary overlay "></div>
              <div className="content text-center padding-box px-5 txtleft">
                <img className="passwordImg" src={require('../../assets/images/password1.png')} alt="boyuser" />
                <p>Forgot Your Password?</p>
               
                <img className="btnsignup" src={require("../../img/btnsignup.png")} alt='btn-register' />

             </div>
       </div>

       <div className="col bg-white padding-box">
              <div className="row justify-content-center mb-5 py-4">
               <div className="col-12 col-md-10 col-lg-8">
                <div className="my-3 py-5 text-center txtrightside">
                   <p className="text-center text-main-primary mb-4 welcometxt">Enter Your New Password</p>
           <p className="logintxt"></p>
                   </div>
                   {
                    this.state.status === 700 ? (

                     <div className="alert alert-success resetpwpop" role="alert">
                          <h4 className="alert-heading">Password Changed</h4>
                              <p>{this.state.messageError}.</p>
                             
                                </div>

                   ) : (
                      <p className="errorMsg">{this.state.messageError}</p>
                     )
                  }
                 <form method="POST" action="/reset/:token" onSubmit={this.handleSubmit}>
                  
            

                    <div className="form-group row">
                       <label htmlFor="newPassword" className="col-sm-6 col-form-label">New Password</label>
                       <div className="col-sm-12">
                         <input onChange={this.handleChange} type="password" className={"form-control " + (this.state.formsError.newPassword || this.state.notSubmited ? 'is-invalid' : this.state.newPassword? 'is-valid' : null )} id="newPassword" name="newPassword" placeholder="Password" required />
                         {this.state.formsError.newPassword? <span className="errorMessage">{this.state.formsError.newPassword}</span> : ''}
                       </div>
                     </div>

                     <div className="form-group row">
                       <label htmlFor="password" className="col-sm-6 col-form-label">Confirm Password</label>
                       <div className="col-sm-12">
                         <input onChange={this.handleChange} type="password" className={"form-control " + (this.state.formsError.confirmPassword || this.state.notSubmited ? 'is-invalid' : this.state.confirmPassword? 'is-valid' : null )} id="confirmPassword" name="confirmPassword" placeholder="Password" required />
                         {this.state.formsError.confirmPassword? <span className="errorMessage">{this.state.formsError.confirmPassword}</span> : ''}
                       </div>
                     </div>



                     <div className="row ">
                       <div className="col-12 btn-sign text-right">
                         <button className="btn2">Reset</button>


                       </div>
                     </div>
                     <div className="row ">
                       <div className="col-12  text-center textloginexist">
                         <p>You know your password? <a href="/">Login</a></p>
                       </div>
                     </div>

                   </form>
                 </div>
             </div>
            </div>
          </div>
       </div>

      </section> : this.state.status === 650?<NotFound /> : null
        
    } 
    </div>
    )

  }



}


export default withRouter(NewPassword)