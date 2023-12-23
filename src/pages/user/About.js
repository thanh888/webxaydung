export default function About() {
  return (
    <>
      <main id="main">
        <div
          className="breadcrumbs d-flex align-items-center"
          style={{ backgroundImage: "url('assets/img/breadcrumbs-bg.jpg')" }}
        >
          <div
            className="container position-relative d-flex flex-column align-items-center"
            data-aos="fade"
          >
            <h2>Giới thiệu</h2>
          </div>
        </div>

        <section id="about" className="about ">
          <div className="container" data-aos="fade-up">
            <div className="our-story row " style={{ paddingRight: "40px" }}>
              <h3>Tổng Quan Công Ty</h3>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Tên đầy đủ</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Công Ty Cổ Phần Xây Dựng Hoàn Minh Phát
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Tên viết tắt</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    HMP Construction
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mã số thuế</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">0305371707</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Trụ sở chính</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Đường Cách Mạng Tháng 8, Biên Hòa, Vietnam
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Điện thoại</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">094 388 11 69</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Website </h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    www.hmpconstruction.com
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    vohoanhson@gmail.com
                  </div>
                </div>
                <hr />
              </div>
              <div className="col-md-12 mt-4">
                <div className="title">
                  <h6>TẦM NHÌN</h6>
                </div>
                <div className="content">
                  <p>
                    Phát triển công ty HMP thành công ty xây dựng uy tín, chất
                    lượng.
                  </p>
                </div>
              </div>
              <div className="col-md-12 mt-4">
                <div className="title">
                  <h6>SỨ MỆNH</h6>
                </div>
                <div className="content">
                  <p>
                    HMP Construction cam kết đem đến cho khách hàng những sản
                    phẩm hoàn thành đúng tiến độ, đảm bảo chất lượng cả về kỹ
                    thuật, mỹ thuật và độ an toàn cao.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
