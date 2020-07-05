import React from 'react';
import Upload from './upload/Upload'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Weight Tracker
      </header>
      <div className="uploadContainer">
        <Upload></Upload>
        {/* <Welcome name="function component"></Welcome>
        <Welcome2 name="class component"></Welcome2>  */}

      </div>
    </div>
  );
}

//Function component: a js function with props as parameter
// function Welcome(props){
//   return <h1>Hello, {props.name}</h1>
// }
// //ES6 Class equivalent: Class component
// class Welcome2 extends React.Component{
//   render(){
//     return <h1>Hello, {this.props.name}</h1>
//   }
// }


export default App;
