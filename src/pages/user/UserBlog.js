import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UserBlog() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listNews, setListNews] = useState([]);
  const navigate = useNavigate();
  const getAllNews = async () => {
    await axios
      .get("/api/v1/new", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        const updatedNewsList = response.data.news.map((newItem) => {
          const dateArray = newItem.date_published;
          const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          });

          return {
            ...newItem,
            date_published: formattedDate,
          };
        });

        setListNews(updatedNewsList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllNews();
  }, []);
  const handleClickNews = (id) => {
    navigate(`/blog-detail/${id}`);
  };
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
            <h2>Blog</h2>
            <ol>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>Blog</li>
            </ol>
          </div>
        </div>

        <section id="blog" class="blog">
          <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="row gy-4 posts-list">
              {listNews &&
                listNews.map((newItem) => {
                  return (
                    <div
                      class="col-xl-4 col-md-6"
                      onClick={() => handleClickNews(newItem.id)}
                    >
                      <div class="post-item position-relative h-100">
                        <div class="post-img position-relative overflow-hidden">
                          <img
                            src={`http://localhost:8080/api/v1/new/images/${newItem.thumbnail}`}
                            class="img-fluid"
                            alt=""
                            width="356px"
                            height="267px"
                            style={{
                              width: "356px",
                              height: "267px",
                              objectFit: "cover",
                            }}
                          />
                          <span class="post-date">
                            {newItem.date_published}
                          </span>
                        </div>

                        <div class="post-content d-flex flex-column">
                          <h3 class="post-title">{newItem.title}</h3>

                          <div class="meta d-flex align-items-center">
                            {/* <div class="d-flex align-items-center">
                              <i class="bi bi-person"></i>{" "}
                              <span class="ps-2">John Doe</span>
                            </div>
                            <span class="px-3 text-black-50">/</span> */}
                            <div class="d-flex align-items-center">
                              <i class="bi bi-folder2"></i>{" "}
                              <span class="ps-2">Politics</span>
                            </div>
                          </div>

                          <p>{newItem.short_description}</p>

                          <hr />

                          <a class="readmore stretched-link">
                            <span>Read More</span>
                            <i class="bi bi-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div class="blog-pagination">
              <ul class="justify-content-center">
                <li>
                  <a href="#">1</a>
                </li>
                <li class="active">
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
