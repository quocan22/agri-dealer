import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  InputAdornment ,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./QuotationCell.css";

function QuotationCell({ quotation }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div>
      <Card className="quotation-box">
        <Link>
          <CardMedia
            className="media-object"
            image={quotation.imgsrc}
            title={quotation.name}
          />
        </Link>
        <CardContent className="media-body">
          <Link className="quotation-name">
            <Typography variant="h5">{quotation.name}
            <span className="badge">{quotation.count} Báo giá</span>
            </Typography>
          </Link>
          <Typography style={{ marginBottom: 10, fontSize: 12 }}>
            (Danh mục:{" "}
            <Link className="small-link"> {quotation.category} </Link>
            <subtitile2> | </subtitile2>
            Được yêu cầu bởi:{" "}
            <Link className="small-link">{quotation.requiredby}</Link>)
          </Typography>
          <Typography style={{ marginTop: 5, fontSize: 15 }}>
            Số lượng cần mua:
            <text style={{ margin: 5, fontWeight: "bold" }}>
              {quotation.requiredamount}
            </text>
          </Typography>
          <Typography style={{ fontSize: 15 }}>
            Ngày mua - hết hạn:
            <text style={{ margin: 5, fontWeight: "bold" }}>
              {quotation.date}
            </text>
          </Typography>
          <Typography
            style={{
              marginTop: 5,
              fontSize: 14,
              fontStyle: "italic",
              color: "grey",
            }}
          >
            "{quotation.description}"
          </Typography>
        </CardContent>
        <Button className="quotation-btn" onClick={handleClickOpen}>
          Báo giá
        </Button>
      </Card>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle style={{ alignContent:"center", color:"seagreen"}} >Báo giá</DialogTitle>
        <DialogContent>
          <DialogContentText  style={{color:"black"}} >
            Báo giá cho sản phẩm 
            <text style={{color: "seagreen"}}> {quotation.name}</text>:
          </DialogContentText>
          <TextField
            label="Giá tiền"
            variant="outlined"
            type="number"
            InputProps={{
            endAdornment:<InputAdornment position="end" style={{color:"grey"}}>VNĐ / {quotation.unit}</InputAdornment>}}
            variant="outlined"
          />
        </DialogContent>
        <DialogContent>
        <DialogContentText style={{color:"black"}}> 
            Lời nhắn cho <text style={{color: "seagreen"}}> {quotation.requiredby}</text>:
        </DialogContentText>
        <TextField
         label="Lời nhắn"
         multiline
         fullWidth
         rowsMax={4}
         variant="outlined"
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:"seagreen"}}>
            Hủy
          </Button>
          <Button onClick={handleClose} style={{color:"seagreen"}}>
            Báo giá
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuotationCell;
