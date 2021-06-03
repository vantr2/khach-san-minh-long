import React from "react";
import "../assets/css/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h1>Giới thiệu về chúng tôi </h1>
          <p>
            Được thành lập năm 2005 bởi những chuyên gia, những họa sỹ mỹ thuật
            công nghiệp đầy tâm huyết. Minh Long rất quan tâm chăm chút hình ảnh
            thương hiệu của mỗi khách khách bởi Minh Long tin rằng thương hiệu
            là tài sản giá trị nhất mà khách hàng có được sau bao nhiêu khó khăn
            gây dựng trên thương trường.
          </p>
        </div>
        <ul className="social-icons">
          <li className="flex">
            <i className="fa fa-twitter fa-2x"></i>
          </li>
          <li className="flex">
            <i className="fa fa-facebook fa-2x"></i>
          </li>
          <li className="flex">
            <i className="fa fa-instagram fa-2x"></i>
          </li>
        </ul>
        <div>
          <h2>Thông tin khách sạn</h2>
          <div className="contact-item">
            <span>
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <span>
              Số 11 khu A, Tập thể Quân Đội, Cầu Niệm, đường Trần Nguyên Hãn,
              quận Lê Chân, Hải Phòng
            </span>
          </div>
          <div className="contact-item">
            <span>
              <i className="fas fa-phone-alt"></i>
            </span>
            <span>1800 6145 - 0904 579 079 </span>
          </div>
          <div className="contact-item">
            <span>
              <i className="fas fa-envelope"></i>
            </span>
            <span>minhlongqc@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
