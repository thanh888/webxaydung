import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalDeleteNews({
  showModal,
  setShowModal,
  fetchData,
  accessToken,
  news,
}) {
  const handleClose = () => setShowModal(false);
  const [newsInfor, setNewsInfor] = useState();
  const [listCategories, setListCategories] = useState();

  const fetchListCategories = async () => {
    await axios
      .get("/api/v1/category", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setListCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchListCategories();
  }, []);

  useEffect(() => {
    if (news) {
      setNewsInfor({
        id: news.id,
        content: news.content,
        title: news.title,
        shortDescription: news.short_description,
        categoryId: news.category_id,
        thumbnail: news.thumbnail,
        date_published: news.date_published,
      });
    }
  }, [news]);

  const selectThumbnail = async (pics) => {
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "smartphone-upload");
      data.append("cloud_name", "dom7utmi5");
      data.append("folder", "image");
      await fetch("https://api.cloudinary.com/v1_1/dom7utmi5/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setNewsInfor((current) => ({
            ...current,
            thumbnail: data.url.toString(),
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };
  const handleDeleteNews = async () => {
    if (!newsInfor.title || !newsInfor.content || !newsInfor.shortDescription) {
      toast.warning("Thông tin không được bỏ trống", {
        autoClose: 700,
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.delete(
        "/api/v1/new/" + newsInfor.id,
        config
      );
      if (data) {
        handleClose();
        toast.success("Xóa thành công", {
          autoClose: 700,
        });
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (field) => (e) => {
    setNewsInfor((current) => ({
      ...current,
      [field]: e.target.value,
    }));
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Xóa bài đăng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề bài đăng</Form.Label>
            <Form.Control
              type="text"
              value={newsInfor?.title}
              placeholder="Bài viết 1"
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả ngắn</Form.Label>
            <Form.Control
              type="text"
              value={newsInfor?.shortDescription}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleDeleteNews}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteNews;
