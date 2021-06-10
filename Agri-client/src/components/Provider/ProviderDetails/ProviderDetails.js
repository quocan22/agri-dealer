import React from "react";
import "./ProviderDetails.css"
import pvdetails from "../../../assets/data/pvdetails"
import products from"../../../assets/data/products"
import Product from "../../Products/Product/Product"
import { Grid } from "@material-ui/core";



class ProviderDetails extends React.Component{
  state = {pvdetails, index:0}
  myRef =React.createRef();

  handleTab = index => {
    this.setState({ index: index })
    const images =this.myRef.current.children;
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className ="active";
  };


  render(){
    const {pvdetails, index} = this.state;
    return(
    <div className ="container">
      <div className = "main-grid">
      {
        pvdetails.map(provider =>(
          <div className ="information-details">
            <div className ="information-box">
              <div className ="big-img">
                <img src={provider.imgsrc[index]} alt=""/>
              </div>
              <div className ="information">
                <h2>{provider.name}</h2>
                <div className = "information-description">
                  <div className ="column">
                    <p> Chủ sở hữu:</p>
                    <p>Số điện thoại:</p>
                    <p>Thương hiệu:</p>
                    <p>Sản phẩm cung cấp:	</p>
                    <p>Địa chỉ:	</p>
                    <p>Ngày tham gia: </p>
                    <p>Quy mô nhà vườn:</p>
                    <p>Sản lượng cung cấp: </p>
                  </div>
                  <div className = "column">
                    <p>{provider.owner}</p>
                    <p>{provider.phonenumber}</p>
                    <p>{provider.brand}</p>
                    <p>{provider.providedproduct}</p>
                    <p>{provider.address}</p>
                    <p>{provider.joinDate}</p>
                    <p>{provider.scale}</p>
                    <p>{provider.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="thumb" ref={this.myRef}>
                {
                  provider.imgsrc.map((img, index) =>
                    (<img src={img} alt="" key={index}
                    onClick={() => this.handleTab(index)}/>)
                  )
                }
              </div>
            <div className = "description">
                <h2>GIỚI THIỆU</h2>
                <p>DALAT SKY GARDEN - KHU VƯỜN CỦA GIẤC MƠ </p>
                <br/>
                <p>{provider.description}</p>
            </div>
          </div>
        ))
        
  }
    </div>
    <div className="products">
            <div style={{height: 50, fontSize: 25, padding: 16, backgroundColor: "green"}}>
              SẢN PHẨM
            </div>
            <div className="products-list">
              {products.map((product) => (
                <Grid item key={product.id} container>
                    <Product product={product} />
                </Grid>
              ))}
            </div>
          </div>
  </div>
  )
  }
}
export default ProviderDetails;