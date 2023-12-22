import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

export default function Candidate() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listCandidates, setListCandidates] = useState();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [candidate, setCandidate] = useState("");
  const getListCandidates = async () => {
    await axios
      .get("/api/v1/candidate", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListCandidates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getListCandidates();
  }, []);

  const headers = [
    {
      name: "Người nộp",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Code danh mục",
      selector: (row) => row.code,
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
    setCandidate(data);
    setModalEdit(!modalEdit);
  };
  const handleDelete = (data) => {
    setCandidate(data);
    setModalDelete(!modalDelete);
  };

  return (
    <div>
      {/* <ModalCreateCategory
        showModal={modalCreate}
        setShowModal={setModalCreate}
        fetchData={getListCandidates}
        accessToken={user?.token}
      />
      <ModalEditCategory
        showModal={modalEdit}
        setShowModal={setModalEdit}
        fetchData={getListCandidates}
        accessToken={user?.token}
        candidate={candidate}
      />
      <ModalDeleteCategory
        showModal={modalDelete}
        setShowModal={setModalDelete}
        fetchData={getListCandidates}
        accessToken={user?.token}
        candidate={candidate}
      /> */}
      <h2>Quản lý danh mục tin tức</h2>
      <div className="top-content text-start mt-3 mb-3"></div>
      <DataTable
        columns={headers}
        data={listCandidates}
        defaultSortField="title"
        pagination
      />
    </div>
  );
}
