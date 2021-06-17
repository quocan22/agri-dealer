import { React, useState, useEffect } from "react";
import {
  MenuItem,
  Typography,
  Card,
  Select,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import "./SellingProduct.css";

function SellingProduct() {
  const [unit, setUnit] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, wheneDver selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="container">
        <Typography variant="h4" >
          ĐĂNG BÁN SẢN PHẨM
        </Typography>   
      <div className="selling-product-main-grid">
        <Card className="selling-product-form">

        <div className="row" style={{ margin: 10 }}>
            <div className="column">
              <label style={{ fontSize: "16px" }}>Tên sản phẩm </label>
              <TextField
                type="text"
                placeholder="Tên sản phẩm"
                variant="outlined"
              />
            </div>
            <div className="column" style={{ width: 300 }}>
              <label style={{ fontSize: "16px" }}>Danh mục sản phẩm </label>
              <Select
                variant="outlined"
              >
                <MenuItem value="Trái cây">Kg</MenuItem>
                <MenuItem value="Rau củ">Quả</MenuItem>
                <MenuItem value="Hoa">Tấn</MenuItem>
              </Select>
            </div>
          </div>
          <div className="row" style={{ margin: 10 }}>
            <div className="column">
              <label style={{ fontSize: "16px" }}>Giá bán </label>
              <TextField
                type="number"
                placeholder="Giá bán"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ color: "grey" }}>
                      VNĐ{" "}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>
            <div className="column" style={{ width: 300 }}>
              <label style={{ fontSize: "16px" }}>Đơn vị </label>
              <Select
                variant="outlined"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
              >
                <MenuItem value="Tấn">Tấn</MenuItem>
                <MenuItem value="Kg">Kg</MenuItem>
                <MenuItem value="Quả">Quả</MenuItem>
                <MenuItem value="Bó">Bó</MenuItem>
                <MenuItem value="Thùng">Thùng</MenuItem>
              </Select>
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column">
              <label style={{ fontSize: "16px" }}>Tổng số lượng </label>
              <TextField
                type="number"
                placeholder="Tổng số lượng"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ color: "grey" }}>
                      {unit}{" "}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }}>
                Số lượng mua tối thiểu{" "}
              </label>
              <TextField
                type="number"
                placeholder="Số lượng mua tối thiểu"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ color: "grey" }}>
                      {unit}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column">
              <label style={{ fontSize: "16px" }}>Mô tả sản phẩm</label>
              <TextField multiline rows={6} variant="filled" />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column">
              <label style={{ fontSize: "16px" }}>Giới thiệu sản phẩm</label>
              <TextField multiline rows={6} variant="filled" />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column">
              <label style={{ fontSize: "16px" }}>Hình ảnh sản phẩm </label>
                <input type="file"  onChange={onSelectFile} />
                {selectedFile && <img className="preview-img" src={preview} alt=""/>}
            </div>
          </div>
          <div className="row" style={{ margin: 10, justifyContent:"flex-end"}}>
            <button className="add-product-button">Thêm sản phẩm</button>
          </div>
        </Card> 
      </div>
    </div>
  );
}
export default SellingProduct;
