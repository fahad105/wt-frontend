import React from 'react';
import PageContainer from './pageContainer/PageContainer'
import Menu from './menu/Menu';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {activeComponent: "dashboard"}
  }

  activeComponentStateHandler = (menuValue) => {
    this.setState({activeComponent: menuValue})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Weight Tracker
        </header>
        <nav>
          <Menu activeComponentStateHandler={this.activeComponentStateHandler}></Menu>
        </nav>
        <section className="pageContent">
          <PageContainer activeComponent={this.state.activeComponent}/>
        </section>
      </div>
    )
  }
}

export default App;


{/* <Welcome name="function component"></Welcome>
        <Welcome2 name="class component"></Welcome2>  */}
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


