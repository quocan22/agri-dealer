import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>AGRIDEAL</h2>
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter" />
            </Link>
          </div>
          <div className="footer-link-items">
            <h2>THÔNG TIN</h2>
            <Link to="/">Về AgriDeal</Link>
            <Link to="/">Dịch vụ khách hàng</Link>
            <Link to="/">Liên hệ hợp tác</Link>
          </div>
          <div className="footer-link-items">
            <h2>LIÊN HỆ</h2>
            <ul>
              <div className="social-contact">
                <p>
                  <i class="fas fa-map-marker-alt"></i> Địa chỉ: Khu phố 6, Linh
                  Trung, Thủ Đức, Hồ Chí Minh{" "}
                </p>
              </div>
              <div className="social-contact">
                <p>
                  <i class="fas fa-phone-square"></i> Số điện thoại:{" "}
                  <a href="tel:+84378776022">+84 378 776 022</a>
                </p>
              </div>
              <div className="social-contact">
                <p>
                  <i class="fas fa-envelope"></i> Email:{" "}
                  <a href="mailto:quocan.omg@gmail.com">quocan.omg@gmail.com</a>
                </p>
              </div>
              </ul>
          </div>
        </div>
      </div>
      <section class="copy-rights">
        <p class="footer-company">All Rights Reserved. &copy; 2021</p>
      </section>
    </div>
  );
}

export default Footer;
