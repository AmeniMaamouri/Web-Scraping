import React, { Component } from 'react'
import StickyHeadTable from './index'
import axios from 'axios'

class Dashboard extends Component {

    state={
        posts :[],
        searchModele:'',
        minVal: 300000,
    }


    async componentDidMount() {

         await axios.get('http://localhost:4000/dashboard').then(response => {
  
                this.setState({
                    posts: response.data
                })

        })

    }

    handleChangeModele = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
       
   }

   handleChangeSelect = (e) => {
    this.setState({
      minVal: e.target.value
    })
    
   }



    render(){
    

        return (
           <div style={{"marginLeft":"10px"}}>
               
         <form style={{"textAlign": "right", "marginRight": "40px"}}>
           <label style={{"marginRight": "7px" , "fontSize":"15px !important"}}>Model</label>
           <input style={{"marginRight": "15px"}} type='text' name='searchModele' value={this.state.searchModele} onChange={this.handleChangeModele}></input>
           <label style={{"marginRight": "8px"}} >Price</label>
           <select value={this.state.minVal} onChange={this.handleChangeSelect}>
           <option  value="300000">All</option>
           <option  value="4500">Less than 4500</option>
           <option value="3000">Less than 3000</option>
            <option  value="2000">Less than 2000</option>
            <option value="1000">Less than 1000</option>
  <option  value="900">Less than 900</option>
  <option  value="800">Less than 800</option>
  <option  value="700">Less than 700</option>
  <option  value="600">Less than 600</option>
  <option  value="500">Less than 500</option>
  <option  value="400">Less than 400</option>
  <option  value="300">Less than 300</option>
  <option  value="200">Less than 200</option>
  <option  value="100">Less than 100</option>
  <option  value="50">Less than 50</option>
</select>        </form>
            <StickyHeadTable post={this.state} />
            </div>
        )


    }

}

export default Dashboard;