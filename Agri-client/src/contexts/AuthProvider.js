import React, {createContext, useState} from 'react';
const axios = require('axios');

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [userAcc, setUserAcc] = useState(null);

  return (
    <AuthContext.Provider 
      value={{
        userAcc,
        setUserAcc,
        login: async (email, password) => {
          try {
            console.log('email: ' + email + ', password: ' + password);
            let loginFormData = new FormData();
            loginFormData.append('Email', email);
            loginFormData.append('Password', password);
            axios.post('http://localhost:5000/api/login', loginFormData)
              .then(response => {
                return response.data;
              }).then(data => {
                console.log(data);
                setUserAcc(data);
                localStorage.setItem('UserId', data.id);
                localStorage.setItem('LoginToken', data.token);
              }).catch(error => {
                console.log(error.response.data);
              });
          } catch (error) {
            console.error(error);
          }
        },
        logout: async () => {
          try {
            await setUserAcc(null);
            localStorage.removeItem('UserId');
            localStorage.removeItem('LoginToken');
          } catch (error) {
            console.log(error);
          }
        }
      }} >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;