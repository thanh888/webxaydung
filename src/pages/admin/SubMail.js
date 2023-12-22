import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";
export default function SubMail() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listSubMail, setListSubMail] = useState();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [category, setCategory] = useState("");
  const fetchListSubMail = async () => {
    await axios
      .get("/api/v1/sub_email", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListSubMail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchListSubMail();
  }, []);

  const headers = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    // {
    //   name: "Chỉnh sửa",
    //   cell: (row) => (
    //     <Button className="btn" onClick={() => handleEdit(row)}>
    //       Chỉnh sửa
    //     </Button>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
    // {
    //   name: "Xóa",
    //   cell: (row) => (
    //     <Button className="btn btn-danger" onClick={() => handleDelete(row)}>
    //       Xóa
    //     </Button>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
  ];
  const handleEdit = (data) => {
    setCategory(data);
    setModalEdit(!modalEdit);
  };
  const handleDelete = (data) => {
    setCategory(data);
    setModalDelete(!modalDelete);
  };

  return (
    <div>
      <h2 className="mt-2">Quản lý danh sách email đăng ký</h2>
      <div className="top-content text-start mt-3 mb-3"></div>
      <DataTable
        columns={headers}
        data={listSubMail}
        defaultSortField="title"
        pagination
      />
    </div>
  );
}
