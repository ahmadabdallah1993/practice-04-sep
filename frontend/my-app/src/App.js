import React from 'react';
import axios from 'axios';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      cat: []
    }
  }


  componentDidMount = () => {
    axios.get('http://localhost:3000/getCat').then( result =>{
      console.log(result.data);
      this.setState({
        cat: result.data
      })

    }).catch( err=>{
      console.log('error')
    })
  }

  render(){
    return(
      <div>
        <h1>Cat System</h1>
        {this.state.cat.map( item =>{
          return(
            <>
            <h4>Name: {item.name}</h4>
            <h4>Breed: {item.breed}</h4>
            <br></br>
            </>
          )
        })}
      </div>
    )
  }
}

export default App;
