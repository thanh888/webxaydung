import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
export default function UserCategory() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listNews, setListNews] = useState();
  const [filter, setFilter] = useState({
    page: 0,
    limit: 6,
  });
  const navigate = useNavigate();
  const { id, name } = useParams();
  const getAllNews = async () => {
    await axios
      .get(
        `/api/v1/new?category_id=${id}&page=${filter.page}&limit=${filter.limit}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => {
        setListNews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const location = useLocation();
  const { categoryName } = location.state;
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllNews();
  }, [id, filter]);
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
            <h2>{`Danh mục ${categoryName}`}</h2>
          </div>
        </div>

        <section id="blog" class="blog">
          <div class="container" data-aos="fade-up" data-aos-delay="100">
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
        </section>
      </main>
    </>
  );
}
