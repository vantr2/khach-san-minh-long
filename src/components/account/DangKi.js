import React, { useState } from "react";
import TaiKhoanFinder from "../../apis/TaiKhoanFinder";
import KhachHangFinder from "../../apis/KhachHangFinder";
import NormalizeString from "../../utils/NormalizeString";
import { useHistory } from "react-router";
import "../../assets/css/DangNhap.css";
const DangKi = () => {
  let hi = useHistory();
  const [tenKH, setTenKH] = useState("");
  const [gioitinh, setGioiTinh] = useState("");
  const [ngaysinh, setNgaySinh] = useState("");
  const [diachi, setDiaChi] = useState("");
  const [cmnd, setCMND] = useState("");
  const [sdt, setSdt] = useState("");
  const [acc, setAcc] = useState("");
  const [mk, setMk] = useState("");
  const [xnmk, setXnMk] = useState("");
  const [msg, setMsg] = useState("");
  const [stk, setStk] = useState("");

  const handleSignUp = async () => {
    const english = /^[A-Za-z0-9]*$/;
    if (acc === "") {
      setMsg("Bạn phải nhập tên tài khoản. Không được để trống");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } else if (acc.indexOf(" ") >= 0) {
      setMsg("Tên tài khoản không được chứa khoảng trắng.");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } else if (!english.test(acc)) {
      setMsg("Tên tài khoản không được chứa kí tự đặc biệt hoặc dấu.");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } else if (acc.length > 0 && acc.length < 6) {
      setMsg("Tên tài khoản ít nhất phải có 6 kí tự.");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } else if (mk === "") {
      setMsg("Bạn phải nhập mật khẩu. Không được để trống");
    } else if (mk.indexOf(" ") >= 0) {
      setMsg("Mật khẩu không được chứa khoảng trắng.");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } else if (!english.test(mk)) {
      setMsg("Mật khẩu không được chứa kí tự đặc biệt hoặc dấu.");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } else if (mk.length > 0 && mk.length < 8) {
      setMsg("Mật khẩu ít nhất phải có 8 kí tự.");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } else if (xnmk !== mk) {
      setMsg("Xác nhận mật khẩu không đúng.");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    } else if (!tenKH) {
      setMsg("Tên khách hàng không được để trống");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      //
    } else if (gioitinh === "") {
      setMsg("Giới tính không được để trống");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      //
    } else if (!ngaysinh) {
      setMsg("Ngày sinh không được để trống");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      //
    } else if (!cmnd) {
      setMsg("Chứng minh nhân dân không được để trống");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      //
    } else if (cmnd.length !== 12) {
      setMsg("Chứng minh nhân dân không hợp lệ. (gồm 12 số). ");
      setTimeout(() => {
        setMsg("");
      }, 3500);
    } else if (!sdt) {
      setMsg("Số điện thoại không được để trống");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      //
    } else if (sdt.length < 10 || sdt.length > 11) {
      setMsg(
        "Số điện thoại không hợp lệ. (gồm 10 số với di động, 11 số với máy bàn)."
      );
      setTimeout(() => {
        setMsg("");
      }, 5000);
    } else if (stk.length < 9 || stk.length > 15) {
      setMsg("Số tài khoản không hợp lệ.");
      setTimeout(() => {
        setMsg("");
      }, 5000);
    } else if (!diachi) {
      setMsg("Địa chỉ không được để trống");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      //
    } else {
      try {
        const res_check_cmnd = await KhachHangFinder.get(
          `/kiem-tra-cmnd/${cmnd}`
        );
        const res_check_sdt = await KhachHangFinder.get(`/kiem-tra-sdt/${sdt}`);
        const res_check_stk = await KhachHangFinder.get(`/kiem-tra-stk/${stk}`);
        console.log(res_check_stk.data.data.khachhang.count);
        if (res_check_cmnd.data.data.khachhang.count === "1") {
          setMsg("Chứng minh nhân dân đã tồn tại.  ");
          setTimeout(() => {
            setMsg("");
          }, 3500);
        } else if (res_check_sdt.data.data.khachhang.count === "1") {
          setMsg("Số điện thoại đã tồn tại.  ");
          setTimeout(() => {
            setMsg("");
          }, 3500);
        } else if (res_check_stk.data.data.khachhang.count === "1") {
          setMsg("Số tài khoản đã tồn tại.  ");
          setTimeout(() => {
            setMsg("");
          }, 3500);
        } else {
          const res_tk = await TaiKhoanFinder.post(
            "/them-tai-khoan-khach-hang",
            {
              ten: acc,
              mk: mk,
              ten_hienthi: tenKH,
            }
          );
          if (res_tk.data.status === "ok") {
            const res_kh = await KhachHangFinder.post("/them", {
              ten: NormalizeString(tenKH),
              cmnd: cmnd,
              gioitinh: gioitinh,
              ngaysinh: ngaysinh,
              diachi: NormalizeString(diachi),
              sdt: sdt,
              kieukhachhang_id: 2,
              account: res_tk.data.data.acc.ten,
              stk: stk,
            });
            if (res_kh.data.status === "ok") {
              alert("Đăng kí thành công");
              hi.push("/dang-nhap");
            }
          } else {
            setMsg(res_tk.data.status);
            setTimeout(() => {
              setMsg("");
            }, 3000);
          }
        }
      } catch (er) {
        console.log(er.message);
      }
    }
  };
  return (
    <div className="register-container">
      <form className="register-form">
        <h2>ĐĂNG KÍ</h2>
        <div className="textb">
          <input
            type="text"
            value={acc}
            onChange={(e) => setAcc(e.target.value)}
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

        <div className="textb">
          <input
            type="password"
            value={xnmk}
            onChange={(e) => setXnMk(e.target.value)}
          />
          <div className="placeholder">Xác nhận mật khẩu</div>
          <div className="show-password fas fa-eye-slash"></div>
        </div>

        <div className="textb">
          <input
            type="text"
            value={tenKH}
            onChange={(e) => setTenKH(e.target.value)}
          />
          <div className="placeholder">Họ và tên</div>
        </div>

        <div className="textb">
          <select
            value={gioitinh}
            onChange={(e) => setGioiTinh(e.target.value)}
          >
            <option value="" disabled>
              Chọn ...
            </option>
            <option value="0">Nam</option>
            <option value="1">Nữ </option>
            <option value="2">KXD</option>
          </select>
          <div className="placeholder">Giới tính</div>
        </div>

        <div className="textb">
          <input
            type="date"
            value={ngaysinh}
            onChange={(e) => setNgaySinh(e.target.value)}
          />
          <div className="placeholder">Ngày sinh</div>
        </div>

        <div className="textb">
          <input
            type="text"
            value={cmnd}
            onChange={(e) => setCMND(e.target.value)}
          />
          <div className="placeholder">Chứng minh nhân dân</div>
        </div>

        <div className="textb">
          <input
            type="text"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
          />
          <div className="placeholder">Số điện thoại</div>
        </div>

        <div className="textb">
          <input
            type="text"
            value={stk}
            onChange={(e) => setStk(e.target.value)}
          />
          <div className="placeholder">Số tài khoản</div>
        </div>

        <div className="textb">
          <input
            type="text"
            value={diachi}
            onChange={(e) => setDiaChi(e.target.value)}
          />
          <div className="placeholder">Địa chỉ</div>
        </div>
        <p className="checkbox">{msg}</p>

        <button type="button" className="btn-register" onClick={handleSignUp}>
          Đăng kí
        </button>

        <div className="go-home a-link" onClick={() => hi.push("/")}>
          Trang chủ
        </div>
        <div className="a-link" onClick={() => hi.push("/dang-nhap")}>
          Đăng nhập
        </div>
      </form>
    </div>
  );
};

export default DangKi;
