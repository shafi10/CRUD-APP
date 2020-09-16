import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {AddData} from './components/AddData'
import { Navbar } from './components/Navbar'
import {Data} from './components/Data'
import { GlobalData } from './contexApi/dataContex'
import { UpdateData } from './components/UpdateData'
import Alert from './components/Alert'

function App() {
  return (
    <GlobalData>
    <div className="App">
      <Router>
          <Navbar />
        <div className="container">
          <Alert />
        <Route exact path="/" component={Data} />
        <Switch>
        <Route exact path="/addData" component={AddData} />
        <Route exact path="/update/:id" component={ UpdateData } />
        </Switch>
        </div>
      </Router>
    </div>
    </GlobalData>
  );
}

export default App;
