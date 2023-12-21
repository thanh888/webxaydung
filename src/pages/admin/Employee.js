import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreateEmployee from "../../components/admin/employee/ModalCreateEmployee";
import ModalEditEmployee from "../../components/admin/employee/ModalEditEmployee";
import ModalDeleteEmployee from "../../components/admin/employee/ModalDeleteEmployee";

export default function Employee() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listEmployees, setListEmloyees] = useState();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [employee, setEmployee] = useState("");
  const fetchListEmloyees = async () => {
    await axios
      .get("/api/v1/employee", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListEmloyees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchListEmloyees();
  }, []);

  const headers = [
    {
      name: "Tên nhân viên",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "SĐT",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Chức vụ",
      selector: (row) => row.position,
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
    setModalCreate(true);
  };
  const handleEdit = (data) => {
    setEmployee(data);
    setModalEdit(!modalEdit);
  };
  const handleDelete = (data) => {
    setEmployee(data);
    setModalDelete(!modalDelete);
  };

  return (
    <div>
      <ModalCreateEmployee
        showModal={modalCreate}
        setShowModal={setModalCreate}
        fetchData={fetchListEmloyees}
        accessToken={user?.token}
      />
      <ModalEditEmployee
        showModal={modalEdit}
        setShowModal={setModalEdit}
        fetchData={fetchListEmloyees}
        accessToken={user?.token}
        employee={employee}
      />
      <ModalDeleteEmployee
        showModal={modalDelete}
        setShowModal={setModalDelete}
        fetchData={fetchListEmloyees}
        accessToken={user?.token}
        employee={employee}
      />
      <h2>Quản lý nhân viên</h2>
      <div className="top-content text-start mt-3 mb-3">
        <Button variant="primary" onClick={handClickCreate}>
          Thêm mới nhân viên
        </Button>
      </div>
      <DataTable
        columns={headers}
        data={listEmployees}
        defaultSortField="title"
        pagination
      />
    </div>
  );
}
