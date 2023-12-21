import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalEditEmployee({
  showModal,
  setShowModal,
  fetchData,
  accessToken,
  employee,
}) {
  const handleClose = () => setShowModal(false);
  const [email, setEmail] = useState(employee.email);
  const [name, setName] = useState(employee.name);
  const [phone, setPhone] = useState(employee.phone);
  const [position, setPosition] = useState(employee.position);
  const [employeeInfo, setEmployeeInfo] = useState();
  useEffect(() => {
    if (employee) {
      setEmployeeInfo({
        id: employee.id,
        email: employee.email,
        name: employee.name,
        phone: employee.phone,
        position: employee.position,
      });
    }
  }, [employee]);
  const handleUpdateUser = async () => {
    if (
      !employeeInfo.name ||
      !employeeInfo.email ||
      !employeeInfo.phone ||
      !employeeInfo.position
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
      const { data } = await axios.put(
        "/api/v1/employee/" + employeeInfo.id,
        {
          name: employeeInfo.name,
          position: employeeInfo.position,
          email: employeeInfo.email,
          phone: employeeInfo.phone,
        },
        config
      );
      if (data) {
        handleClose();
        toast.success("cập nhật thành công", {
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
          <Modal.Title>Chỉnh sửa nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên nhân viên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyên văn a"
                autoFocus
                value={employeeInfo?.name}
                onChange={(e) =>
                  setEmployeeInfo((current) => ({
                    ...current,
                    name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={employeeInfo?.email}
                onChange={(e) =>
                  setEmployeeInfo((current) => ({
                    ...current,
                    email: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="number"
                placeholder="0123456789"
                value={employeeInfo?.phone}
                onChange={(e) =>
                  setEmployeeInfo((current) => ({
                    ...current,
                    phone: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Chức vụ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Chức vụ"
                value={employeeInfo?.position}
                onChange={(e) =>
                  setEmployeeInfo((current) => ({
                    ...current,
                    position: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateUser}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditEmployee;
