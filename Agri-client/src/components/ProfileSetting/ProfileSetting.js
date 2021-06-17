import { React } from "react";
import {
  Typography,
  Card,
  ListItem,
  List,
  TextField,
  CardMedia,
  Divider,
  Button,
} from "@material-ui/core";
import "./ProfileSetting.css";
import products from "../../assets/data/products";
import { Link } from "react-router-dom";


function ProfileSetting() {
  return (
    //THÔNG TIN NHÀ CUNG CẤP
    <div className="container">
      <Typography variant="h4" style={{marginBottom:"10px"}}>CHỈNH SỬA THÔNG TIN NHÀ CUNG CẤP</Typography>
      <div className="profile-setting-main-grid">
        <Card className="profile-setting">
          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Ảnh đại diện </label>
            </div>
            <div className="column">
              <CardMedia
                className="setting-avatar"
                image={
                  "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg"
                }
              />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Tên nhà vườn </label>
            </div>
            <div className="column">
              <TextField
                type="text"
                placeholder="Tên nhà vườn"
                variant="filled"
                disabled
              />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Chủ sở hữu </label>
            </div>
            <div className="column">
              <TextField
                type="text"
                placeholder="Chủ sở hữu"
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
              <label style={{ fontSize: "18px" }}>Địa chỉ </label>
            </div>
            <div className="column">
              <TextField type="text" placeholder="Địa chỉ" />
            </div>
          </div>

          <div className="row" style={{ margin: 10 }}>
            <div className="column" style={{ margin: 10, width: 425 }}>
              <label style={{ fontSize: "18px" }}>Sản phẩm cung cấp </label>
            </div>
            <div className="column">
              <Divider />
              {products.map((product) => (
                <List item key={product.id} container>
                  <ListItem button>
                    <Link to={`/${product.id}`} className="card-content-name">
                      <Typography variant="h6" gutterBottom>
                        {product.productName}
                      </Typography>
                    </Link>
                  </ListItem>
                </List>
              ))}
              <Divider />
              <div
                className="row"
                style={{ margin: 10, justifyContent: "flex-end" }}
              >
                <Link to={"/selling-new-product"} className="card-content-name">
                  <Button style={{ color: "seagreen" }}> Thêm sản phẩm</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row" style={{ margin: 10, justifyContent: "center" }}>
            <button className="add-product-button">Cập nhật thông tin</button>
          </div>
        </Card>
      </div>
    </div>


//   //THÔNG TIN CÁ NHÂN
//   <div className="container">
//   <Typography variant="h4" style={{marginBottom:"10px"}}>CHỈNH SỬA THÔNG TIN CÁ NHÂN</Typography>
//   <div className="profile-setting-main-grid">
//     <Card className="profile-setting">
//       <div className="row" style={{ margin: 10 }}>
//         <div className="column" style={{ margin: 10, width: 425 }}>
//           <label style={{ fontSize: "18px" }}>Ảnh đại diện </label>
//         </div>
//         <div className="column">
//           <CardMedia
//             className="setting-avatar"
//             image={
//               "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg"
//             }
//           />
//         </div>
//       </div>

//       <div className="row" style={{ margin: 10 }}>
//         <div className="column" style={{ margin: 10, width: 425 }}>
//           <label style={{ fontSize: "18px" }}>Họ và tên </label>
//         </div>
//         <div className="column">
//           <TextField
//             type="text"
//             placeholder="Họ và tên"
//           />
//         </div>
//       </div>


//       <div className="row" style={{ margin: 10 }}>
//         <div className="column" style={{ margin: 10, width: 425 }}>
//           <label style={{ fontSize: "18px" }}>Email </label>
//         </div>
//         <div className="column">
//           <TextField type="email" placeholder="Email" />
//         </div>
//       </div>

//       <div className="row" style={{ margin: 10 }}>
//         <div className="column" style={{ margin: 10, width: 425 }}>
//           <label style={{ fontSize: "18px" }}>Số điện thoại </label>
//         </div>
//         <div className="column">
//           <TextField type="number" placeholder="Số điện thoại" />
//         </div>
//       </div>

//       <div className="row" style={{ margin: 10 }}>
//         <div className="column" style={{ margin: 10, width: 425 }}>
//           <label style={{ fontSize: "18px" }}>Địa chỉ </label>
//         </div>
//         <div className="column">
//           <TextField type="text" placeholder="Địa chỉ" />
//         </div>
//       </div>
//       <div className="row" style={{ margin: 10, justifyContent: "center" }}>
//         <button className="add-product-button">Cập nhật thông tin</button>
//       </div>
//     </Card>
//   </div>
// </div>

  );
}
export default ProfileSetting;
