import React, { useState } from "react";
import { useHistory } from "react-router";
import KiemTraDangNhapFrontEnd from "../../apis/KiemTraDangNhapFrontEnd";
import "../../assets/css/DangNhap.css";

const DangNhap = () => {
  const [ten, setTen] = useState("");
  const [mk, setMk] = useState("");
  const [error, setMessageError] = useState("");
  let hi = useHistory();

  const url = window.location.href.split("#");

  const handleLogin = async () => {
    const english = /^[A-Za-z0-9]*$/;
    if (ten === "") {
      setMessageError("Bạn phải nhập tên tài khoản. Không được để trống");
      setTimeout(() => {
        setMessageError("");
      }, 4000);
    } else if (ten.indexOf(" ") >= 0) {
      setMessageError("Tên tài khoản không được chứa khoảng trắng.");
      setTimeout(() => {
        setMessageError("");
      }, 4000);
    } else if (!english.test(ten)) {
      setMessageError("Tên tài khoản không được chứa kí tự đặc biệt hoặc dấu.");
      setTimeout(() => {
        setMessageError("");
      }, 4000);
    } else if (ten.length > 0 && ten.length < 6) {
      setMessageError("Tên tài khoản ít nhất phải có 6 kí tự.");
      setTimeout(() => {
        setMessageError("");
      }, 4000);
    } else if (mk === "") {
      setMessageError("Bạn phải nhập mật khẩu. Không được để trống");
    } else if (mk.indexOf(" ") >= 0) {
      setMessageError("Mật khẩu không được chứa khoảng trắng.");
      setTimeout(() => {
        setMessageError("");
      }, 4000);
    } else if (!english.test(mk)) {
      setMessageError("Mật khẩu không được chứa kí tự đặc biệt hoặc dấu.");
      setTimeout(() => {
        setMessageError("");
      }, 4000);
    } else if (mk.length > 0 && mk.length < 8) {
      setMessageError("Mật khẩu ít nhất phải có 8 kí tự.");
      setTimeout(() => {
        setMessageError("");
      }, 4000);
    } else {
      try {
        const res = await KiemTraDangNhapFrontEnd.post("/", {
          ten: ten,
          mk: mk,
        });
        // console.log(typeof res.data.data.ten_ht);
        if (res.data.status === "ok") {
          window.localStorage.setItem("kh", "yes");
          window.localStorage.setItem("kh_name", res.data.data.ten);
          window.localStorage.setItem("kh_displayname", res.data.data.ten_ht);
          window.localStorage.setItem("kh_avt", res.data.data.avt);
          if (url[1]) {
            alert("Đăng nhập thành công");
            window.location.href = `/#${url[1]}`;
          } else {
            alert("Đăng nhập thành công");
            hi.push("/");
          }
        } else {
          setMessageError(res.data.status);
          setTimeout(() => {
            setMessageError("");
          }, 3000);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };
  return (
    <div className="login-container">
      {/* <form>
        <input
          type="text"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
        />
        <input
          type="password"
          value={mk}
          onChange={(e) => setMk(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Dang nhap
        </button>
        <p>{error}</p>
      </form> */}

      <form className="login-form">
        <h1>ĐĂNG NHẬP</h1>
        <div className="textb">
          <input
            type="text"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
          <div className="placeholder">Tài khoản</div>
        </div>

        <div className="textb">
          <input
            type="password"
            value={mk}
            onChange={(e) => setMk(e.target.value)}
          />
          <div className="placeholder">Mật khẩu</div>
          <div className="show-password fas fa-eye-slash"></div>
        </div>
        <p className="checkbox">{error}</p>

        <button
          type="button"
          className="btn-login fas fa-arrow-right"
          onClick={handleLogin}
        ></button>

        <div className="go-home a-link" onClick={() => hi.push("/")}>
          Trang chủ
        </div>
        <div className="a-link" onClick={() => hi.push("/dang-ki")}>
          Đăng kí
        </div>
      </form>
    </div>
  );
};

export default DangNhap;
