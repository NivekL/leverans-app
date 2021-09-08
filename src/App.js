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





function App() {
  return (
    <Router>
      <div className="App">
       <NavBar/>
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

              <Route path="/:category/:id/:name" component={SingleProductPage}>
              </Route>
            </Switch>
          </div>

          <Footer />
       </div>
    </Router>
  );
}

export default App;
