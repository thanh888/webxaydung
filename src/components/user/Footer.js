import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Footer() {
  const [email, setEmail] = useState("");
  const handleSendSubMail = async (e) => {
    e.preventDefault();

    axios
      .post("/api/v1/sub_email", {
        email: email,
      })
      .then((response) => {
        if (response.status === 200) {
          setEmail("");
          toast.success(response.data, { autoClose: 700 });
        }
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 700 });
      });
  };
  return (
    <div id="footer" class="footer">
      <div class="footer-content position-relative">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="footer-info">
                <h3>HMPConstruction</h3>
                <p>
                  Đường Cách Mạng Tháng 8 <br />
                  Biên Hòa, Vietnam
                  <br />
                  <br />
                  <strong>SĐT:</strong> 094 388 11 69
                  <br />
                  <strong>Email:</strong> vohoanhson@gmail.com
                  <br />
                </p>
                <div class="social-links d-flex mt-3">
                  <a class="d-flex align-items-center justify-content-center">
                    <i class="bi bi-twitter"></i>
                  </a>
                  <a class="d-flex align-items-center justify-content-center">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a class="d-flex align-items-center justify-content-center">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a class="d-flex align-items-center justify-content-center">
                    <i class="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-md-3 footer-links">
              <h4>Liên kết</h4>
              <ul>
                <li>
                  <NavLink to="/" activeClassName="active">
                    Trang chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about">Giới thiệu</NavLink>
                </li>
                <li>
                  <NavLink to="/services">Dịch vụ</NavLink>
                </li>
                <li>
                  <NavLink to="/job-opening">Tuyển dụng</NavLink>
                </li>
                <li>
                  <NavLink to="/blog">Blog</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Liên hệ</NavLink>
                </li>
              </ul>
            </div>

            <div class="col-lg-6 col-md-3 footer-links">
              <h4>Đăng ký nhận thông tin</h4>
              <form onSubmit={handleSendSubMail} class="php-email-form">
                <div class="row gy-3">
                  <div class="col-md-8 ">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div class="col-md-4 text-center">
                    <button
                      style={{
                        background: " var(--color-primary)",
                        border: "0",
                        padding: "10px 30px",
                        color: "#fff",
                        transition: "0.4s",
                        borderRadius: " 4px",
                      }}
                      type="submit"
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
