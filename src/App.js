import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/Home';
import DubaiLuxury from './pages/DubaiLuxury';
import LondonClassic from './pages/LondonClassic';
import StMoritzSport from './pages/StMoritzSport';
import SingleProductPage from './pages/SingleProductPage';
import Footer from './components/Footer';
import Popups from './components/Popups';
import { Error, ErrorPage } from './components/ErrorPage';
import { useState } from 'react';





function App() {
  const [showWhichPopup, setShowWhichPopup] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [triggerCartUpdate, setTriggerCartUpdate] = useState(0);

  return (
    <Router>
      <div className="App">
        <Popups 
          showWhichPopup={showWhichPopup} 
          setShowWhichPopup={setShowWhichPopup} 
          setIsCartOpen={setIsCartOpen}
        />
        <NavBar 
          setShowWhichPopup={setShowWhichPopup} 
          isCartOpen={isCartOpen} 
          setIsCartOpen={setIsCartOpen}
          triggerCartUpdate={triggerCartUpdate} 
        />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/LondonClassic">
                <LondonClassic />
              </Route>

              <Route path="/StMoritzSport">
                <StMoritzSport />
              </Route>

              <Route path="/DubaiLuxury">
                <DubaiLuxury />
              </Route>

              <Route path="/:category/:id/:name" render={props => (
                <SingleProductPage {...props} 
                  setTriggerCartUpdate={setTriggerCartUpdate} 
                />
              )} />
              <Route path="*">
                <ErrorPage />
              </Route>
            </Switch>
          </div>

          <Footer />
       </div>
    </Router>
  );
}

export default App;
