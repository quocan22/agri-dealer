import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, IconButton, Collapse } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { toast } from "react-toastify";
import "../Login.css";
import logo from "../../../assets/images/Logo3.png";
import { Helmet } from "react-helmet";
const axios = require("axios");

function SignUp() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [missingAlert, setOpenMissingAlert] = useState(false);
  const [duplicateAlert, setOpenDuplicateAlert] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!email || !displayName || !password || !phoneNumber) {
      setOpenMissingAlert(true);
      return;
    }
    const signUpForm = new FormData();
    signUpForm.append("email", email);
    signUpForm.append("password", password);
    signUpForm.append("displayName", displayName);
    signUpForm.append("phoneNumber", phoneNumber);

    axios
      .post("http://localhost:5000/api/users", signUpForm)
      .then((res) => {
        setOpenMissingAlert(false);
        toast.success("Đăng ký tài khoản thành công", {
          position: toast.POSITION.TOP_CENTER,
        });
        setEmail("");
        setDisplayName("");
        setPassword("");
        setPhoneNumber("");
      })
      .catch((err) => {
        console.log(err);
        setOpenDuplicateAlert(true);
      });
  };

  return (
    <div className="login-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đăng ký</title>
      </Helmet>
      <div autoComplete="off" className="login-container">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <TextField
          style={{ margin: 5 }}
          autoComplete="off"
          className="input-group"
          label="Họ tên"
          variant="outlined"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          style={{ margin: 5 }}
          autoComplete="off"
          className="input-group"
          label="Số điện thoại"
          variant="outlined"
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          style={{ margin: 5 }}
          autoComplete="off"
          className="input-group"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          style={{ margin: 5 }}
          autoComplete="off"
          className="input-group"
          label="Mật khẩu"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="register-forgot">
          <Link to="/login" className="register-forgot-link">
            <p>Đã có tài khoản? Đăng nhập tại đây!</p>
          </Link>
        </div>

        <button onClick={(e) => handleSignUp(e)} className="login-button">
          Đăng ký
        </button>

        <Collapse in={missingAlert}>
          <Alert
            className="alert-error"
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenMissingAlert(false);
                }}
              >
                <i className="fas fa-times" />
              </IconButton>
            }
          >
            Vui lòng nhập đầy đủ các trường.
          </Alert>
        </Collapse>
        <Collapse in={duplicateAlert}>
          <Alert
            className="alert-error"
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenDuplicateAlert(false);
                }}
              >
                <i className="fas fa-times" />
              </IconButton>
            }
          >
            Email đã được sử dụng!
          </Alert>
        </Collapse>
      </div>
    </div>
  );
}

export default SignUp;
