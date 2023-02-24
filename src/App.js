import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ModelsPage from './pages/ModelsPage';
import MakesPage from './pages/MakesPage';
import VehicleMakeStore from './stores/VehicleMakeStore';
import VehicleModelStore from './stores/VehicleModelStore';
import store from './stores/store';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
       <Router>
          <div className="App">
            <Link to="/"><button className='menuButton'>Home</button></Link>
            <a href='/vehicleMakes'><button className='menuButton'>Vehicle Makes</button></a>
            <a href='/vehicleModels'><button className='menuButton'>Vehicle Models</button></a>
            <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/vehicleMakes' element={< MakesPage store={store}/>}></Route>
            <Route exact path='/vehicleModels' element={< ModelsPage store={store}/>}></Route>
            </Routes>
          </div>
       </Router>
   );
  }
}

export default App;
