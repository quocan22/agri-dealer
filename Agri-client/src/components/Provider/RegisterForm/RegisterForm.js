import { React, useState, useEffect } from "react";

import {
  Typography,
  Card,
  Button,
  FormGroup,
  FormControlLabel,
  TextField,
  Fade,
  Checkbox,
  MenuItem,
  Select,
  Paper,
  CardMedia,
  Divider,
  Grid
} from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const axios = require("axios");

function RegisterForm() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [cateList, setCateList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [unit, setUnit] = useState("");
  const useStyles = makeStyles((theme) => ({
    root: {
      height: 180,
    },
    container: {
      display: 'flex',
    },
    paper: {
      margin: theme.spacing(1),
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
  }));
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCateList(response.data);
      })
      .catch((error) => console.log(error));
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
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

   
  
  const classes = useStyles();
 
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  
  return (
    <div className="container">
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        ĐĂNG KÝ BÁN HÀNG
      </Typography>
      <div className="profile-setting-main-grid">
        <Card className="profile-setting">
            <Divider></Divider>
         
          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Tên doanh nghiệp </label>
            </div>
            <div className="column">
              <TextField type="text" placeholder="Tên doanh nghiệp" />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Tên chủ sở hữu </label>
            </div>
            <div className="column">
              <TextField
                type="text"
                placeholder="Tên chủ sở hữu"
                variant="filled"
                disabled
              />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Email </label>
            </div>
            <div className="column">
              <TextField type="email" placeholder="Email" />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Số điện thoại </label>
            </div>
            <div className="column">
              <TextField type="number" placeholder="Số điện thoại" />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Địa chỉ cung cấp </label>
            </div>
            <div className="column">
              <TextField type="text" placeholder="Địa chỉ" />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Giới thiệu</label>
              </div>
              <div className="column">
                <TextField multiline rows={6} variant="outlined" />
              </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Hình ảnh nhà vườn</label>
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
              <label style={{ fontSize: "18px" }}>Loại sản phẩm cung cấp</label>
              </div>
              <div className="column">
              <Select defaultValue="" variant="outlined">
                {cateList.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.categoryName}
                  </MenuItem>
                ))}
              </Select>
              </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Sản lượng cung cấp ({unit}/năm) </label>
              </div>
              <div className="column">
                  <div className="row">
              <TextField
                type="number"
                placeholder="Tổng sản lượng"
                style={{width: "450px"}}
              />

              <Select
                defaultValue=""
                variant="outlined"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                style={{width: "155px", marginLeft:"50px"}}
              >
                <MenuItem value="tấn">tấn</MenuItem>
                <MenuItem value="tạ">tạ</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
              </Select>
              </div>
              </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Quy mô nhà vườn ({unit}) </label>
              </div>
              <div className="column">
                  <div className="row">
              <TextField
                type="number"
                placeholder="Tổng diện tích"
                style={{width: "450px"}}
              />

              <Select
                defaultValue=""
                variant="outlined"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                style={{width: "155px", marginLeft:"50px"}}
              >
                <MenuItem value="ha">ha</MenuItem>
                <MenuItem value="m2">m2</MenuItem>
              </Select>
              </div>
              </div>
          </div>

          
          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Chứng nhận</label>
              </div>
              <div className="column">
              <FormGroup column>
              <FormControlLabel
       control={<GreenCheckbox checked={checked} onChange={handleChange} name="checkedA" />}
       label="An toàn thực phẩm"
      />
         <div className={classes.container}>
        <Fade in={checked}>
          <Paper className={classes.paper}>
            <Button style={{color:"seagreen", outlineColor:"seagreen"}}>Hình ảnh chứng nhận</Button>
            <div className="column">
              <CardMedia
                className="setting-avatar"
                image={
                  "data:image/png;base64,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"
                }
              />
            </div>
          </Paper>
        </Fade>
      </div>

            </FormGroup>
              </div>
          </div>



          <Grid style={{marginTop:"20px",marginLeft:"500px"}}>
      <Link to={"/thanks"}  >
            <button className="register-button">
        Đăng ký làm nhà cung cấp
      </button>
      </Link> 
      </Grid>
        </Card>
      </div>
    </div>
  );
}
export default RegisterForm;
