import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserJobOpening() {
  const [jobs, setJobs] = useState([]);
  const getJobs = async () => {
    await axios
      .get("/api/v1/job_opening")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getJobs();
  }, []);
  return (
    <main id="main">
      <div
        class="breadcrumbs d-flex align-items-center"
        style={{ backgroundImage: "url('assets/img/breadcrumbs-bg.jpg')" }}
      >
        <div
          class="container position-relative d-flex flex-column align-items-center"
          data-aos="fade"
        >
          <h2>Tuyển dụng</h2>
        </div>
      </div>

      <section id="testimonials" class="testimonials section-bg">
        <div class="container">
          <div class=" swiper row ">
            {jobs &&
              jobs.map((job) => {
                const endDay = new Date(job.end_day);
                const formattedEndDay = `${endDay.getDate()}-${
                  endDay.getMonth() + 1
                }-${endDay.getFullYear()}`;

                // In your JSX
                <h4>Ngày kết thúc: {formattedEndDay}</h4>;
                return (
                  <div class=" col-4">
                    <div class="testimonial-wrap p-0">
                      <div class="testimonial-item">
                        <h3 className="mb-3">{job.title}</h3>
                        <h4> Ngày kết thúc: {formattedEndDay}</h4>
                        <div class="stars">
                          <h6 className="mb-5">
                            Số lượng tuyển dụng: {job.hiring_needs}
                          </h6>
                        </div>
                        <Link
                          to={`/job-opening-detail/${job.id}`}
                          className="readmore stretched-link"
                        >
                          Tìm hiểu thêm <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
