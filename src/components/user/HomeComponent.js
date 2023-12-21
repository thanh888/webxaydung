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
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
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
          },
          config
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
      .get("/api/v1/new", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListNews(response.data.news);
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
                  Chào mừng đến với <span>UpConstruction</span>
                </h2>
                <p data-aos="fade-up">
                  Điều quan trọng là phải chăm sóc bệnh nhân, có bác sĩ theo
                  dõi, nhưng đó là lúc đau đớn và khổ sở vô cùng. Để đi đến chi
                  tiết nhỏ nhất, không ai nên thực hiện bất kỳ loại công việc
                  nào trừ khi anh ta thu được lợi ích nào đó từ nó.
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
                  <h3>Chúng tôi không từ chối khả năng tại đây.</h3>
                  <p>
                    Chúng tôi lại ở đây. Chúng tôi từ chối sự lựa chọn tốt nhất
                    để giải quyết nỗi đau. Chúng tôi tự nhiên ở đây. Chúng tôi
                    cung cấp cho bạn sự thoải mái và sự thoải mái. Chúng tôi yêu
                    cầu bạn chấp nhận sự thật.
                  </p>
                  <p>
                    Chúng tôi từ chối sự lựa chọn tốt nhất. Chúng tôi sáng tạo
                    và thường xuyên. Chúng tôi chấp nhận sự lựa chọn tốt nhất và
                    chúng tôi từ chối sự lựa chọn tốt nhất. Chúng tôi từ chối sự
                    lựa chọn tốt nhất và chúng tôi yêu cầu bạn chấp nhận sự
                    thật.
                  </p>
                </div>
              </div>

              <div className="col-lg-5" data-aos="fade">
                <form className="php-email-form" onSubmit={handleSend}>
                  <h3>Nhận báo giá</h3>
                  <p>
                    Chúng tôi yêu cầu bạn chấp nhận sự thật và chúng tôi yêu cầu
                    bạn chấp nhận sự thật. Chúng tôi sáng tạo và chúng tôi yêu
                    cầu bạn chấp nhận sự thật. Chúng tôi từ chối sự lựa chọn tốt
                    nhất và chúng tôi yêu cầu bạn chấp nhận sự thật.
                  </p>
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

                      <button type="submit">Nhận báo giá</button>
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
              <h2>Công trình xây dựng</h2>
              <p>
                Họ không biết phải làm gì ngoài việc tìm ra cách Hơn nữa, không
                có gì vì lý do đó
              </p>
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
              <h2>Services</h2>
              <p>
                Voluptatem quibusdam ut ullam perferendis repellat non ut
                consequuntur est eveniet deleniti fignissimos eos quam
              </p>
            </div>

            <div className="row gy-4">
              {services.map((service) => {
                return (
                  <div
                    className="col-lg-4 col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className="service-item  position-relative">
                      <div className="mb-2">
                        <img className="" width={64} src={service.thumbnail} />
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.short_description}</p>
                      <Link
                        to={`/blog-detail/${service.id}`}
                        className="readmore stretched-link"
                      >
                        Learn more <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="alt-services" className="alt-services">
          <div className="container" data-aos="fade-up">
            <div className="row justify-content-around gy-4">
              <div
                className="col-lg-6 img-bg"
                style={{
                  backgroundImage: "url('assets/img/alt-services.jpg')",
                }}
                data-aos="zoom-in"
                data-aos-delay="100"
              ></div>

              <div className="col-lg-5 d-flex flex-column justify-content-center">
                <h3>Enim quis est voluptatibus aliquid consequatur fugiat</h3>
                <p>
                  Esse voluptas cumque vel exercitationem. Reiciendis est hic
                  accusamus. Non ipsam et sed minima temporibus laudantium.
                  Soluta voluptate sed facere corporis dolores excepturi
                </p>

                <div
                  className="icon-box d-flex position-relative"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="bi bi-easel flex-shrink-0"></i>
                  <div>
                    <h4>
                      <a href="" className="stretched-link">
                        Lorem Ipsum
                      </a>
                    </h4>
                    <p>
                      Voluptatum deleniti atque corrupti quos dolores et quas
                      molestias excepturi sint occaecati cupiditate non
                      provident
                    </p>
                  </div>
                </div>

                <div
                  className="icon-box d-flex position-relative"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bi bi-patch-check flex-shrink-0"></i>
                  <div>
                    <h4>
                      <a href="" className="stretched-link">
                        Nemo Enim
                      </a>
                    </h4>
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                    </p>
                  </div>
                </div>

                <div
                  className="icon-box d-flex position-relative"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bi bi-brightness-high flex-shrink-0"></i>
                  <div>
                    <h4>
                      <a href="" className="stretched-link">
                        Dine Pad
                      </a>
                    </h4>
                    <p>
                      Explicabo est voluptatum asperiores consequatur magnam. Et
                      veritatis odit. Sunt aut deserunt minus aut eligendi omnis
                    </p>
                  </div>
                </div>

                <div
                  className="icon-box d-flex position-relative"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i className="bi bi-brightness-high flex-shrink-0"></i>
                  <div>
                    <h4>
                      <a href="" className="stretched-link">
                        Tride clov
                      </a>
                    </h4>
                    <p>
                      Est voluptatem labore deleniti quis a delectus et. Saepe
                      dolorem libero sit non aspernatur odit amet. Et eligendi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features section-bg">
          <div className="container" data-aos="fade-up">
            <ul className="nav nav-tabs row  g-2 d-flex">
              <li className="nav-item col-3">
                <a
                  className="nav-link active show"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-1"
                >
                  <h4>Modisit</h4>
                </a>
              </li>

              <li className="nav-item col-3">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-2"
                >
                  <h4>Praesenti</h4>
                </a>
              </li>

              <li className="nav-item col-3">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-3"
                >
                  <h4>Explica</h4>
                </a>
              </li>

              <li className="nav-item col-3">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-4"
                >
                  <h4>Nostrum</h4>
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane active show" id="tab-1">
                <div className="row">
                  <div
                    className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <h3>Voluptatem dignissimos provident</h3>
                    <p className="fst-italic">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <ul>
                      <li>
                        <i className="bi bi-check2-all"></i> Ullamco laboris
                        nisi ut aliquip ex ea commodo consequat.
                      </li>
                      <li>
                        <i className="bi bi-check2-all"></i> Duis aute irure
                        dolor in reprehenderit in voluptate velit.
                      </li>
                      <li>
                        <i className="bi bi-check2-all"></i> Ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate trideta
                        storacalaperda mastiro dolore eu fugiat nulla pariatur.
                      </li>
                    </ul>
                  </div>
                  <div
                    className="col-lg-6 order-1 order-lg-2 text-center"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <img
                      src="assets/img/features-1.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>

              <div className="tab-pane" id="tab-2">
                <div className="row">
                  <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                    <h3>Neque exercitationem debitis</h3>
                    <p className="fst-italic">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <ul>
                      <li>
                        <i className="bi bi-check2-all"></i> Ullamco laboris
                        nisi ut aliquip ex ea commodo consequat.
                      </li>
                      <li>
                        <i className="bi bi-check2-all"></i> Duis aute irure
                        dolor in reprehenderit in voluptate velit.
                      </li>
                      <li>
                        <i className="bi bi-check2-all"></i> Provident mollitia
                        neque rerum asperiores dolores quos qui a. Ipsum neque
                        dolor voluptate nisi sed.
                      </li>
                      <li>
                        <i className="bi bi-check2-all"></i> Ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate trideta
                        storacalaperda mastiro dolore eu fugiat nulla pariatur.
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img
                      src="assets/img/features-2.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>

              <div className="tab-pane" id="tab-3">
                <div className="row">
                  <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                    <h3>Voluptatibus commodi accusamu</h3>
                    <ul>
                      <li>
                        <i className="bi bi-check2-all"></i> Ullamco laboris
                        nisi ut aliquip ex ea commodo consequat.
                      </li>
                      <li>
                        <i className="bi bi-check2-all"></i> Duis aute irure
                        dolor in reprehenderit in voluptate velit.
                      </li>
                      <li>
                        <i className="bi bi-check2-all"></i> Provident mollitia
                        neque rerum asperiores dolores quos qui a. Ipsum neque
                        dolor voluptate nisi sed.
                      </li>
                    </ul>
                    <p className="fst-italic">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img
                      src="assets/img/features-3.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>

              <div className="tab-pane" id="tab-4">
                <div className="row">
                  <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                    <h3>Omnis fugiat ea explicabo sunt</h3>
                    <p className="fst-italic">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <ul>
                      <li>
                        <i className="bi bi-check2-all"></i> Ullamco laboris
                        nisi ut aliquip ex ea commodo consequat.
                      </li>
                      <li>
                        <i className="bi bi-check2-all"></i> Duis aute irure
                        dolor in reprehenderit in voluptate velit.
                      </li>
                      <li>
                        <i className="bi bi-check2-all"></i> Ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate trideta
                        storacalaperda mastiro dolore eu fugiat nulla pariatur.
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img
                      src="assets/img/features-4.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Our Projects</h2>
              <p>
                Consequatur libero assumenda est voluptatem est quidem illum et
                officia imilique qui vel architecto accusamus fugit aut qui
                distinctio
              </p>
            </div>

            <div
              className="portfolio-isotope"
              data-portfolio-filter="*"
              data-portfolio-layout="masonry"
              data-portfolio-sort="original-order"
            >
              <ul
                className="portfolio-flters"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <li data-filter="*" className="filter-active">
                  All
                </li>
                <li data-filter=".filter-remodeling">Remodeling</li>
                <li data-filter=".filter-construction">Construction</li>
                <li data-filter=".filter-repairs">Repairs</li>
                <li data-filter=".filter-design">Design</li>
              </ul>

              <div
                className="row gy-4 portfolio-container"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="col-lg-4 col-md-6 portfolio-item filter-remodeling">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/remodeling-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Remodeling 1</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/remodeling-1.jpg"
                        title="Remodeling 1"
                        data-gallery="portfolio-gallery-remodeling"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-construction">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/construction-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Construction 1</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/construction-1.jpg"
                        title="Construction 1"
                        data-gallery="portfolio-gallery-construction"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-repairs">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/repairs-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Repairs 1</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/repairs-1.jpg"
                        title="Repairs 1"
                        data-gallery="portfolio-gallery-repairs"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-design">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/design-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Design 1</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/design-1.jpg"
                        title="Repairs 1"
                        data-gallery="portfolio-gallery-book"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-remodeling">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/remodeling-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Remodeling 2</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/remodeling-2.jpg"
                        title="Remodeling 2"
                        data-gallery="portfolio-gallery-remodeling"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-construction">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/construction-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Construction 2</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/construction-2.jpg"
                        title="Construction 2"
                        data-gallery="portfolio-gallery-construction"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-repairs">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/repairs-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Repairs 2</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/repairs-2.jpg"
                        title="Repairs 2"
                        data-gallery="portfolio-gallery-repairs"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-design">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/design-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Design 2</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/design-2.jpg"
                        title="Repairs 2"
                        data-gallery="portfolio-gallery-book"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-remodeling">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/remodeling-3.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Remodeling 3</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/remodeling-3.jpg"
                        title="Remodeling 3"
                        data-gallery="portfolio-gallery-remodeling"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-construction">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/construction-3.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Construction 3</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/construction-3.jpg"
                        title="Construction 3"
                        data-gallery="portfolio-gallery-construction"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-repairs">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/repairs-3.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Repairs 3</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/repairs-3.jpg"
                        title="Repairs 2"
                        data-gallery="portfolio-gallery-repairs"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-design">
                  <div className="portfolio-content h-100">
                    <img
                      src="assets/img/projects/design-3.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="portfolio-info">
                      <h4>Design 3</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur</p>
                      <a
                        href="assets/img/projects/design-3.jpg"
                        title="Repairs 3"
                        data-gallery="portfolio-gallery-book"
                        className="glightbox preview-link"
                      >
                        <i className="bi bi-zoom-in"></i>
                      </a>
                      <a
                        href="project-details.html"
                        title="More Details"
                        className="details-link"
                      >
                        <i className="bi bi-link-45deg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Testimonials</h2>
              <p>
                Quam sed id excepturi ccusantium dolorem ut quis dolores nisi
                llum nostrum enim velit qui ut et autem uia reprehenderit sunt
                deleniti
              </p>
            </div>

            <div className="slides-2 swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="assets/img/testimonials/testimonials-1.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Saul Goodman</h3>
                      <h4>Ceo &amp; Founder</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        Proin iaculis purus consequat sem cure digni ssim donec
                        porttitora entum suscipit rhoncus. Accusantium quam,
                        ultricies eget id, aliquam eget nibh et. Maecen aliquam,
                        risus at semper.
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="assets/img/testimonials/testimonials-2.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Sara Wilsson</h3>
                      <h4>Designer</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        Export tempor illum tamen malis malis eram quae irure
                        esse labore quem cillum quid cillum eram malis quorum
                        velit fore eram velit sunt aliqua noster fugiat irure
                        amet legam anim culpa.
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="assets/img/testimonials/testimonials-3.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Jena Karlis</h3>
                      <h4>Store Owner</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        Enim nisi quem export duis labore cillum quae magna enim
                        sint quorum nulla quem veniam duis minim tempor labore
                        quem eram duis noster aute amet eram fore quis sint
                        minim.
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="assets/img/testimonials/testimonials-4.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Matt Brandon</h3>
                      <h4>Freelancer</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        Fugiat enim eram quae cillum dolore dolor amet nulla
                        culpa multos export minim fugiat minim velit minim dolor
                        enim duis veniam ipsum anim magna sunt elit fore quem
                        dolore labore illum veniam.
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="assets/img/testimonials/testimonials-5.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>John Larson</h3>
                      <h4>Entrepreneur</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        Quis quorum aliqua sint quem legam fore sunt eram irure
                        aliqua veniam tempor noster veniam enim culpa labore
                        duis sunt culpa nulla illum cillum fugiat legam esse
                        veniam culpa fore nisi cillum quid.
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>

        <section id="recent-blog-posts" className="recent-blog-posts">
          <div className="container" data-aos="fade-up">
            <div className=" section-header">
              <h2>Recent Blog Posts</h2>
              <p>
                In commodi voluptatem excepturi quaerat nihil error autem
                voluptate ut et officia consequuntu
              </p>
            </div>

            <div className="row gy-5">
              <div
                className="col-xl-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="post-item position-relative h-100">
                  <div className="post-img position-relative overflow-hidden">
                    <img
                      src="assets/img/blog/blog-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <span className="post-date">December 12</span>
                  </div>

                  <div className="post-content d-flex flex-column">
                    <h3 className="post-title">
                      Eum ad dolor et. Autem aut fugiat debitis
                    </h3>

                    <div className="meta d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person"></i>{" "}
                        <span className="ps-2">Julia Parker</span>
                      </div>
                      <span className="px-3 text-black-50">/</span>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-folder2"></i>{" "}
                        <span className="ps-2">Politics</span>
                      </div>
                    </div>

                    <hr />

                    <a
                      href="blog-details.html"
                      className="readmore stretched-link"
                    >
                      <span>Read More</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="post-item position-relative h-100">
                  <div className="post-img position-relative overflow-hidden">
                    <img
                      src="assets/img/blog/blog-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <span className="post-date">July 17</span>
                  </div>

                  <div className="post-content d-flex flex-column">
                    <h3 className="post-title">
                      Et repellendus molestiae qui est sed omnis
                    </h3>

                    <div className="meta d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person"></i>{" "}
                        <span className="ps-2">Mario Douglas</span>
                      </div>
                      <span className="px-3 text-black-50">/</span>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-folder2"></i>{" "}
                        <span className="ps-2">Sports</span>
                      </div>
                    </div>

                    <hr />

                    <a
                      href="blog-details.html"
                      className="readmore stretched-link"
                    >
                      <span>Read More</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-6">
                <div
                  className="post-item position-relative h-100"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="post-img position-relative overflow-hidden">
                    <img
                      src="assets/img/blog/blog-3.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <span className="post-date">September 05</span>
                  </div>

                  <div className="post-content d-flex flex-column">
                    <h3 className="post-title">
                      Quia assumenda est et veritati tirana ploder
                    </h3>

                    <div className="meta d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person"></i>{" "}
                        <span className="ps-2">Lisa Hunter</span>
                      </div>
                      <span className="px-3 text-black-50">/</span>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-folder2"></i>{" "}
                        <span className="ps-2">Economics</span>
                      </div>
                    </div>

                    <hr />

                    <a
                      href="blog-details.html"
                      className="readmore stretched-link"
                    >
                      <span>Read More</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
