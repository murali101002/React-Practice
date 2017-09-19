import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Header = (props)=>{
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Play Nine</h2>
        </div>
      </div>
    );
};
const Stars=(props)=>{
  const numOfStars = 1+Math.floor(Math.random()*9);
  let stars=[];
  for(let i=0;i<numOfStars;i++){
    stars.push(<i key={i} className="fa fa-star"></i>);
  }
  return(
    <div className="col-5">
      {stars}
    </div>
  );
}
const Button=(props)=>{
  return(
    <div className="col-2">
      <button>
        =
      </button>
    </div>
  );
}
const Answer=(props)=>{
  return(
    <div className="col-5">
      {props.selectNumbers.map((number,i)=>
        <span key={i}>{number}</span>
      )}
    </div>
  );
}
const Numbers=(props)=>{
  const arryOfNums = [1,2,3,4,5,6,7,8,9];
  const numberClass = (number)=>{
    if(props.selectNumbers.indexOf(number)>=0)
      return "used";
  }
  return(
    <div className="card text-center">
      <div>
        {arryOfNums.map((number,i)=>
          <span className={numberClass(number)} key={i}>{number}</span>
        )}
      </div>
    </div>
  );
}
class Game extends Component {
  state = {
    selectedNums : [2,4]
  }
  render(){
    return(
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <Stars />
            <Button />
            <Answer selectNumbers={this.state.selectedNums}/>
          </div>
          <br/>
          <Numbers selectNumbers={this.state.selectedNums}/>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render(){
    return(
      <div>
        <Game/>
      </div>
    );
  }
}

export default App;
