import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import ModalCreateNews from "../../components/admin/news/ModalCreateNews";
import ModalEditNews from "../../components/admin/news/ModalEditNews";
import ModalDeleteNews from "../../components/admin/news/ModalDeleteNews";
import ImageViewer from "react-simple-image-viewer";
import { useNavigate } from "react-router";
export default function News() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listNews, setListNews] = useState([]);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [news, setNews] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const navigate = useNavigate();
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    console.log(currentImage);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const getListCategory = async () => {
    await axios
      .get("/api/v1/category", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filterByCategory = async (e) => {
    if (e.target.value === 0) {
      fetchListNews();
      return;
    }
    await axios
      .get(`/api/v1/new?category_id=${e.target.value}`, {
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
  const fetchListNews = async () => {
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
  useEffect(() => {
    fetchListNews();
    getListCategory();
  }, []);

  const headers = [
    {
      name: "Tiêu đề bài viết",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Ảnh bài viết",
      cell: (row) => (
        <img
          src={`http://localhost:8080/api/v1/new/images/${row.thumbnail}`} // Đường dẫn đến hình ảnh
          width="50px"
          height="50px"
          style={{ margin: "5px" }}
          alt="Ảnh bài viết"
          onClick={() =>
            openImageViewer(
              `http://localhost:8080/api/v1/new/images/${row.thumbnail}`
            )
          }
        />
      ),
    },
    {
      name: "Ngày đăng",
      cell: (row) => (
        <span>{new Date(row.date_published).toLocaleString()}</span>
      ),
      sortable: true,
    },
    {
      name: "Thư mục",
      selector: (row) => row.category_id,
      sortable: true,
    },
    {
      name: "Chỉnh sửa",
      cell: (row) => (
        <Button className="btn" onClick={() => handleEdit(row)}>
          Chỉnh sửa
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Xóa",
      cell: (row) => (
        <Button className="btn btn-danger" onClick={() => handleDelete(row)}>
          Xóa
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const handClickCreate = () => {
    navigate("/admin/create-news");
  };
  const handleEdit = (data) => {
    navigate(`/admin/update-news/${data.id}`);
  };
  const handleDelete = (data) => {
    setNews(data);
    setModalDelete(!modalDelete);
  };

  return (
    <div>
      <ModalCreateNews
        showModal={modalCreate}
        setShowModal={setModalCreate}
        fetchData={fetchListNews}
        accessToken={user?.token}
      />
      <ModalEditNews
        showModal={modalEdit}
        setShowModal={setModalEdit}
        fetchData={fetchListNews}
        accessToken={user?.token}
        news={news}
      />
      <ModalDeleteNews
        showModal={modalDelete}
        setShowModal={setModalDelete}
        fetchData={fetchListNews}
        accessToken={user?.token}
        news={news}
      />
      {isViewerOpen && (
        <ImageViewer
          src={[currentImage]}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
      <h2>Quản lý tin tức</h2>
      <div className="top-content text-start mt-3 mb-3 d-flex justify-content-between">
        <div className="col-4">
          <Button variant="primary" onClick={handClickCreate}>
            Thêm mới tin tức
          </Button>
        </div>
        <div className="col-4">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => filterByCategory(e)}
          >
            <option value={0}>Lọc theo danh mục</option>
            {listCategories &&
              listCategories.map((category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
          </Form.Select>
        </div>
      </div>
      {listNews ? (
        <DataTable
          columns={headers}
          data={listNews}
          defaultSortField="title"
          style={{
            width: "100%", // Chiều rộng bằng với container
            maxHeight: "100%", // Chiều cao tối đa bằng với container
            overflowX: "hidden", // Ẩn thanh cuộn ngang
            overflowY: "auto", // Hiển thị thanh cuộn dọc nếu cần
          }}
          pagination
        />
      ) : (
        <div>
          <h2>Chưa có bài viết nào</h2>
        </div>
      )}
    </div>
  );
}
