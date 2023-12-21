import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import axios from "axios";
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
  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return `${year}-${month}-${day}`;
  };
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
      selector: (row) => row.message,
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
  return (
    <>
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
