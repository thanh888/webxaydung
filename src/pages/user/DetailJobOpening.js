import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function DetailJobOpening() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [job, setJob] = useState();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cv_file, setCV_file] = useState("");
  const getInforJob = async () => {
    try {
      const { data } = await axios.get(`/api/v1/job_opening/${id}`);
      if (data) {
        const startDay = new Date(data.start_day);
        const formattedStartDay = `${startDay.getDate()}-${
          startDay.getMonth() + 1
        }-${startDay.getFullYear()}`;

        const endDay = new Date(data.end_day);
        const formattedEndDay = `${endDay.getDate()}-${
          endDay.getMonth() + 1
        }-${endDay.getFullYear()}`;

        setJob({
          ...data,
          start_day: formattedStartDay,
          end_day: formattedEndDay,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getInforJob();
  }, [id]);

  const handleSelectFileCV = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log("helle", e.target.files[0]);
    try {
      const response = await axios.post("/api/v1/candidate/upload", formData);
      setCV_file(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSendCV = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      toast.warning("Các thông tin không được bỏ trống", { autoClose: 700 });
      return;
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .post(
        "/api/v1/candidate",
        {
          address: address,
          email: email,
          name: name,
          phone: phone,
          sub_date: formattedDate,
          job_opening_id: id,
          cv_file: cv_file,
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          setAddress("");
          setEmail("");
          setName("");
          setPhone("");
          setCV_file("");
          toast.success("Gửi thành công", {
            autoClose: 700,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main id="main">
      <ToastContainer />
      <div
        class="breadcrumbs d-flex align-items-center"
        style={{ backgroundImage: "url('/assets/img/breadcrumbs-bg.jpg')" }}
      >
        <div
          class="container position-relative d-flex flex-column align-items-center"
          data-aos="fade"
        >
          <h2>Chi Tiết Tuyển Dụng</h2>
        </div>
      </div>

      <section id="get-started" class="get-started section-bg">
        <div class="container">
          <div class="row justify-content-between gy-4">
            <div class="col-lg-5 d-flex flex-column justify-content-center">
              <h3>{job?.title}</h3>
              <p>{job?.description}</p>

              <div
                class="icon-box d-flex position-relative"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <i class="bi bi-easel flex-shrink-0"></i>
                <h5>Số lượng tuyển dụng: {job?.hiring_needs}</h5>
              </div>

              <div
                class="icon-box d-flex position-relative"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <i class="bi bi-patch-check flex-shrink-0"></i>
                <h5>Ngày bắt đầu: {job?.start_day}</h5>
              </div>

              <div
                class="icon-box d-flex position-relative"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <i class="bi bi-brightness-high flex-shrink-0"></i>
                <h5>Ngày kết thúc: {job?.end_day}</h5>
              </div>

              <div
                class="icon-box d-flex position-relative"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <i class="bi bi-brightness-high flex-shrink-0"></i>
                <div>
                  <h5>Yêu cầu</h5>
                  <p>{job?.requirement}</p>
                </div>
              </div>
            </div>

            <div class="col-lg-5" data-aos="fade">
              <form onSubmit={handleSendCV} class="php-email-form">
                <h3>Nộp CV tại đây</h3>
                <div class="row gy-3">
                  <div class="col-md-12">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      placeholder="Họ và Tên "
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div class="col-md-12 ">
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

                  <div class="col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      placeholder="SĐT"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div class="col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      placeholder="Địa chỉ"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div class="col-md-12">
                    <input
                      type="file"
                      class="form-control"
                      required
                      onChange={handleSelectFileCV}
                    />
                  </div>
                  <div class="col-md-12 text-center">
                    <button type="submit">Gửi</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
