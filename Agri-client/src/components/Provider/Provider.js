import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";

import "./Provider.css";
import ProviderCell from "./ProviderCell/ProviderCell";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
const axios = require("axios");


function Provider() {
  const { userAcc } = useContext(AuthContext);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function fetchProvidersData() {
      axios.get('http://localhost:5000/api/users/sellers', {
        }).then(response => {
          setProviders(response.data);
          console.log(response.data);
        }).catch(error => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log(error);
        })
    }
    fetchProvidersData();
  }, [])
  
  return (
    <div className="providers-container">
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        DANH SÁCH NHÀ VƯỜN
      </Typography>
      {(userAcc !== null && userAcc.role === 'user') && (
        <div>
          <Typography
            variant="h5"
            style={{
              marginTop: "20px",
              marginLeft: "35px",
              color: "seagreen",
              alignContent: "center",
              fontWeight: "bold",
            }}
          >
            BẠN CÓ NÔNG SẢN MUỐN BÁN? THAM GIA CÙNG CHÚNG TÔI NGAY HÔM NAY!
          </Typography>
          <Grid style={{ marginTop: "20px", marginLeft: "500px" }}>
            <Link to={"/provider-re"}>
              <button className="register-button">
                Trở thành nhà cung cấp
              </button>
            </Link>
          </Grid>
        </div>
      )}

      <Grid className="list-item" container justify="flex-start" spacing={1}>
        {providers.map((provider) => (
          <Grid item key={provider.userId}>
            <ProviderCell provider={provider} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Provider;
