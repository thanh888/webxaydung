import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalDeleteJobOpening({
  showModal,
  setShowModal,
  fetchData,
  accessToken,
  job,
}) {
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (job) {
      console.log(job);
      setTitle(job.title);
    }
  }, [job]);
  const handleClose = () => setShowModal(false);
  const handleDeleteJob = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.delete(
        "/api/v1/job_opening/" + job.id,
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
          <Modal.Title>Xác nhận xóa bài đăng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control type="text" value={title} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeleteJob}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteJobOpening;
