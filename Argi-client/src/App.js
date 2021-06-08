import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Post from "./components/Post/Post";
import Provider from "./components/Provider/Provider";
import ProviderDetails from "./components/Provider/ProviderDetails/ProviderDetails"
import Quotation from "./components/Quotation/Quotation"
import Profile from "./components/UserProfile/Profile"
import Cart from "./components/Cart/Cart"
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/post" component={Post} />
        <Route path="/provider" component={Provider} />
        <Route path="/pvdetails" component={ProviderDetails} />
        <Route path="/quotation" component={Quotation} />
        <Route path="/profile" component={Profile}/>
        <Route path="/cart" component={Cart}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
