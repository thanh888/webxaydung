import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalEditCategory({
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
  const handleUpdateCategory = async () => {
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
      const { data } = await axios.put(
        "/api/v1/category/" + categoryInfo.id,
        {
          name: categoryInfo.name,
          code: categoryInfo.code,
        },
        config
      );
      if (data) {
        handleClose();
        toast.success("Cập nhật thành công", {
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
          <Modal.Title>Chỉnh sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Code danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={categoryInfo?.code}
                onChange={(e) =>
                  setCategoryInfo((current) => ({
                    ...current,
                    code: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyên văn a"
                autoFocus
                value={categoryInfo?.name}
                onChange={(e) =>
                  setCategoryInfo((current) => ({
                    ...current,
                    name: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateCategory}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditCategory;
