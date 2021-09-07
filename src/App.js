import './App.css';
import NavBar from './components/NavBar';
// import Home from './pages/Home';

import { DubaiLuxury } from './pages/DubaiLuxury';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">

     <NavBar/>

      {/* <Home /> */}

      <DubaiLuxury />
    </div>
  );
}

export default App;
