import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalDeleteAccount({
  showModal,
  setShowModal,
  fetchData,
  accessToken,
  userData,
}) {
  const handleClose = () => setShowModal(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [account, setAccount] = useState("");
  const [listEmployees, setListEmployees] = useState("");
  const [employee, setEmployee] = useState(0);
  const getListEmployees = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get("/api/v1/employee", config)
      .then((response) => {
        if (response.data) {
          setListEmployees(response.data);
        }
      })
      .catch(console.error());
  };
  useEffect(() => {
    getListEmployees();
  }, []);
  useEffect(() => {
    if (userData) {
      setAccount(userData.account);
    }
  }, [userData]);
  const handledeleteAccount = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.delete(
        "/api/v1/user/" + userData.id,
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
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control type="text" autoFocus value={account} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handledeleteAccount}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteAccount;
