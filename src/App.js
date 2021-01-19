import logo from './logo.svg';
import React from 'react';
import './App.css';

function Header(props) {
  return(
    <header>
      <h1> Greeting Traveler </h1>
      <h3>Things Count Is {props.things_count.length}</h3>
    </header>
  );
}

function ThingElement(props) {
  return(
    <li>
      <h3>{props.thingy.name}</h3>
    </li>
  )
}

function ThingList(props){
  return(
      <main className="main">
          <h2>Thing List</h2>
          <ul>
              { props.list_of_things.map( thing => <ThingElement thingy={thing} />) }
          </ul>
      </main>
  )
}

class ThingsForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:""
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  render(){
    return(
        <form onSubmit={this.handleSubmit}>
            <label> {this.props.label}
                <input type="text" onChange={this.handleChange} required></input>
            </label>

            <input type="submit" value="Add" />
        </form>
    )
  }

  handleChange(event){
    this.setState({name: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onCreate(this.state)
  }

}

function Footer(props) {
  return(
    <footer>
      <h5>#feel_free_to_rest_here {props.text}</h5>
    </footer>
  );
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      things: [
          {
              id: 1,
              name: "rake",
          },
      ],
    };
  }

  handleCreate(thing){
    let all = this.state.things;
    let idSeq
    if (this.state.things.length > 0){
      idSeq = this.state.things[-1]+1
    }else{
      idSeq = 1
    }

    all.push({id: idSeq, name: thing.name});

    this.setState({things: all});
  }




  render(){
    return(
        <div className="App">
            <Header things_count={this.state.things} />
            <ThingsForm label="Write A Thing Name"  onCreate= { (thing) => this.handleCreate(thing) } />
            <ThingList list_of_things={this.state.things} />
            <Footer text="@copyright ASAC"/>
        </div>
    );
  }
}

export default App;
