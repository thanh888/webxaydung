import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";
import ModalCreateCategory from "../../components/admin/category/ModalCreateCategory";
import ModalEditCategory from "../../components/admin/category/ModalEditCategory";
import ModalDeleteCategory from "../../components/admin/category/ModalDeleteCategory";
export default function CategoryNews() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listCategories, setListCategories] = useState();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [category, setCategory] = useState("");
  const fetchListCategories = async () => {
    await axios
      .get("/api/v1/category", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setListCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchListCategories();
  }, []);

  const headers = [
    {
      name: "Code danh mục",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Tên danh muc",
      selector: (row) => row.name,
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
    setCategory(data);
    setModalEdit(!modalEdit);
  };
  const handleDelete = (data) => {
    setCategory(data);
    setModalDelete(!modalDelete);
  };

  return (
    <div>
      <ModalCreateCategory
        showModal={modalCreate}
        setShowModal={setModalCreate}
        fetchData={fetchListCategories}
        accessToken={user?.token}
      />
      <ModalEditCategory
        showModal={modalEdit}
        setShowModal={setModalEdit}
        fetchData={fetchListCategories}
        accessToken={user?.token}
        category={category}
      />
      <ModalDeleteCategory
        showModal={modalDelete}
        setShowModal={setModalDelete}
        fetchData={fetchListCategories}
        accessToken={user?.token}
        category={category}
      />
      <h2>Quản lý danh mục tin tức</h2>
      <div className="top-content text-start mt-3 mb-3">
        <Button variant="primary" onClick={handClickCreate}>
          Thêm mới danh mục
        </Button>
      </div>
      <DataTable
        columns={headers}
        data={listCategories}
        defaultSortField="title"
        pagination
      />
    </div>
  );
}
