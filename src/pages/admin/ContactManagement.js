import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
export default function ContactManagement() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listContacts, setListContacts] = useState([]);

  const fetchListContacts = async () => {
    await axios
      .get("/api/v1/contact", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListContacts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchListContacts();
  }, []);
  const headers = [
    {
      name: "Tên người gửi",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Lời nhắn",
      selector: (row) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{row.message}</div>
      ),
      sortable: true,
    },
    {
      name: "SĐT",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.address,
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
  const handleDelete = async (row) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.delete("/api/v1/contact/" + row.id, config);
      if (data) {
        toast.success("Xóa thành công", {
          autoClose: 700,
        });
        fetchListContacts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div>
        <h1>Danh sách thông tin liên hệ</h1>
      </div>
      {listContacts ? (
        <DataTable
          columns={headers}
          data={listContacts}
          defaultSortField="title"
          style={{
            width: "100%",
            maxHeight: "100%",
            overflowX: "hidden",
            overflowY: "auto",
          }}
          pagination
        />
      ) : (
        <div>
          <h2>Chưa có bài viết nào</h2>
        </div>
      )}
    </>
  );
}
