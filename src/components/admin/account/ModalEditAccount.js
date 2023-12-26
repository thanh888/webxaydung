import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalEditAccount({
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
  const handleUpdateeAccount = async () => {
    if (!account) {
      toast.warning("Thông tin không được bỏ trống", {
        autoClose: 700,
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Xác thực mật khẩu không chính xác", {
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
        "/api/v1/user/details/" + userData.id,
        {
          account,
          password,
          retype_password: confirmPassword,
          employees_id: employee,
        },
        config
      );
      if (data) {
        handleClose();
        setPassword("");
        setAccount("");
        // setEmployee(0);
        setConfirmPassword("");
        toast.success("Chỉnh sửa thành công", {
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
          <Modal.Title>Chỉnh sửa thông tin tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                type="text"
                value={account}
                autoFocus
                onChange={(e) => setAccount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                maxLength={24}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                maxLength={24}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Thông tin nhân viên</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setEmployee(e.target.value);
                }}
              >
                <option selected>Lựa chọn thông tin nhân viên</option>
                {listEmployees &&
                  listEmployees.map((item, index) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
              </Form.Select>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateeAccount}>
            Lưu chỉnh sửa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditAccount;
