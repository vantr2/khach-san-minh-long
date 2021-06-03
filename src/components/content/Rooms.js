import React, { useEffect, useState } from "react";
import PhongFinder from "../../apis/PhongFinder";
import { NumberFormat } from "../../utils/DataHandler";
const Rooms = () => {
  const [dsPhong, setDsPhong] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await PhongFinder.get("/danh-sach-phong-limit/4");
        setDsPhong(res.data.data.phong);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  });

  return (
    <section className="rooms sec-width" id="rooms">
      <div className="title">
        <span className="span-title">Phòng</span>
      </div>
      <div className="rooms-container">
        {/* <!-- single room --> */}
        {dsPhong.map((phong) => {
          return (
            <article className="room" key={phong.id}>
              <div className="room-image">
                <img src={phong.anh} alt={phong.tieude} />
              </div>
              <div className="room-text">
                <h3>{phong.tieude}</h3>
                <div
                  className="room-desctiption-deltail"
                  dangerouslySetInnerHTML={{ __html: phong.mota_chitiet }}
                ></div>

                <p>{phong.mota_ngangon}</p>
                <p></p>
                <p className="rate">
                  <span>{NumberFormat(phong.giaphongtheongay)} /</span> Ngày -{" "}
                  <span>{NumberFormat(phong.giaphongtheogio)} /</span> Giờ
                </p>
                <button type="button" className="btn">
                  <a href="#book" className="a-book">
                    Đặt ngay
                  </a>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Rooms;
