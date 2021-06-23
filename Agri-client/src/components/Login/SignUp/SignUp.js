import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, IconButton, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import '../Login.css';
import logo from "../../../assets/images/Logo3.png";

function SignUp() {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    return (
        <div className="login-screen">
            <form autoComplete="off" className="login-container">
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>
                <TextField style={{margin:5}} autoComplete="off" className="input-group" label="Họ tên" variant="outlined" type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}/>
                <TextField style={{margin:5}} autoComplete="off" className="input-group" label="Số điện thoại" variant="outlined" type="number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                <TextField style={{margin:5}} autoComplete="off" className="input-group" label="Email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <TextField style={{margin:5}} autoComplete="off" className="input-group" label="Mật khẩu" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <div className="register-forgot" >

                <Link to="/login" className="register-forgot-link">
                    <p>Đã có tài khoản? Đăng nhập tại đây!</p>
                </Link>
                </div>

                <button className="login-button">
                    Đăng ký
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
                        Vui lòng nhập đầy đủ các trường.
                    </Alert>
                </Collapse>
            </form>
        </div>
    )
};

export default SignUp;