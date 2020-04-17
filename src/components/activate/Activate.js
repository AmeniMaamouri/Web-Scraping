import { Component } from 'react'
import  '../Login/login.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'


class Activate extends Component {

  state={
      url:'',
      status: '',
      loginError:''
   
  }

    async componentDidMount() {

        var url = this.props.match.params.token;

     await this.setState({
            url
        })
      
   await axios.put('http://localhost:4000/activate/:token', this.state).then(res => {

        this.setState({
          status: res.data.status,
          loginError: res.data.message
        })

       
    }).catch(err => {
      console.log(err)
    })
      
     this.props.history.push({
      pathname: '/', 
      state: { status: this.state.status,
        loginError: this.state.loginError}
    })


   }

    render(){
     
      // let displayComponent;
     
      // if (this.state.status == 0) {
      //   displayComponent = <Login status={this.state.status}  loginError={this.state.loginError} />
      // }else {
      //   displayComponent = <NotFound />
      // }

        return(
          
         null
    
        )
    }

}
export default withRouter(Activate);
