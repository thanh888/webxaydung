import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
function ModalCreateJobOpening({
  showModal,
  setShowModal,
  fetchData,
  accessToken,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hiring_needs, setHiring_needs] = useState("");
  const [is_active, setIs_active] = useState(false);
  const [requirement, setRequirements] = useState("");
  const [start_day, setStart_day] = useState("");
  const [vacancies, setvVacancies] = useState("");
  const [end_day, setEnd_day] = useState("");
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setHiring_needs("");
    setIs_active(false);
    setRequirements("");
    setStart_day("");
    setvVacancies("");
    setEnd_day("");

    setShowModal(false);
  };

  const handleCreateJob = async () => {
    if (
      !description ||
      !title ||
      !hiring_needs ||
      !requirement ||
      !start_day ||
      !end_day
    ) {
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
        "/api/v1/job_opening",
        {
          description,
          title,
          hiring_needs,
          requirement,
          start_day,
          end_day,
        },
        config
      );
      if (data) {
        handleClose();
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
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm bài đăng tuyển dụng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                value={description}
                autoFocus
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Yêu cầu tuyển dụng</Form.Label>
              <Form.Control
                type="text"
                value={requirement}
                autoFocus
                onChange={(e) => setRequirements(e.target.value)}
              />
            </Form.Group>
            <div className="row">
              <Form.Group className="mb-3 col-4">
                <Form.Label>Số lượng tuyển dụng</Form.Label>
                <Form.Control
                  type="number"
                  value={hiring_needs}
                  autoFocus
                  min={1}
                  onChange={(e) => setHiring_needs(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-4">
                <Form.Label>Ngày bắt đầu</Form.Label>
                <Form.Control
                  type="date"
                  value={start_day}
                  autoFocus
                  onChange={(e) => setStart_day(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-4">
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control
                  type="date"
                  value={end_day}
                  onChange={(e) => setEnd_day(e.target.value)}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCreateJob}>
            Thêm mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateJobOpening;
