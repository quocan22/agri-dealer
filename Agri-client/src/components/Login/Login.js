import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, IconButton, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../../contexts/AuthProvider';
import './Login.css';
import logo from "../../assets/images/Logo3.png";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const {userAcc, login} = useContext(AuthContext);

    const handleLogin = e => {
        e.preventDefault();
        login(email, password).then(function() { checkLogin(); });
    }

    function checkLogin() {
        if (!userAcc) {
            setOpen(true);
            return;
        }
        history.push("/");
    }

    return (
        <div className="login-screen">
            <form autoComplete="off" className="login-container">
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>
                <TextField autoComplete="off" className="input-group" label="Email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <TextField autoComplete="off" className="input-group" label="Mật khẩu" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <div className="register-forgot">
                    <p>Đăng ký tài khoản</p>
                    <p>Quên mật khẩu</p>
                </div>
                <button className="login-button" onClick={handleLogin} >
                    Đăng nhập
                </button>
                <Collapse in={open}>
                    <Alert className="alert-error" severity="error" 
                        action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <i class="fas fa-times" />
                        </IconButton>
                    }>
                        Tên tài khoản hoặc mật khẩu không đúng.
                    </Alert>
                </Collapse>
            </form>
        </div>
    )
};

export default Login;