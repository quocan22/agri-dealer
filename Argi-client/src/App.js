import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Post from "./components/Post/Post";
import Provider from "./components/Provider/Provider";
import ProviderDetails from "./components/Provider/ProviderDetails/ProviderDetails"

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/post" component={Post} />
        <Route path="/provider" component={Provider} />
        <Route path="/pvdetails" component={ProviderDetails} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
