import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UserBlog() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listNews, setListNews] = useState();
  const [categories, setCategories] = useState("");
  const [filter, setFilter] = useState({
    page: 0,
    limit: 6,
  });
  const navigate = useNavigate();
  const getListCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category");
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllNews = async () => {
    await axios
      .get(`/api/v1/new?page=${filter.page}&limit=${filter.limit}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListNews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllNews();
    getListCategory();
  }, [filter]);
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
          </div>
        </div>

        <section id="blog" class="blog container">
          <div className="row">
            <div
              class="col-lg-9 container"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="row gy-4 posts-list">
                {listNews &&
                  listNews.news.map((newItem) => {
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
                              {new Date(
                                newItem.date_published
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <div class="post-content d-flex flex-column">
                            <h3 class="post-title">{newItem.title}</h3>

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
                  {listNews &&
                    Array.from(Array(listNews.totalPages).keys()).map(
                      (page, index) => {
                        return (
                          <li>
                            <button
                              className={`btn ${
                                filter.page === index && "bg-warning text-white"
                              }`}
                              onClick={() =>
                                setFilter((current) => ({
                                  ...current,
                                  page: index,
                                }))
                              }
                            >
                              {index + 1}
                            </button>
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="sidebar">
                <div class="sidebar-item categories">
                  <h3 class="sidebar-title">Danh mục</h3>
                  <ul class="mt-3">
                    {categories &&
                      categories.map((category) => {
                        return (
                          <li>
                            <Link
                              to={`/category/${category.id}`}
                              state={{
                                categoryName: category.name,
                              }}
                            >
                              {category.name}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
