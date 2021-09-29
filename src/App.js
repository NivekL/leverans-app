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
import React, { useState, createContext } from 'react';
import {isMobile} from 'react-device-detect';
import LoginSignUp from './components/LoginSignUp';

export const UserContext = React.createContext({
  userName: '',
  setUserName: () => {},
  userCartId: 0,
  setUserCartId: () => {},
  productsInwishlist: [],
  setProductInwishlist: () => {},
});

export const ThemeContext = createContext({});

function App() {


  const [userName, setUserName] = useState('');
  const [userCartId, setUserCartId] = useState(0);
  const [productsInwishlist, setProductsInwishlist] = useState([]);
  const userContextValue = {userName, setUserName, userCartId, setUserCartId, productsInwishlist, setProductsInwishlist};


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWhichPopup, setShowWhichPopup] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [triggerCartUpdate, setTriggerCartUpdate] = useState(0);
  const [theme, setTheme] = useState(true);

  const styles = {
    backgroundColor: theme ? "white" : "#202124",
    color: theme ? "black" : "white",
  }

  return (
    <Router>
      <ThemeContext.Provider value={theme}>
      <div className="App" style={styles}>
      {
        (isLoggedIn)
          ? <UserContext.Provider value={userContextValue}>
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
            setTriggerCartUpdate={setTriggerCartUpdate} 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            theme={theme}
            setTheme={setTheme}
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
          </UserContext.Provider> 
          : (isMobile ? 
          <LoginSignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : 
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
            triggerCartUpdate={triggerCartUpdate}
            setTriggerCartUpdate={setTriggerCartUpdate} 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            theme={theme}
            setTheme={setTheme}
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
          </UserContext.Provider>
          )
          }
       </div>
       </ThemeContext.Provider>
    </Router>
  );
}

export default App;
