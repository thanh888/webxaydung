import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserService() {
  const [services, setServices] = useState([]);

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
    getServices();
  }, []);
  return (
    <>
      <main id="main">
        <div
          class="breadcrumbs d-flex align-items-center"
          style={{ backgroundImage: "url('assets/img/breadcrumbs-bg.jpg')" }}
        >
          <div
            class="container position-relative d-flex flex-column align-items-center"
            data-aos="fade"
          >
            <h2>Dịch vụ</h2>
          </div>
        </div>

        <section id="services" class="services section-bg">
          <div class="container" data-aos="fade-up">
            <div class="row gy-4">
              {services &&
                services.map((service) => {
                  return (
                    <div
                      class="col-lg-4 col-md-6"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <div class="service-item  position-relative">
                        <div class="mb-2">
                          <img
                            className=""
                            width={64}
                            height={64}
                            style={{ objectFit: "cover" }}
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
