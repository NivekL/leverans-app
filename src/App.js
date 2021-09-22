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
import { ErrorPage } from './components/ErrorPage';
import React, { useState } from 'react';

export const UserContext = React.createContext({
  userName: '',
  setUserName: () => {},
  userCartId: 0,
  setUserCartId: () => {},
});

function App() {
  const [userName, setUserName] = useState('');
  const [userCartId, setUserCartId] = useState(0);
  const userContextValue = {userName, setUserName, userCartId, setUserCartId};


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWhichPopup, setShowWhichPopup] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [triggerCartUpdate, setTriggerCartUpdate] = useState(0);
  const [wishListUpdate, setWishListUpdate] = useState(0);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={userContextValue}>
          <Popups 
            showWhichPopup={showWhichPopup} 
            setShowWhichPopup={setShowWhichPopup} 
            setIsCartOpen={setIsCartOpen}
          />
          <NavBar 
            setShowWhichPopup={setShowWhichPopup} 
            isCartOpen={isCartOpen} 
            setIsCartOpen={setIsCartOpen}
            wishListUpdate={wishListUpdate}
            triggerCartUpdate={triggerCartUpdate}
            setTriggerCartUpdate={setTriggerCartUpdate} 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
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
                    setWishListUpdate={setWishListUpdate} 
                  />
                )} />
                <Route path="*">
                  <ErrorPage />
                </Route>
              </Switch>
            </div>

            <Footer />
          </UserContext.Provider>
       </div>
    </Router>
  );
}

export default App;
