import React, { Component } from 'react'
import axios from 'axios';

class Reset extends Component {

  state={
    email:'',
    resetError:'',
    status:'',
  }

  handleChange = (e) =>{
    
    this.setState({
      [e.target.name]: e.target.value
    })

  }


  handleSubmit = (e) => {

    e.preventDefault();

    axios.post("http://localhost:4000/reset", this.state).then(res => {

          this.setState({
            status: res.data.status,
            resetError: res.data.message
          })


    }).catch(err => {
      console.log(err)
    })


  }



    render() {
        return (
            <div>
                <section className="connect full-screen full-padding sectionnn">
        <div className="container-fluid">

          <div className="row">

            <div className="col-0 col-lg d-none d-lg-block full-padding vh-100 mer" >
              <div className="full-screen bg-main-primary overlay "></div>
             
              <div className="content text-center padding-box px-5 txtright">
                <img className='searchImg' src={require("../../assets/images/lock.png")} alt='lock img'/>
                <p className="RegisterRow" >Reset Your Password</p>
                <p className="SignUpRow" ></p>
                <div className="btnsignup">
                  <a className="signupbtn" href="/">Login</a>
                </div>

              </div>
              
            </div>

         

            <div className="col bg-white padding-box">
              <div className="row justify-content-center mb-5 py-4">
                <div className="col-12 col-md-10 col-lg-8">
                  <div className="my-3 py-5 text-center txtrightside">
                    <p className="welcometxt text-center text-main-primary mb-4">Enter Your Email</p>
                   
                    <img className="boySearch" src={require("../../assets/images/userSearch.png")} alt="boyuser" />
                  </div>

                  {
                    this.state.status === 500 ? (

                      <div className="alert alert-success" role="alert">
                           <h4 className="alert-heading">Check your email</h4>
                              <p>{this.state.resetError}.</p>
                             
                                </div>

                    ) : (
                        <p className="errorMsg">{this.state.resetError}</p>
                      )
                  }

                  <form method='POST' action='/' onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                      <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-12">
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" required autoFocus onChange={this.handleChange} />
                      </div>
                    </div>
                

                    <div className="row">
                      <div className="btnlogin col-12">
                        <button type='submit'>Reset</button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            </div>
        )
    }
}

export default Reset