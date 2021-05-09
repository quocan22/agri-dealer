import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import Post from "./components/Post/Post";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/post" component={Post} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
