import React from "react";
import "./Profile.css";
import profile from "../../assets/data/profile";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  makeStyles,
} from "@material-ui/core";
const useStyles = 
makeStyles({
  table: {
    minWidth: 650,
  },
});

function Profile() {
  const classes = useStyles();
  return (
    <div className="container-profile">
      <Card className="profile-card">
        <Grid className="row">
          <CardMedia className="user-avatar" image={profile.imgsrc} />
          <Grid className="info">
            <Typography style={{ fontSize: 15 }}>
              Họ và tên:
              <text style={{ margin: 5, fontWeight: "bold" }}>
                {profile.name}
              </text>
            </Typography>
            <Typography style={{ fontSize: 15 }}>
              Số điện thoại:
              <text style={{ margin: 5, fontWeight: "bold" }}>
                {profile.phonenumber}
              </text>
            </Typography>
            <Typography style={{ fontSize: 15 }}>
              Email:
              <text style={{ margin: 5, fontWeight: "bold" }}>
                {profile.email}
              </text>
            </Typography>
            <Typography style={{ fontSize: 15 }}>
              Địa chỉ:
              <text style={{ margin: 5, fontWeight: "bold" }}>
                {profile.address}
              </text>
            </Typography>
            <Typography style={{ fontSize: 15 }}>
              Ngày tham gia:
              <text style={{ margin: 5, fontWeight: "bold" }}>
                {profile.joindate}
              </text>
            </Typography>
          </Grid>
          <Grid className="history">
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Lịch sử giao dịch
            </Typography>
            <Typography variant="subtitle1" style={{ margin: 5 }}>
              - Số lần giao dịch thành công:{" "}
              <text style={{ fontWeight: "bold" }}>3</text>
            </Typography>
            <Typography variant="subtitle1" style={{ margin: 5 }}>
              - Số lượng nhà cung cấp khác nhau:{" "}
              <text style={{ fontWeight: "bold" }}>2</text>
            </Typography>
            <Typography variant="subtitle1" style={{ margin: 5 }}>
              - Số lượt đánh giá:{" "}
              <text style={{ color: "green", fontWeight: "bold" }}>
                {" "}
                Hài lòng (2)
              </text>
              ,
              <text style={{ color: "skyblue", fontWeight: "bold" }}>
                {" "}
                Bình thường (1)
              </text>
              ,
              <text style={{ color: "red", fontWeight: "bold" }}>
                {" "}
                Không hài lòng (0)
              </text>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h4" style={{ margin: 10 }}>Giao dịch gần đây</Typography>
        <p className="separator" style={{ margin: 10 }}></p>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight:"bold"}}>Mã Đơn Hàng</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Nhà Cung Cấp	</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Sản Phẩm	</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Tổng Tiền</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Ngày Mua</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profile.recentorder.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.provider}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.bill}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
export default Profile;
