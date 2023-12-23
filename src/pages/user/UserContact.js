import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UserContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !message || !address) {
      toast.warning("Các thông tin không được bỏ trống", { autoClose: 700 });
      return;
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    try {
      const { data } = await axios
        .post("/api/v1/contact", {
          address: address,
          email: email,
          message: message,
          name: name,
          phone: phone,
          subdate: formattedDate,
        })
        .then((response) => {
          if (response.status === 200) {
            setAddress("");
            setEmail("");
            setName("");
            setPhone("");
            setMessage("");
            toast.success("Gửi thành công", {
              autoClose: 700,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <main id="main">
        <div
          class="breadcrumbs d-flex align-items-center"
          style={{ backgroundImage: "url('assets/img/breadcrumbs-bg.jpg')" }}
        >
          <div
            class="container position-relative d-flex flex-column align-items-center"
            data-aos="fade"
          >
            <h2>Liên Hệ</h2>
          </div>
        </div>

        <section id="contact" class="contact">
          <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="row gy-4">
              <div class="col-lg-6">
                <div class="info-item  d-flex flex-column justify-content-center align-items-center">
                  <i class="bi bi-map"></i>
                  <h3>Địa chỉ</h3>
                  <p>Đường Cách Mạng Tháng 8, Biên Hòa, Vietnam</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div class="info-item d-flex flex-column justify-content-center align-items-center">
                  <i class="bi bi-envelope"></i>
                  <h3>Email</h3>
                  <p>vohoanhson@gmail.com</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div class="info-item  d-flex flex-column justify-content-center align-items-center">
                  <i class="bi bi-telephone"></i>
                  <h3>Số Điện Thoại</h3>
                  <p>094 388 11 69</p>
                </div>
              </div>
            </div>

            <div class="row gy-4 mt-1">
              <div class="col-lg-6 ">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                  frameborder="0"
                  style={{ border: "0", width: "100%", height: "384px" }}
                  allowfullscreen
                ></iframe>
              </div>

              <div class="col-lg-6">
                <form onSubmit={handleSend} role="form" class="php-email-form">
                  <div class="row gy-4">
                    <div class="col-lg-6 form-group">
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        id="name"
                        placeholder="Tên của bạn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div class="col-lg-6 form-group">
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                        placeholder="Email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="address"
                      id="address"
                      placeholder="Địa chỉ"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      id="phone"
                      placeholder="Số điện thoại"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      name="message"
                      rows="5"
                      placeholder="Lời nhắn"
                      required
                      value={message}
                      maxLength={200}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div class="text-center">
                    <button type="submit">Gửi</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
