import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalCreateCategory({
  showModal,
  setShowModal,
  fetchData,
  accessToken,
}) {
  const handleClose = () => setShowModal(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleCreateCategory = async () => {
    if (!code || !name) {
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
      const { data } = await axios.post(
        "/api/v1/category",
        {
          code,
          name,
        },
        config
      );
      if (data) {
        handleClose();
        setName("");
        setCode("");
        toast.success("Thêm thành công", {
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
          <Modal.Title>Thêm danh mục tin tức</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Code danh mục</Form.Label>
              <Form.Control
                type="text"
                value={code}
                placeholder="DU-AN"
                autoFocus
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh muc</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dự án"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCreateCategory}>
            Thêm mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateCategory;
