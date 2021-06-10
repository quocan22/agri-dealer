import React from "react";
import { Grid } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";

import provider from "../../assets/data/provider";
import "./Provider.css";
import ProviderCell from "./ProviderCell/ProviderCell";

function Provider() {
  return (
    <div className="container">
      <Grid
            className="list-item"
            container
            justify="flex-start"
            spacing={1}
          >
            {provider.map((provider) => (
              <Grid item key={provider.id} >
                <ProviderCell provider={provider} />
              </Grid>
            ))}
          </Grid>
      <button className="read-more-button">
        Xem thêm <i className="fas fa-angle-right"/>
      </button>
    </div>
  );
};

export default Provider;
