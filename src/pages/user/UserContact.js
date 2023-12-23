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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.766131872127!2d106.82389451478681!3d10.957173063433709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e6b8e5eb39f%3A0x7a3d7e7b5f8a7494!2s31-15%20C%C3%A1ch%20M%E1%BA%A1ng%20Th%C3%A1ng%208%2C%20Quy%E1%BA%BFt%20Th%E1%BA%AFng%2C%20Th%C3%A0nh%20ph%E1%BB%91%20Bi%C3%AAn%20H%C3%B2a%2C%20%C4%90%E1%BB%93ng%20Nai%2C%20Vietnam!5e0!3m2!1sen!2s!4v1660316307025!5m2!1sen!2s"
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
