import React, { useEffect, useState } from "react";
import TaiKhoanFinder from "../../apis/TaiKhoanFinder";

const DoiMatKhau = () => {
  const [mkCu, setMkCu] = useState("");
  const [mkMoi, setMkMoi] = useState("");
  const [xnMKMoi, setXnMkMoi] = useState("");

  const [mk, setMk] = useState("");
  const [iv, setIv] = useState("");
  const username = window.localStorage.getItem("kh_name");
  const [msgE, setMsgE] = useState("");
  const showModal = () => {
    // Get the modal
    var modal = document.getElementById("doi-mat-khau-modal");

    // Get the button that opens the modal
    var btn = document.getElementById("btn-doi-mat-khau");

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
    showModal();
  });

  const fetchData = async () => {
    setMkCu("");
    setMkMoi("");
    setXnMkMoi("");
    // console.log(username);
    try {
      const res = await TaiKhoanFinder.get(`/mk-khach-hang/${username}`);
      //   console.log(res);
      setMk(res.data.data.nguoidung.mk);
      setIv(res.data.data.nguoidung.iv);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangePassword = async () => {
    if (mkCu === "") {
      setMsgE("Không được để trống ô mật khẩu cũ");
      setTimeout(() => {
        setMsgE("");
      }, 3500);
    } else if (mkCu.length < 8) {
      setMsgE("Mật khẩu cũ ít nhất có 8 kí tự");
      setTimeout(() => {
        setMsgE("");
      }, 3500);
    } else if (mkMoi === "") {
      setMsgE("Không được để trống ô mật khẩu mới");
      setTimeout(() => {
        setMsgE("");
      }, 3500);
    } else if (mkMoi.length < 8) {
      setMsgE("Mật khẩu mới ít nhất có 8 kí tự");
      setTimeout(() => {
        setMsgE("");
      }, 3500);
    } else if (xnMKMoi === "") {
      setMsgE("Không được để trống ô xác nhận mật khẩu mới");
      setTimeout(() => {
        setMsgE("");
      }, 4000);
    } else if (xnMKMoi !== mkMoi) {
      setMsgE("Mật khẩu mới và xác nhận mật khẩu mới phải giống nhau.");
      setTimeout(() => {
        setMsgE("");
      }, 4000);
    } else {
      try {
        const res = await TaiKhoanFinder.put("/doi-mat-khau", {
          ten: username,
          mk: mk,
          iv: iv,
          mkcu: mkCu,
          mkmoi: mkMoi,
        });
        if (res.data.status === "ok") {
          alert("Đổi mật khẩu thành công");
          document.getElementById("doi-mat-khau-modal").style.display = "none";
        } else {
          setMsgE(res.data.status);
          setTimeout(() => {
            setMsgE("");
          }, 3500);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <>
      <button type="button" id="btn-doi-mat-khau" onClick={fetchData}>
        Đổi mật khẩu{" "}
      </button>
      <div id="doi-mat-khau-modal" className="modal">
        <div className="modal-content-doi-mk">
          <div className="modal-header">
            <span className="close">&times;</span>
            <h2>Đổi mật khẩu</h2>
          </div>
          <div className="modal-body">
            <input
              type="password"
              placeholder="Mật khẩu cũ"
              value={mkCu}
              onChange={(e) => {
                setMkCu(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={mkMoi}
              onChange={(e) => {
                setMkMoi(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              value={xnMKMoi}
              onChange={(e) => {
                setXnMkMoi(e.target.value);
              }}
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
              {msgE}
            </p>
            <button type="button " onClick={handleChangePassword}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoiMatKhau;
