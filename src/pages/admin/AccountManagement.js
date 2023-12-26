import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import ModalCreateAccount from "../../components/admin/account/ModalCreateAccount";
import ModalEditAccount from "../../components/admin/account/ModalEditAccount";
import ModalDeleteAccount from "../../components/admin/account/ModalDeleteAccount";
export default function AccountManagement() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [userData, setUserData] = useState("");

  const getListUsers = async () => {
    await axios
      .get("/api/v1/user?role_id=2", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getListUsers();
  }, []);

  const headers = [
    {
      name: "Tên tài khoản",
      selector: (row) => row.account,
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
    setModalCreate(!modalCreate);
  };
  const handleEdit = (data) => {
    setUserData(data);
    setModalEdit(!modalEdit);
  };
  const handleDelete = (data) => {
    setUserData(data);
    setModalDelete(!modalDelete);
  };

  return (
    <div>
      <ModalCreateAccount
        showModal={modalCreate}
        setShowModal={setModalCreate}
        fetchData={getListUsers}
        accessToken={user?.token}
      />
      <ModalEditAccount
        showModal={modalEdit}
        setShowModal={setModalEdit}
        fetchData={getListUsers}
        accessToken={user?.token}
        userData={userData}
      />
      <ModalDeleteAccount
        showModal={modalDelete}
        setShowModal={setModalDelete}
        fetchData={getListUsers}
        accessToken={user?.token}
        userData={userData}
      />
      <h2>Quản lý tài khoản nhân viên</h2>
      <div className="top-content text-start mt-3 mb-3 d-flex justify-content-between">
        <div className="col-4">
          <Button variant="primary" onClick={handClickCreate}>
            Thêm mới tài khoản
          </Button>
        </div>
      </div>
      {listUsers ? (
        <DataTable
          columns={headers}
          data={listUsers}
          defaultSortField="title"
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
