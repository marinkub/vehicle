import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import ViewVehicleMakes from './pages/ViewVehicleMakes';
import VeiwVehicleModels from './pages/ViewVehicleModels';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
       <Router>
           <div className="App">
            <button className='menuButton'><Link to="/">Home</Link></button>
            <button className='menuButton'><Link to="/vehicleMakes">Vehicle Makes</Link></button>
            <button className='menuButton'><Link to="/vehicleModels">Vehicle Models</Link></button>
            <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/vehicleMakes' element={< ViewVehicleMakes />}></Route>
            <Route exact path='/vehicleModels' element={< VeiwVehicleModels />}></Route>
            </Routes>
           </div>
       </Router>
   );
  }
}

export default App;
