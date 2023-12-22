import { current } from "@reduxjs/toolkit";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function ServiceDetail() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [news, setNews] = useState();
  const { id } = useParams();
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getInforNew();
  }, [id]);

  return (
    <main id="main">
      <div
        class="breadcrumbs d-flex align-items-center"
        style={{ backgroundImage: "url('/assets/img/breadcrumbs-bg.jpg')" }}
      >
        <div
          class="container position-relative d-flex flex-column align-items-center"
          data-aos="fade"
        >
          <h2>Chi Tiết Dịch Vụ</h2>
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

                <h2 class="title">
                  Dolorum optio tempore voluptas dignissimos cumque fuga qui
                  quibusdam quia
                </h2>

                <div class="meta-top">
                  <ul>
                    <li class="d-flex align-items-center">
                      <i class="bi bi-person"></i>{" "}
                      <a href="blog-details.html">Bởi Admin</a>
                    </li>
                    <li class="d-flex align-items-center">
                      <i class="bi bi-clock"></i>{" "}
                      <a href="blog-details.html">
                        <time datetime="2020-01-01">
                          {news?.date_published}
                        </time>
                      </a>
                    </li>
                    <li class="d-flex align-items-center">
                      <i class="bi bi-chat-dots"></i>{" "}
                      <a href="blog-details.html">12 Comments</a>
                    </li>
                  </ul>
                </div>

                <div class="content">{news && parse(news.content)}</div>
              </article>

              <div class="post-author d-flex align-items-center">
                <img
                  src="/assets/img/blog/blog-author.jpg"
                  class="rounded-circle flex-shrink-0"
                  alt=""
                />
                <div>
                  <h4>Jane Smith</h4>
                  <div class="social-links">
                    <a href="https://twitters.com/#">
                      <i class="bi bi-twitter"></i>
                    </a>
                    <a href="https://facebook.com/#">
                      <i class="bi bi-facebook"></i>
                    </a>
                    <a href="https://instagram.com/#">
                      <i class="biu bi-instagram"></i>
                    </a>
                  </div>
                  <p>
                    Itaque quidem optio quia voluptatibus dolorem dolor. Modi
                    eum sed possimus accusantium. Quas repellat voluptatem
                    officia numquam sint aspernatur voluptas. Esse et
                    accusantium ut unde voluptas.
                  </p>
                </div>
              </div>

              <div class="comments">
                <h4 class="comments-count">8 Comments</h4>

                <div id="comment-1" class="comment">
                  <div class="d-flex">
                    <div class="comment-img">
                      <img src="/assets/img/blog/comments-1.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Georgia Reader</a>{" "}
                        <a href="#" class="reply">
                          <i class="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time datetime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Et rerum totam nisi. Molestiae vel quam dolorum vel
                        voluptatem et et. Est ad aut sapiente quis molestiae est
                        qui cum soluta. Vero aut rerum vel. Rerum quos
                        laboriosam placeat ex qui. Sint qui facilis et.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="comment-2" class="comment">
                  <div class="d-flex">
                    <div class="comment-img">
                      <img src="/assets/img/blog/comments-2.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Aron Alvarado</a>{" "}
                        <a href="#" class="reply">
                          <i class="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time datetime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Ipsam tempora sequi voluptatem quis sapiente non. Autem
                        itaque eveniet saepe. Officiis illo ut beatae.
                      </p>
                    </div>
                  </div>

                  <div id="comment-reply-1" class="comment comment-reply">
                    <div class="d-flex">
                      <div class="comment-img">
                        <img src="/assets/img/blog/comments-3.jpg" alt="" />
                      </div>
                      <div>
                        <h5>
                          <a href="">Lynda Small</a>{" "}
                          <a href="#" class="reply">
                            <i class="bi bi-reply-fill"></i> Reply
                          </a>
                        </h5>
                        <time datetime="2020-01-01">01 Jan,2022</time>
                        <p>
                          Enim ipsa eum fugiat fuga repellat. Commodi quo quo
                          dicta. Est ullam aspernatur ut vitae quia mollitia id
                          non. Qui ad quas nostrum rerum sed necessitatibus aut
                          est. Eum officiis sed repellat maxime vero nisi natus.
                          Amet nesciunt nesciunt qui illum omnis est et dolor
                          recusandae. Recusandae sit ad aut impedit et. Ipsa
                          labore dolor impedit et natus in porro aut. Magnam qui
                          cum. Illo similique occaecati nihil modi eligendi.
                          Pariatur distinctio labore omnis incidunt et illum.
                          Expedita et dignissimos distinctio laborum minima
                          fugiat. Libero corporis qui. Nam illo odio beatae enim
                          ducimus. Harum reiciendis error dolorum non autem
                          quisquam vero rerum neque.
                        </p>
                      </div>
                    </div>

                    <div id="comment-reply-2" class="comment comment-reply">
                      <div class="d-flex">
                        <div class="comment-img">
                          <img src="/assets/img/blog/comments-4.jpg" alt="" />
                        </div>
                        <div>
                          <h5>
                            <a href="">Sianna Ramsay</a>{" "}
                            <a href="#" class="reply">
                              <i class="bi bi-reply-fill"></i> Reply
                            </a>
                          </h5>
                          <time datetime="2020-01-01">01 Jan,2022</time>
                          <p>
                            Et dignissimos impedit nulla et quo distinctio ex
                            nemo. Omnis quia dolores cupiditate et. Ut unde qui
                            eligendi sapiente omnis ullam. Placeat porro est
                            commodi est officiis voluptas repellat quisquam
                            possimus. Perferendis id consectetur necessitatibus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="comment-3" class="comment">
                  <div class="d-flex">
                    <div class="comment-img">
                      <img src="/assets/img/blog/comments-5.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Nolan Davidson</a>{" "}
                        <a href="#" class="reply">
                          <i class="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time datetime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Distinctio nesciunt rerum reprehenderit sed. Iste omnis
                        eius repellendus quia nihil ut accusantium tempore.
                        Nesciunt expedita id dolor exercitationem aspernatur aut
                        quam ut. Voluptatem est accusamus iste at. Non aut et et
                        esse qui sit modi neque. Exercitationem et eos
                        aspernatur. Ea est consequuntur officia beatae ea aut
                        eos soluta. Non qui dolorum voluptatibus et optio
                        veniam. Quam officia sit nostrum dolorem.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="comment-4" class="comment">
                  <div class="d-flex">
                    <div class="comment-img">
                      <img src="/assets/img/blog/comments-6.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Kay Duggan</a>{" "}
                        <a href="#" class="reply">
                          <i class="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time datetime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Dolorem atque aut. Omnis doloremque blanditiis quia eum
                        porro quis ut velit tempore. Cumque sed quia ut maxime.
                        Est ad aut cum. Ut exercitationem non in fugiat.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="reply-form">
                  <h4>Leave a Reply</h4>
                  <p>
                    Your email address will not be published. Required fields
                    are marked *{" "}
                  </p>
                  <form action="">
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <input
                          name="name"
                          type="text"
                          class="form-control"
                          placeholder="Your Name*"
                        />
                      </div>
                      <div class="col-md-6 form-group">
                        <input
                          name="email"
                          type="text"
                          class="form-control"
                          placeholder="Your Email*"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col form-group">
                        <input
                          name="website"
                          type="text"
                          class="form-control"
                          placeholder="Your Website"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col form-group">
                        <textarea
                          name="comment"
                          class="form-control"
                          placeholder="Your Comment*"
                        ></textarea>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="sidebar">
                <div class="sidebar-item search-form">
                  <h3 class="sidebar-title">Tìm kiếm</h3>
                  <form action="" class="mt-3">
                    <input type="text" />
                    <button type="submit">
                      <i class="bi bi-search"></i>
                    </button>
                  </form>
                </div>
                <div class="sidebar-item recent-posts">
                  <h3 class="sidebar-title">Bài viết gần đây</h3>

                  <div class="mt-3">
                    <div class="post-item mt-3">
                      <img src="/assets/img/blog/blog-recent-1.jpg" alt="" />
                      <div>
                        <h4>
                          <a href="blog-details.html">
                            Nihil blanditiis at in nihil autem
                          </a>
                        </h4>
                        <time datetime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>

                    <div class="post-item">
                      <img src="/assets/img/blog/blog-recent-2.jpg" alt="" />
                      <div>
                        <h4>
                          <a href="blog-details.html">
                            Quidem autem et impedit
                          </a>
                        </h4>
                        <time datetime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>

                    <div class="post-item">
                      <img src="/assets/img/blog/blog-recent-3.jpg" alt="" />
                      <div>
                        <h4>
                          <a href="blog-details.html">
                            Id quia et et ut maxime similique occaecati ut
                          </a>
                        </h4>
                        <time datetime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>

                    <div class="post-item">
                      <img src="/assets/img/blog/blog-recent-4.jpg" alt="" />
                      <div>
                        <h4>
                          <a href="blog-details.html">
                            Laborum corporis quo dara net para
                          </a>
                        </h4>
                        <time datetime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>

                    <div class="post-item">
                      <img src="/assets/img/blog/blog-recent-5.jpg" alt="" />
                      <div>
                        <h4>
                          <a href="blog-details.html">
                            Et dolores corrupti quae illo quod dolor
                          </a>
                        </h4>
                        <time datetime="2020-01-01">Jan 1, 2020</time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
