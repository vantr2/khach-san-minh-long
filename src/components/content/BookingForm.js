import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import KhachHangFinder from "../../apis/KhachHangFinder";
import DatPhongOnlineFinder from "../../apis/DatPhongOnlineFinder";
import "../../assets/css/Modal.css";
import {
  NormalizeDate,
  convertTime,
  isWeekend,
  NumberFormat,
} from "../../utils/DataHandler";
const BookingForm = () => {
  const [checkout, setCheckOut] = useState("");
  const [checkin, setCheckIn] = useState("");
  const [nguoilon, setNguoiLon] = useState("1");
  const [trecon, setTreCon] = useState("1");
  const [loaiphong, setLoaiPhong] = useState("");
  const [sophong, setSoPhong] = useState("1");
  const signedIn = window.localStorage.getItem("kh");
  const username = window.localStorage.getItem("kh_name");
  const [khname, setKHName] = useState("");
  const [khsdt, setKhSdt] = useState("");
  const [dsDonDP, setDSDonDp] = useState("");
  const [msg, setMsg] = useState("");

  let hi = useHistory();
  const handleBookingForm = async () => {
    if (signedIn === "no" || !signedIn) {
      hi.push("/dang-nhap/#book");
    } else {
      if (!checkin) {
        setMsg("Bạn cần điền thông tin ngày, giờ nhận phòng.");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      } else if (!checkout) {
        setMsg("Bạn cần điền thông tin ngày, giờ trả phòng.");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      } else if (!loaiphong) {
        setMsg("Bạn muốn loại phòng như thế nào ?.");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      } else if (new Date(checkout) - new Date(checkin) < 0) {
        setMsg("Thời gian nhận phòng và trả phòng không hợp lệ.");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      } else {
        try {
          let tienphong = 0;

          const songay =
            (new Date(checkout) - new Date(checkin)) / (3600 * 1000 * 24);
          if (songay < 1) {
            const sogio = Math.ceil(
              (new Date(checkout) - new Date(checkin)) / (3600 * 1000)
            );
            console.log(
              (new Date(checkout) - new Date(checkin)) / (3600 * 1000)
            );

            if (loaiphong === "Phòng thường") {
              tienphong = 200000 * sophong;
            } else if (loaiphong === "Phòng thường 2") {
              tienphong = 250000 * sophong;
            } else if (loaiphong === "Phòng VIP") {
              tienphong = 500000 * sophong;
            } else if (loaiphong === "Phòng VIP 2") {
              tienphong = 800000 * sophong;
            }
            tienphong *= sogio;
            console.log(sogio, tienphong);
          } else {
            if (loaiphong === "Phòng thường") {
              tienphong = 2000000 * sophong;
            } else if (loaiphong === "Phòng thường 2") {
              tienphong = 2300000 * sophong;
            } else if (loaiphong === "Phòng VIP") {
              tienphong = 3500000 * sophong;
            } else if (loaiphong === "Phòng VIP 2") {
              tienphong = 5000000 * sophong;
            }
            tienphong *= Math.ceil(songay);
            console.log(songay, tienphong);
          }

          if (isWeekend(checkin, checkout) === 0) {
            tienphong *= 1;
          } else if (isWeekend(checkin, checkout) === 1) {
            tienphong *= 1.4;
          } else if (isWeekend(checkin, checkout) === 2) {
            tienphong *= 1.65;
          }

          const res_kh = await KhachHangFinder.get(`/get-account/${username}`);

          const res = await DatPhongOnlineFinder.post("/them", {
            khachhang_id: res_kh.data.data.khachhang.id,
            nguoilon,
            soluongphong: sophong,
            checkin,
            checkout,
            trecon,
            loaiphong,
            tiendexuat: tienphong,
          });
          //   console.log(res.data.data.dponline);
          if (res.data.status === "ok") {
            alert("Booking thành công.");
            setCheckIn("");
            setCheckOut("");
            setNguoiLon("1");
            setTreCon("1");
            setSoPhong("1");
            setLoaiPhong("");
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  };

  const showModal = () => {
    // Get the modal
    var modal = document.getElementById("cart-modal");

    // Get the button that opens the modal
    var btn = document.getElementById("button-active");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  };
  useEffect(() => {
    if (signedIn === "yes") {
      showModal();
    }
  }, [signedIn]);

  const handleClick = async () => {
    const res_kh = await KhachHangFinder.get(`/get-account/${username}`);
    setKHName(res_kh.data.data.khachhang.ten);
    setKhSdt(res_kh.data.data.khachhang.sdt);
    try {
      const res = await DatPhongOnlineFinder.get(
        `/kh-dp/${res_kh.data.data.khachhang.id}`
      );
      setDSDonDp(res.data.data.dponline);
      console.log(res.data.data.dponline);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickDelete = async (e, id) => {
    // e.stopPropagation();
    // console.log(id);
    try {
      const res = await DatPhongOnlineFinder.delete(`/xoa/${id}/${0}`);
      console.log(res);
      if (res.data.status === "ok") {
        alert("Xóa thành công");
        setDSDonDp(
          dsDonDP.filter((don) => {
            return don.id !== id;
          })
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="book" id="book">
      <p className="msg-error">{msg}</p>
      <form className="book-form">
        <div className="form-item">
          <label htmlFor="checkin-date">Ngày nhận phòng: </label>
          <input
            type="datetime-local"
            id="checkin-date"
            value={checkin}
            onChange={(e) => {
              const today = new Date();
              if (new Date(e.target.value) - today > 0)
                setCheckIn(e.target.value);
              else {
                setCheckIn("");
                setMsg("Bạn nên chọn trước thời gian nhận phòng.");
                setTimeout(() => {
                  setMsg("");
                }, 3000);
              }
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="checkout-date">Ngày trả phòng: </label>
          <input
            type="datetime-local"
            id="chekout-date"
            value={checkout}
            onChange={(e) => {
              if (!checkin) {
                setCheckIn("");
                setMsg("Bạn nên chọn thời gian nhận phòng trước.");
                setTimeout(() => {
                  setMsg("");
                }, 3000);
              } else {
                if (
                  new Date(e.target.value) - new Date(checkin) >=
                  2 * 3600 * 1000
                )
                  setCheckOut(e.target.value);
                else {
                  setCheckOut("");
                  setMsg(
                    "Bạn nên chọn thời gian trả phòng sau 2 giờ kể từ thời điểm nhận phòng."
                  );
                  setTimeout(() => {
                    setMsg("");
                  }, 3000);
                }
              }
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="adult">Người lớn: </label>
          <input
            type="number"
            min="1"
            id="adult"
            value={nguoilon}
            onChange={(e) => {
              setNguoiLon(e.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="children">Trẻ nhỏ: </label>
          <input
            type="number"
            min="1"
            id="children"
            value={trecon}
            onChange={(e) => {
              setTreCon(e.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="rooms">Số phòng: </label>
          <input
            type="number"
            min="1"
            id="rooms"
            value={sophong}
            onChange={(e) => {
              setSoPhong(e.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <label htmlFor="Room type">Loại phòng: </label>
          <select
            id="roomtype"
            className="input-label"
            value={loaiphong}
            onChange={(e) => {
              setLoaiPhong(e.target.value);
            }}
          >
            <option value="" disabled>
              Chọn loại phòng ...
            </option>
            <option value="Phòng thường">Phòng thường</option>
            <option value="Phòng thường 2">Phòng thường 2</option>
            <option value="Phòng VIP">Phòng VIP</option>
            <option value="Phòng VIP 2">Phòng VIP 2</option>
          </select>
        </div>
        <div className="form-item">
          <input
            type="button"
            className="btn"
            value="Đặt ngay"
            onClick={handleBookingForm}
          />
        </div>
        {signedIn === "yes" ? (
          <div className="form-item">
            <i
              className="fas fa-cart-arrow-down"
              id="button-active"
              onClick={handleClick}
            ></i>
          </div>
        ) : (
          ""
        )}
      </form>

      <div id="cart-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span
              className="close"
              onClick={() => {
                const modal = document.getElementById("cart-modal");
                modal.style.display = "none";
              }}
            >
              &times;
            </span>
            <h2>
              {khname} - {khsdt} - Danh sách đơn đặt phòng
            </h2>
          </div>
          <div className="modal-body">
            <div className="dpol-container">
              {dsDonDP &&
                dsDonDP.map((don) => {
                  return (
                    <div
                      className="dpol-item"
                      key={don.id}
                      style={{ color: "black" }}
                    >
                      <div className="dpol-info">
                        <div className="dpol-time">
                          Thời gian: {NormalizeDate(don.checkin)}&nbsp;
                          {convertTime(don.checkin)} -{" "}
                          {NormalizeDate(don.checkout)}&nbsp;
                          {convertTime(don.checkout)}
                        </div>
                        <div className="dpol-amount">
                          Số phòng đặt: {don.soluongphong} - Người lớn:{" "}
                          {don.nguoilon} - Trẻ con: {don.trecon}
                        </div>
                        <div className="dpol-room-type">
                          Loại phòng: {don.loaiphong}
                        </div>
                        <div className="dpol-room-type">
                          Số tiền dự kiến:{" "}
                          <strong>{NumberFormat(don.tiendexuat)}</strong> VND
                        </div>
                      </div>
                      <div className="dpol-action">
                        <div className="dpol-status">
                          <i
                            style={
                              don.trangthai + "" === "0"
                                ? { color: "#007bff" }
                                : don.trangthai + "" === "1"
                                ? { color: "#28a745" }
                                : { color: "#dc3545" }
                            }
                            className={
                              don.trangthai + "" === "0"
                                ? "far fa-circle "
                                : don.trangthai + "" === "1"
                                ? "far fa-check-circle "
                                : "fas fa-ban"
                            }
                          >
                            &nbsp;
                            {don.trangthai + "" === "0"
                              ? "Đang chờ"
                              : don.trangthai + "" === "1"
                              ? "Đã đáp ứng"
                              : "Không thể đáp ứng"}
                          </i>
                        </div>
                        {don.trangthai + "" === "0" ? (
                          <div className="dpol-delete-button">
                            <i
                              style={{
                                color: "#dc3545",
                                marginLeft: "10px",
                                cursor: "pointer",
                              }}
                              className="fas fa-trash"
                              onClick={(e) => handleClickDelete(e, don.id)}
                            ></i>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
