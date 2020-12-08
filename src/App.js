import React from "react";
import {Paper} from "@material-ui/core";
import Draggable from 'react-draggable';

class Note extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
    };
  }

  render(){
    const dragged = this.state.value;
    let dragNote;
    if (dragged) {
      dragNote = <small>You dragged me {this.state.value} time(s). </small>;
    }else {
      dragNote = <small>I am a sticky note! Try dragging me around :) </small>;
    }
    return (
      <div>
        <Draggable
          axis="both"
          handle=".handle"
          scale={1}
          onStop={() => this.setState({value: this.state.value+1})}
        >
          <Paper className="handle" style={{background: "#f0644b", color: "peachpuff", padding: "1rem", margin: "1rem"}}>
            <div>
              <span style={{marginRight: "2rem"}}><strong>{this.props.calories}</strong> calories of <strong>{this.props.name}</strong> logged at {this.props.timestamp}</span>
            </div>
            <div style={{textAlign: "right"}}>
              {dragNote}
            </div>
          </Paper>
        </Draggable>
      </div>
    );
  }
}

class Form extends React.Component {
  static initState(){
    return {
      key: new Date().toLocaleTimeString(),
      name: "",
      calories: "",
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  constructor(props){
    super(props);
    this.state = Form.initState();
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCalories = this.handleChangeCalories.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeCalories(event) {
    this.setState({calories: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name && this.state.calories) {
      this.setState({timestamp: new Date().getTime()});
      this.setState({key: this.state.timestamp});
      this.props.addItem(this.state);
    }
    this.setState(Form.initState());
  }

  render(){
    return (
      <Paper style={{width: "15rem", margin: "1rem", padding: "1rem", borderRadius: "10px", backgroundColor: "#ffff98"}}>
        <form onSubmit={this.handleSubmit}>
          <input style={{margin: "1rem", border: "none", height: "5vh", width:"80%"}} value={this.state.name} placeholder="Food" onChange={this.handleChangeName}/>
          <input style={{margin: "1rem", border: "none", height: "5vh", width:"80%"}} type="number" value={this.state.calories} placeholder="Calories" onChange={this.handleChangeCalories}/>
          <button type="submit" style={{backgroundColor: "#f0644b", margin: "1rem", padding: "0.5rem", borderRadius: "5px", color: "white", border: "none"}}>Log</button>
        </form>
      </Paper>
    )
  }
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      total_calories: 0,
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(event) {
    this.state.items.push({
      key: event.timestamp,
      timestamp: event.timestamp,
      name: event.name,
      calories: event.calories,
    });

    this.setState({
      items: this.state.items,
      total_calories: Number(this.state.total_calories) + Number(event.calories),
    });
  }

  render() {
    return (
      <div className="main">
        <Form addItem={this.addItem}/>
        <div style={{flexDirection: "row", flexWrap: "wrap", width: "75%"}}>
          <h1 style={{padding: "1rem", color: "#f0644b"}}>Total Calories: {this.state.total_calories}</h1>
          {this.state.items.map((note) => <Note key={note.key} timestamp={note.timestamp} style={{width: "100%"}} name={note.name} calories={note.calories}/>)}
        </div>
      </div>
    )
  }
}

export default App;
