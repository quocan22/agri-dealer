import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Post from "./components/Post/Post";
import Provider from "./components/Provider/Provider";
import ProviderDetails from "./components/Provider/ProviderDetails/ProviderDetails";
import Quotation from "./components/Quotation/Quotation";
import QuotationManage from "./components/Quotation/QuotationManage";
import Profile from "./components/UserProfile/Profile";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import SellingProduct from "./components/AddNewProduct/SellingProduct/SellingProduct";
import ProfileSetting from "./components/ProfileSetting/ProfileSetting";
import Search from "./components/Search/Search";
import RegisterForm from "./components/Provider/RegisterForm/RegisterForm";
import ThanksScreen from "./components/Provider/RegisterForm/ThanksScreen";
import SignUp from "./components/Login/SignUp/SignUp";
import CreateQuotation from "./components/AddNewProduct/CreateQuotation/CreateQuotation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <div>
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/provider" component={Provider} />
          <Route path="/pvdetails/:providerId" component={ProviderDetails} />
          <Route path="/quotation" component={Quotation} />
          <Route path="/quotation-manage" component={QuotationManage} />
          <Route path="/new-quotation" component={CreateQuotation} />
          <Route path="/profile" component={Profile} />
          <Route path="/cart" component={Cart} />
          <Route path="/selling-new-product" component={SellingProduct} />
          <Route path="/profile-setting" component={ProfileSetting} />
          <Route path="/post/:productId" component={Post} />
          <Route path="/search" component={Search} />
          <Route path="/provider-re" component={RegisterForm} />
          <Route path="/thanks" component={ThanksScreen} />
          <Footer />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
