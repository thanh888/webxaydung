import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogDetail() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [news, setNews] = useState();
  const [recentNews, setRecentNews] = useState();
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const getInforNew = async () => {
    try {
      const { data } = await axios.get(`/api/v1/new/${id}`);
      if (data) {
        const dateArray = data.date_published;
        const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        setNews({ ...data, date_published: formattedDate });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRecentNews = async () => {
    try {
      const { data } = await axios.get("/api/v1/new/recent");
      if (data) {
        setRecentNews(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getInforNew();
    getRecentNews();
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    let locale = "vi_VN";
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1069091167572595", // You App ID
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.1",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/${locale}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, [id]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) {
      toast.warning("Vui lòng nhập nội dung tìm kiếm", { autoClose: 700 });
      return;
    }
    navigate(`/search/${search}`);
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
          <h2>Chi Tiết Tin Tức</h2>
        </div>
      </div>

      <section id="blog" class="blog">
        <div class="container" data-aos="fade-up" data-aos-delay="100">
          <div class="row g-5">
            <div class="col-lg-8">
              <article class="blog-details">
                <div class="post-img">
                  <img
                    src={`http://localhost:8080/api/v1/new/images/${news?.thumbnail}`}
                    alt=""
                    class="img-fluid"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </div>

                <h2 class="title">{news?.title}</h2>

                <div class="meta-top">
                  <ul>
                    <li class="d-flex align-items-center">
                      <i class="bi bi-person"></i>{" "}
                      <a href="blog-details.html">Bởi Admin</a>
                    </li>
                  </ul>
                </div>

                <div class="content">{news && parse(news.content)}</div>
              </article>
              <div
                class="fb-comments"
                data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                data-width="720"
                data-numposts="5"
              ></div>
            </div>

            <div class="col-lg-4">
              <div class="sidebar">
                <div class="sidebar-item search-form">
                  <h3 class="sidebar-title">Tìm kiếm</h3>
                  <form onSubmit={handleSearch} class="mt-3">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit">
                      <i class="bi bi-search"></i>
                    </button>
                  </form>
                </div>
                <div class="sidebar-item recent-posts">
                  <h3 class="sidebar-title">Bài viết gần đây</h3>
                  {recentNews &&
                    recentNews.map((recentNew) => {
                      return (
                        <div class="mt-3">
                          <div class="post-item mt-3">
                            <img
                              src={`http://localhost:8080/api/v1/new/images/${recentNew?.thumbnail}`}
                              alt=""
                              style={{
                                width: "80px",
                                height: "65px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <h4>
                                <a href="blog-details.html">
                                  {recentNew.title}
                                </a>
                              </h4>
                              <time datetime="2020-01-01">
                                {recentNew.date_published}
                              </time>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
