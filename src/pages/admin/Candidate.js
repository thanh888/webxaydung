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
  const [cvData, setCvData] = useState({});
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
  const formatFileCV = async (data) => {
    try {
      const response = await axios.get(`/api/v1/candidate/${data.id}/cv`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      console.log(response.data);
      setCvData((prevState) => ({ ...prevState, [data.id]: response.data })); // Đặt dữ liệu trong trạng thái
    } catch (error) {
      console.log(error);
    }
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
      name: "File CV",
      selector: (row) => cvData[row],
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
      <h2>Quản lý danh mục tin tức</h2>
      <div className="top-content text-start mt-3 mb-3"></div>
      <div className="row">
        <div className="col-6">
          <DataTable
            columns={headers}
            data={listCandidates}
            defaultSortField="title"
            pagination
          />
        </div>
      </div>
    </div>
  );
}
