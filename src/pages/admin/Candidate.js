import axios from "axios";
import { createRef, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

export default function Candidate() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listCandidates, setListCandidates] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [candidate, setCandidate] = useState("");
  const [cvData, setCvData] = useState({});
  const [listJobOpening, setListJobOpening] = useState([]);
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
  const getListJobOpening = async () => {
    await axios
      .get("/api/v1/job_opening", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListJobOpening(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filterByJobs = async (e) => {
    console.log(e.target.value);
    if (e.target.value == 0) {
      getListCandidates();
      return;
    }
    await axios
      .get("/api/v1/candidate/byJobOpening/" + e.target.value, {
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
    getListJobOpening();
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
      selector: (row) => (
        <Button className="btn btn-success" onClick={() => downloadCVFile(row)}>
          Tải xuống
        </Button>
      ),
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
  const handleEdit = (data) => {
    setCandidate(data);
    setModalEdit(!modalEdit);
  };
  const handleDelete = (data) => {
    setCandidate(data);
    setModalDelete(!modalDelete);
  };

  function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    return blob;
  }
  const downloadCVFile = (row) => {
    const base64String = row.cv_file;
    const blob = base64ToBlob(base64String, "application/pdf");
    const url = URL.createObjectURL(blob);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a download link and trigger it
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${row.name}.pdf`); // Set desired filename
        link.click();

        // Revoke the object URL after download completes
        link.addEventListener("load", () => {
          URL.revokeObjectURL(url);
        });
      })
      .catch((error) => {
        console.error("Error fetching blob:", error);
        // Handle errors, e.g., display an error message
      });
  };

  return (
    <div>
      <h2>Quản lý ứng viên</h2>
      <div className="col-4 mt-2">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => filterByJobs(e)}
        >
          <option value={0}>Lọc theo bài tuyển dụng</option>
          {listJobOpening &&
            listJobOpening.map((job) => {
              return <option value={job.id}>{job.title}</option>;
            })}
        </Form.Select>
      </div>
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
