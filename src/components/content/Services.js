import React from "react";

const Services = () => {
  return (
    <div>
      <section className="services sec-width" id="services">
        <div className="title">
          <span className="span-title">Dịch vụ</span>
        </div>
        <div className="services-container">
          <article className="service">
            <div className="service-icon">
              <span>
                <i className="fas fa-utensils"></i>
              </span>
            </div>
            <div className="service-content">
              <h2>Food Service/ Food Runner</h2>
              <p>
                Luôn sẵn sàng phục vụ 24/24h, Khách sạn sẽ mang đến cho quí
                khách những thực đơn đa dạng thơm ngon và đảm bảo an toàn thực
                phẩm{" "}
              </p>
            </div>
          </article>

          <article className="service">
            <div className="service-icon">
              <span>
                <i className="fas fa-swimming-pool"></i>
              </span>
            </div>
            <div className="service-content">
              <h2>Refreshment</h2>
              <p>
                Luôn sẵn sàng phục vụ 24/24h, Khách sạn sẽ mang đến cho quí
                khách những đồ uống phong phú như cà phê, nước ép, sinh tố, ...
              </p>
            </div>
          </article>

          <article className="service">
            <div className="service-icon">
              <span>
                <i className="fas fa-broom"></i>
              </span>
            </div>
            <div className="service-content">
              <h2>Housekeeping</h2>
              <p>
                Dịch vụ dọn phòng 2 lần /ngày đảm bảo cho quý khách môi trường
                sạch sẽ, thân thiện nhất
              </p>
              <br />
            </div>
          </article>
          <article className="service">
            <div className="service-icon">
              <span>
                <i className="fas fa-door-closed"></i>
              </span>
            </div>
            <div className="service-content">
              <h2>Room Security</h2>
              <p>
                hệ thông khóa hiện đại cùng bảo vệ 24/24 sẽ khiến bạn cảm thấy
                an toàn khi ở trong khách sạn
              </p>
              <br />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Services;
