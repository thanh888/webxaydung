import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalDeleteCategory({
  showModal,
  setShowModal,
  fetchData,
  accessToken,
  category,
}) {
  const handleClose = () => setShowModal(false);
  const [categoryInfo, setCategoryInfo] = useState();
  useEffect(() => {
    if (category) {
      setCategoryInfo({
        id: category.id,
        code: category.code,
        name: category.name,
      });
    }
  }, [category]);
  const handleDeleteCategory = async () => {
    if (!categoryInfo.name || !categoryInfo.code) {
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
        "/api/v1/category/" + categoryInfo.id,
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
  return (
    <>
      <ToastContainer closeOnClick />
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Code danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={categoryInfo?.code}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyên văn a"
                autoFocus
                value={categoryInfo?.name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeleteCategory}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteCategory;
