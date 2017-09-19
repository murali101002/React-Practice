import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Card = (props) => {
    return(
      <div>
        <img src={props.avatar_url}
         style={{marginTop:'10px'}}
         width="75"/>
        <div className="userDetails">
          <div className="name" >
            {props.name}
          </div>
          <div className="company">
            {props.company}
          </div>
        </div>
      </div>
    ); 
}
class Form extends Component{
  state={userName:""};
  userGithubUrl = '';
  handleSubmit = (event)=>{
    event.preventDefault();
    console.log('form submitted by',this.state.userName);
    console.log(this.userGithubUrl);
    this.userGithubUrl=`https://api.github.com/users/${this.state.userName}`;
    axios.get(this.userGithubUrl)
          .then(response=>{
            this.props.onSubmit(response.data);
          },
        error=>{
          console.log("Invalid username");
        });
        this.setState({userName:''});
  };
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type='text' 
        //ref={(input)=>this.userNameInput=input}
        value={this.state.userName}
        onChange={(event)=>this.setState({
          userName:event.target.value
        })}
        placeholder='Github username' required/>
        <button type='submit'>Submit</button>
      </form>
    );
  }
}
class CardList extends Component{
  render(){
    return(
      <div>
        {this.props.cards.map(card=><Card key={card.id} {...card} />)}
      </div>
    );
  }
}

class App extends Component{
  state={
    cards:[]
  };
  addNewCard=(cardInfo)=>{
    this.setState(
      (prevState)=>({
        cards:prevState.cards.concat(cardInfo)
      })
    );
  }
  render(){
    return(
      <div className='container'>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

 export default App;
