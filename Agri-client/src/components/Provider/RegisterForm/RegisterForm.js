import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Card,
  TextField,
  MenuItem,
  Select,
  Divider,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const axios = require("axios");

function RegisterForm() {
  const { userAcc, setUserAcc } = useContext(AuthContext);
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [scaleUnit, setScaleUnit] = useState("");
  const [capaUnit, setCapaUnit] = useState("");
  const [loading, setLoading] = useState(true);

  const [displayName, setDisplayname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [address, setAddress] = useState("");
  const [production, setProduction] = useState("");
  const [brandName, setBrandName] = useState("");
  const [scale, setScale] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    if (loading) {
      let userId = localStorage.getItem("UserId");
      axios.get("http://localhost:5000/api/users/" + userId).then((res) => {
        setUser(res.data);
        setDisplayname(res.data.userClaims.displayName);
        setPhoneNumber(res.data.userClaims.phoneNumber);
        setAddress(res.data.userClaims.address);
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleRegist = () => {
    if (
      !displayName ||
      !phoneNumber ||
      !sellerName ||
      !address ||
      !production ||
      !selectedFile ||
      !scale ||
      !capacity
    ) {
      return Promise.resolve(false);
    }
    let userId = localStorage.getItem("UserId");
    let loginToken = localStorage.getItem("LoginToken");
    const registForm = new FormData();
    registForm.append("file", selectedFile);
    registForm.append("id", userId);
    registForm.append("phoneNumber", phoneNumber);
    registForm.append("displayName", displayName);
    registForm.append("address", address);
    registForm.append("sellerName", sellerName);
    if (brandName) {
      registForm.append("brandName", brandName);
    }
    registForm.append("production", production);
    registForm.append("scale", scale + scaleUnit);
    registForm.append("capacity", capacity + capaUnit);

    return axios
      .put("http://localhost:5000/api/seller", registForm, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((res) => {
        console.log(res);
        setUserAcc({
          ...userAcc,
          role: "seller",
          displayName: displayName,
        });
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const regist = (e) => {
    e.preventDefault();
    handleRegist().then((res) => {
      if (!res) {
        toast.error("Vui l??ng nh???p ?????y ????? th??ng tin", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } else {
        history.push("/thanks");
      }
    });
  };

  return (
    <>
      {loading ? (
        <p>??ang t???i d??? li???u...</p>
      ) : (
        <div style={{ width: 1000, margin: "20px auto" }} className="container">
          <Helmet>
            <meta charSet="utf-8" />
            <title>????ng k?? b??n h??ng</title>
          </Helmet>
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            ????NG K?? B??N H??NG
          </Typography>
          <div className="profile-setting-main-grid">
            <Card className="profile-setting">
              <Divider />

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>T??n ch??? s??? h???u </label>
                </div>
                <div className="column">
                  <TextField
                    value={displayName}
                    onChange={(e) => setDisplayname(e.target.value)}
                    type="text"
                    variant="outlined"
                    placeholder="T??n ch??? s??? h???u"
                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Email </label>
                </div>
                <div className="column">
                  <TextField
                    defaultValue={user.email}
                    type="email"
                    placeholder="Email"
                    disabled
                    variant="filled"
                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>S??? ??i???n tho???i </label>
                </div>
                <div className="column">
                  <TextField
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="number"
                    placeholder="S??? ??i???n tho???i"
                    variant="outlined"

                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>T??n doanh nghi???p </label>
                </div>
                <div className="column">
                  <TextField
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    type="text"
                    placeholder="T??n doanh nghi???p"
                    variant="outlined"

                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>?????a ch??? cung c???p </label>
                </div>
                <div className="column">
                  <TextField
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    variant="outlined"
                    placeholder="?????a ch???"
                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Gi???i thi???u</label>
                </div>
                <div className="column">
                  <TextField
                    value={production}
                    onChange={(e) => setProduction(e.target.value)}
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>H??nh ???nh nh?? v?????n</label>
                </div>

                <div className="column">
                  <input type="file" accept="image/*" onChange={onSelectFile} />
                  {selectedFile && (
                    <img className="preview-img" src={preview} alt="" />
                  )}
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>
                    T??n th????ng hi???u (n???u c??)
                  </label>
                </div>
                <div className="column">
                  <TextField
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    type="text"
                    placeholder="Th????ng hi???u"
                    variant="outlined"

                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>
                    S???n l?????ng cung c???p ({capaUnit}/n??m){" "}
                  </label>
                </div>
                <div className="column">
                  <div className="row">
                    <TextField
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      type="number"
                      variant="outlined"
                      placeholder="T???ng s???n l?????ng"
                      style={{ width: "450px" }}
                    />

                    <Select
                      defaultValue=""
                      variant="outlined"
                      onChange={(e) => {
                        setCapaUnit(e.target.value);
                      }}
                      style={{ width: "155px", marginLeft: "50px" }}
                    >
                      <MenuItem value="t???n">t???n</MenuItem>
                      <MenuItem value="t???">t???</MenuItem>
                      <MenuItem value="kg">kg</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>
                    Quy m?? nh?? v?????n ({scaleUnit}){" "}
                  </label>
                </div>
                <div className="column">
                  <div className="row">
                    <TextField
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      type="number"
                      placeholder="T???ng di???n t??ch"
                      variant="outlined"
                      style={{ width: "450px" }}
                    />

                    <Select
                      defaultValue=""
                      variant="outlined"
                      onChange={(e) => {
                        setScaleUnit(e.target.value);
                      }}
                      style={{ width: "155px", marginLeft: "50px" }}
                    >
                      <MenuItem value="ha">ha</MenuItem>
                      <MenuItem value="m2">m2</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>

              <Grid style={{ marginTop: "20px", marginLeft: "500px" }}>
                <button className="register-button" onClick={(e) => regist(e)}>
                  ????ng k?? l??m nh?? cung c???p
                </button>
              </Grid>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
export default RegisterForm;
