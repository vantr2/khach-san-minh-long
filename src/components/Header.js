import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../assets/css/Header.css";
import "../assets/css/SideNav.css";
import "../assets/css/Box.css";
import KhachHangFinder from "../apis/KhachHangFinder";
import TaiKhoanFinder from "../apis/TaiKhoanFinder";
import { storage } from "../firebase";
import DoiMatKhau from "./account/DoiMatKhau";
const Header = () => {
  let hi = useHistory();

  const signedIn = window.localStorage.getItem("kh");
  const account = window.localStorage.getItem("kh_name");
  const cusdisplay = window.localStorage.getItem("kh_displayname");
  const [cusavt, setCusAvt] = useState(window.localStorage.getItem("kh_avt"));
  const [showPro, setShowPro] = useState(false);

  const [proId, setProId] = useState("");
  const [proName, setProName] = useState("");
  const [proSdt, setProSdt] = useState("");
  const [proCmnd, setProCmnd] = useState("");
  const [proStk, setProStk] = useState("");
  const [proDiaChi, setProDiaChi] = useState("");
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const navBtn = document.getElementById("nav-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const sideNav = document.getElementById("sidenav");
    const modal = document.getElementById("modal");

    navBtn.addEventListener("click", function () {
      sideNav.classList.add("show");
      modal.classList.add("showModal");
    });

    cancelBtn.addEventListener("click", function () {
      sideNav.classList.remove("show");
      modal.classList.remove("showModal");
    });
  }, []);

  const handleUpdate = async () => {
    if (proId) {
      if (!proName) {
        setMsg("Họ và tên không được để trống");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      } else if (!proSdt) {
        setMsg("Số điện thoại không được để trống");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        //
      } else if (proSdt.length < 10 || proSdt.length > 11) {
        setMsg(
          "Số điện thoại không hợp lệ. (gồm 10 số với di động, 11 số với máy bàn)."
        );
        setTimeout(() => {
          setMsg("");
        }, 5000);
      } else if (!proCmnd) {
        setMsg("Chứng minh nhân dân không được để trống");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        //
      } else if (proCmnd.length !== 12) {
        setMsg("Chứng minh nhân dân không hợp lệ. (gồm 12 số). ");
        setTimeout(() => {
          setMsg("");
        }, 3500);
      } else if (!proDiaChi) {
        setMsg("Địa chỉ không được để trống");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        //
      } else if (proStk.length < 9 || proStk.length > 15) {
        setMsg("Số tài khoản không hợp lệ.");
        setTimeout(() => {
          setMsg("");
        }, 5000);
      } else {
        try {
          const res = await KhachHangFinder.put("/sua-short", {
            id: proId,
            ten: proName,
            cmnd: proCmnd,
            diachi: proDiaChi,
            sdt: proSdt,
            stk: proStk,
          });

          if (res.data.status === "ok") {
            alert("Sửa thành công");
            setShowPro(false);
          } else {
            setMsg(res.data.status);
            setTimeout(() => {
              setMsg("");
            }, 3000);
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  };
  return (
    <div>
      <header className="header" id="header">
        <div className="head-top">
          <div className="site-name">
            <span>KHÁCH SẠN MINH LONG</span>
          </div>
          <div
            className="site-nav"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {signedIn === "yes" ? (
              <center>
                <div id="box-profile" className={showPro ? "box box2" : "box"}>
                  <img
                    src={cusavt}
                    alt={cusdisplay}
                    onClick={async () => {
                      setShowPro(true);

                      try {
                        const res_kh = await KhachHangFinder.get(
                          `/get-account/${account}`
                        );
                        setProId(res_kh.data.data.khachhang.id);
                        setProName(res_kh.data.data.khachhang.ten);
                        setProDiaChi(res_kh.data.data.khachhang.diachi);
                        setProSdt(res_kh.data.data.khachhang.sdt);
                        setProStk(res_kh.data.data.khachhang.stk);
                        setProCmnd(res_kh.data.data.khachhang.cmnd);
                      } catch (er) {
                        console.log(er.message);
                      }
                    }}
                  />
                  <input
                    type="file"
                    name=""
                    id="file"
                    accept="image/*"
                    onChange={(e) => {
                      const uploadTask = storage
                        .ref(`quangba/${e.target.files[0].name}`)
                        .put(e.target.files[0]);
                      uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                          const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                              100
                          );
                          setProgress(progress);
                          console.log(progress);
                        },
                        (error) => {
                          console.log(error);
                        },
                        () => {
                          storage
                            .ref("quangba")
                            .child(e.target.files[0].name)
                            .getDownloadURL()
                            .then(async (url) => {
                              setCusAvt(url);
                              try {
                                const res = await TaiKhoanFinder.put(
                                  "/update-avt",
                                  {
                                    ten: account,
                                    avt: url,
                                    filename: e.target.files[0].name,
                                  }
                                );
                                if (res.data.status === "ok") {
                                  window.localStorage.setItem("kh_avt", url);
                                }
                              } catch (err) {
                                console.log(err.message);
                              }
                            });
                        }
                      );
                    }}
                  />
                  {progress > 0 && progress < 100 ? (
                    <>
                      <progress value={progress} max="100" /> <br />
                    </>
                  ) : (
                    ""
                  )}

                  <label htmlFor="file">Upload</label>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={proName}
                    onChange={(e) => setProName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    value={proSdt}
                    onChange={(e) => setProSdt(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Chứng minh nhân dân"
                    value={proCmnd}
                    onChange={(e) => setProCmnd(e.target.value)}
                  />
                  <textarea
                    placeholder="Địa chỉ"
                    rows="3"
                    value={proDiaChi}
                    onChange={(e) => setProDiaChi(e.target.value)}
                  ></textarea>
                  <input
                    type="text"
                    placeholder="Số tài khoản"
                    value={proStk}
                    onChange={(e) => setProStk(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />
                  <p
                    style={{
                      marginBottom: "10px",
                      color: "#dc3545",
                      fontSize: "0.85rem",
                      textAlign: "left",
                      width: "240px",
                    }}
                  >
                    {msg}
                  </p>
                  <div
                    className="action-box"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    <button type="button" onClick={() => setShowPro(false)}>
                      Đóng
                    </button>
                    <button type="button" onClick={(e) => handleUpdate(e)}>
                      Sửa
                    </button>

                    <DoiMatKhau />
                  </div>
                </div>
              </center>
            ) : (
              ""
            )}
            <span id="nav-btn">
              MENU <i className="fas fa-bars"></i>
            </span>
          </div>
        </div>

        <div className="head-bottom flex">
          <h2>ĐẾN VỚI CHÚNG TÔI VỚI TRẢI NGHIỆM TUYỆT VỜI</h2>
          <button type="button" className="head-btn ">
            <a href="#services" className="a-start">
              BẮT ĐẦU NÀO
            </a>
          </button>
        </div>
      </header>

      <div className="sidenav" id="sidenav">
        <span className="cancel-btn" id="cancel-btn">
          <i className="fas fa-times"></i>
        </span>

        <ul className="navbar">
          <li>
            <a href="#header">Trang chủ</a>
          </li>
          <li>
            <a href="#services">Dịch vụ</a>
          </li>
          <li>
            <a href="#book">Đặt phòng</a>
          </li>
          <li>
            <a href="#rooms">Phòng</a>
          </li>
        </ul>

        {signedIn === "no" || !signedIn ? (
          <button
            className="btn sign-up"
            onClick={() => {
              hi.push("/dang-ki");
            }}
          >
            Đăng kí
          </button>
        ) : (
          ""
        )}

        {signedIn === "yes" ? (
          <button
            className="btn log-in"
            onClick={() => {
              window.localStorage.setItem("kh", "no");

              window.location.href = "/dang-nhap";
              alert("Đã đăng xuất");
            }}
          >
            Đăng xuất
          </button>
        ) : (
          <button
            className="btn log-in"
            onClick={() => {
              hi.push("/dang-nhap");
            }}
          >
            Đăng nhập
          </button>
        )}
      </div>

      <div id="modal"></div>
    </div>
  );
};

export default Header;
