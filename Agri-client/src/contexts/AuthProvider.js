import React, { createContext, useState } from "react";
const axios = require("axios");

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAcc, setUserAcc] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        userAcc,
        setUserAcc,
        login: (email, password) => {
          try {
            let loginFormData = new FormData();
            loginFormData.append("Email", email);
            loginFormData.append("Password", password);
            return axios
              .post("http://localhost:5000/api/login", loginFormData)
              .then((response) => {
                setUserAcc(response.data);
                localStorage.setItem("UserId", response.data.id);
                localStorage.setItem("LoginToken", response.data.token);
                return true;
              })
              .catch((error) => {
                console.log(error.response.data);
                return false;
              });
          } catch (error) {
            console.error(error);
            return false;
          }
        },
        logout: async () => {
          try {
            await setUserAcc(null);
            localStorage.removeItem("UserId");
            localStorage.removeItem("LoginToken");
          } catch (error) {
            console.log(error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
