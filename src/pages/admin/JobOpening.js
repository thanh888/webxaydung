import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";
import ModalCreateJobOpening from "../../components/admin/job-opening/ModalCreateJobOpening";
import ModalEditJobOpening from "../../components/admin/job-opening/ModalEditJobOpening";
import ModalDeleteJobOpening from "../../components/admin/job-opening/ModalDeleteJobOpening";
export default function JobOpening() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listJob, setListJob] = useState();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [job, setJob] = useState("");
  const fetchListJob = async () => {
    await axios
      .get("/api/v1/job_opening", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListJob(response.data);
        console.log(listJob);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchListJob();
    console.log(user.token);
  }, []);

  const headers = [
    {
      name: "Tiêu đề",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Số lượng tuyển dụng",
      selector: (row) => row.hiring_needs,
      sortable: true,
    },
    {
      name: "Yêu cầu tuyển dụng",
      selector: (row) => row.requirement,
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
    setJob(data);
    setModalEdit(!modalEdit);
  };
  const handleDelete = (data) => {
    setJob(data);
    setModalDelete(!modalDelete);
  };

  return (
    <div>
      <ModalCreateJobOpening
        showModal={modalCreate}
        setShowModal={setModalCreate}
        fetchData={fetchListJob}
        accessToken={user?.token}
      />
      <ModalEditJobOpening
        showModal={modalEdit}
        setShowModal={setModalEdit}
        fetchData={fetchListJob}
        accessToken={user?.token}
        job={job}
      />
      <ModalDeleteJobOpening
        showModal={modalDelete}
        setShowModal={setModalDelete}
        fetchData={fetchListJob}
        accessToken={user?.token}
        job={job}
      />
      <h2>Quản lý bài đăng tuyển dụng</h2>
      <div className="top-content text-start mt-3 mb-3">
        <Button variant="primary" onClick={handClickCreate}>
          Thêm mới bài đăng
        </Button>
      </div>
      <DataTable
        columns={headers}
        data={listJob}
        defaultSortField="title"
        pagination
      />
    </div>
  );
}
