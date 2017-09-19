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
  let stars=[];
  for(let i=0;i<props.stars;i++){
    stars.push(<i key={i} className="fa fa-star"></i>);
  }
  return(
    <div className="col-5">
      {stars}
    </div>
  );
}
const Button=(props)=>{
  let button;
  switch(props.answerIsCorrect){
    case true:
      button = 
      <button className="btn btn-success" onClick={props.acceptAnswer}>
        <i className="fa fa-check"></i>
      </button>
      break;
    case false:
      button = 
      <button className="btn btn-danger">
        <i className="fa fa-times"></i>
      </button>
      break;
    default:
      button = 
      <button className="btn" onClick={props.checkAnswer} disabled={props.selectedNumbers.length===0}>
        =
      </button>
      break;
  }
  return(
    <div>
      <br/>
      <div className="col-2">
        {button}
        <br/><br/>
        <button className="btn btn-warning" onClick={props.redraw} disabled={props.redraws===0}>
          <i className="fa fa-refresh"></i>&nbsp;{props.redraws}
        </button>
      </div>

    </div>
  );
}
const Answer=(props)=>{
  return(
    <div className="col-5">
      {props.selectNumbers.map((number,i)=>
        <span 
          onClick={()=>props.deselectNumber(number)}
          key={i}>{number}
        </span>
      )}
    </div>
  );
}
const Numbers=(props)=>{
  const arryOfNums = [1,2,3,4,5,6,7,8,9];
  const numberClass = (number)=>{
    if(props.usedNumbers.indexOf(number)>=0)
      return "selected";
    if(props.selectNumbers.indexOf(number)>=0)
      return "used";
  }
  return(
    <div className="card text-center">
      <div>
        {arryOfNums.map((number,i)=>
          <span 
            onClick= {()=>props.selectedNumber(number)}
            className={numberClass(number)} key={i}>{number}
          </span>
        )}
      </div>
    </div>
  );
}
class Game extends Component {
  state = {
    selectedNums : [],
    numOfStars:1+Math.floor(Math.random()*9),
    answerIsCorrect:null,
    usedNumbers : [],
    redraws:5
  };
  selectedNumber = (clickedNumber)=>{
    if(this.state.selectedNums.indexOf(clickedNumber)>=0) return;
    this.setState(prevState=>({
      selectedNums:prevState.selectedNums.concat(clickedNumber),
      answerIsCorrect:null
    }));
  };
  deselectNumber = (clickedNumber) => {
    this.setState(prevState=>({
      selectedNums:prevState.selectedNums.filter(number=>number!==clickedNumber),
      answerIsCorrect:null
    }))
  };
  checkAnswer = ()=>{
    this.setState(prevState=>({
      answerIsCorrect:prevState.numOfStars===prevState.selectedNums.reduce((num,i)=>num+i,0)
    }));
  };
  acceptAnswer = ()=>{
    this.setState(prevState=>({
      usedNumbers:prevState.usedNumbers.concat(prevState.selectedNums),
      selectedNums:[],
      answerIsCorrect:null,
      numOfStars:1+Math.floor(Math.random()*9),

    }));
  };
  redraw = ()=>{
    if(this.state.redraws===0) return;
    this.setState(prevState=>({
      numOfStars:1+Math.floor(Math.random()*9),
      selectedNums:[],
      answerIsCorrect:null,
      redraws:prevState.redraws-1
    }))
  };
  
  render(){
    return(
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <Stars stars={this.state.numOfStars} />
            <Button 
              selectedNumbers={this.state.selectedNums}
              checkAnswer={this.checkAnswer}
              answerIsCorrect={this.state.answerIsCorrect}
              acceptAnswer={this.acceptAnswer}
              redraw={this.redraw}
              redraws={this.state.redraws}
            />
            <Answer 
              selectNumbers={this.state.selectedNums}
              deselectNumber={this.deselectNumber}  
            />
          </div>
          <br/>
          <Numbers 
            selectNumbers={this.state.selectedNums} 
            selectedNumber={this.selectedNumber}
            usedNumbers={this.state.usedNumbers}
          />
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
