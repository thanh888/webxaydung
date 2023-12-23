import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function HomeComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listNews, setListNews] = useState([]);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
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
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };
      const { data } = await axios
        .post(
          "/api/v1/contact",
          {
            address: address,
            email: email,
            message: message,
            name: name,
            phone: phone,
            subdate: formattedDate,
          }
          // config
        )
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
  const getAllNews = async () => {
    await axios
      .get("/api/v1/new?category_id=2", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListNews(response.data.news.slice(0, 6));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getServices = async () => {
    await axios
      .get("/api/v1/new?category_id=1")
      .then((response) => {
        setServices(response.data.news);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllNews();
    getServices();
  }, []);
  const handleClickNews = (id) => {
    navigate(`/blog-detail/${id}`);
  };
  return (
    <>
      <ToastContainer />
      <section id="hero" className="hero">
        <div className="info d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h2 data-aos="fade-down">
                  Chào mừng đến với <span>HMPConstruction</span>
                </h2>
                <p data-aos="fade-up">
                  Chào mừng đến với HMPConstruction - nơi mỗi công trình không
                  chỉ là xây dựng, mà là châm ngôn của chất lượng, tận tâm và sự
                  đam mê. Chúng tôi xây dựng không gian sống và làm việc với mọi
                  chi tiết được chăm chút, mang đến trải nghiệm đẳng cấp và độc
                  đáo.
                </p>
                <a
                  data-aos="fade-up"
                  data-aos-delay="200"
                  href="#get-started"
                  className="btn-get-started"
                >
                  Bắt đầu
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          id="hero-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div
            className="carousel-item active"
            style={{
              backgroundImage:
                "url('assets/img/hero-carousel/hero-carousel-1.jpg')",
            }}
          ></div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url('assets/img/hero-carousel/hero-carousel-2.jpg')",
            }}
          ></div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url('assets/img/hero-carousel/hero-carousel-3.jpg')",
            }}
          ></div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url('assets/img/hero-carousel/hero-carousel-4.jpg')",
            }}
          ></div>

          <a
            className="carousel-control-prev"
            href="#hero-carousel"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bi bi-chevron-left"
              aria-hidden="true"
            ></span>
          </a>

          <a
            className="carousel-control-next"
            href="#hero-carousel"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bi bi-chevron-right"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </section>

      <main id="main">
        <section id="get-started" className="get-started section-bg">
          <div className="container">
            <div className="row justify-content-between gy-4">
              <div
                className="col-lg-6 d-flex align-items-center"
                data-aos="fade-up"
              >
                <div className="content">
                  <h3>Liên hệ ngay với chúng tôi.</h3>
                  <p>
                    Chúng tôi lại ở đây để cung cấp giải pháp đúng đắn, đầy sáng
                    tạo, và không ngừng nỗ lực để mang lại thoải mái và sự hài
                    lòng cho bạn. Hãy chấm dứt nỗi đau của dự án, và để chúng
                    tôi làm nên sự khác biệt.
                  </p>
                  <p>
                    Liên hệ ngay, chúng tôi chấp nhận sự lựa chọn tốt nhất và
                    đưa ra giải pháp độc đáo, tự nhiên, đáp ứng mọi mong đợi của
                    bạn.
                  </p>
                </div>
              </div>

              <div className="col-lg-5" data-aos="fade">
                <form className="php-email-form" onSubmit={handleSend}>
                  <h3>Liên hệ ngay</h3>
                  <div className="row gy-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-12 ">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-12 ">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        placeholder="Điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows="6"
                        placeholder="Tin nhắn"
                        required
                        maxLength={200}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                      <div className="loading">Đang tải</div>
                      <div className="error-message"></div>
                      <div className="sent-message">
                        Yêu cầu báo giá của bạn đã được gửi thành công. Cảm ơn
                        bạn!
                      </div>

                      <button type="submit">Gửi liên hệ</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="constructions" className="constructions">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Dự án</h2>
              <p>Chỉ sự sáng tạo và chất lượng tạo nên mọi công trình.</p>
            </div>

            <div className="row gy-4">
              {listNews &&
                listNews.map((item, index) => (
                  <div
                    className="col-lg-6"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickNews(item.id)}
                  >
                    <div className="card-item">
                      <div className="row">
                        <div className="col-xl-5">
                          <div
                            className="card-bg"
                            style={{
                              backgroundImage: `url('http://localhost:8080/api/v1/new/images/${item.thumbnail}')`,
                            }}
                          ></div>
                        </div>
                        <div className="col-xl-7 d-flex align-items-center">
                          <div className="card-body">
                            <h4 className="card-title">{item.title}</h4>
                            <p>{item.short_description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section id="services" className="services section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Dịch vụ</h2>
            </div>

            <div className="row gy-4">
              {services.slice(0, 3).map((service) => {
                return (
                  <div
                    className="col-lg-4 col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className="service-item  position-relative">
                      <div className="mb-2">
                        <img
                          className=""
                          width={64}
                          src={`http://localhost:8080/api/v1/new/images/${service.thumbnail}`}
                        />
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.short_description}</p>
                      <Link
                        to={`/service-detail/${service.id}`}
                        className="readmore stretched-link"
                      >
                        Tìm hiểu thêm <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
