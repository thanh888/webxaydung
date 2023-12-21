import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function CretateNews() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [listCategories, setListCategories] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const fetchListCategories = async () => {
    await axios
      .get("/api/v1/category", {
        headers: {
          Authorization: `Bearer ${user.token}`,
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

  const selectThumbnail = async (pics) => {
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "smartphone-upload");
      data.append("cloud_name", "dom7utmi5");
      data.append("folder", "image");
      await fetch("https://api.cloudinary.com/v1_1/dom7utmi5/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setThumbnail(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };
  const handleSaveNews = async () => {
    // console.log(content);
    if (!title || !content || !shortDescription || !thumbnail || !categoryId) {
      toast.warning("Thông tin không được bỏ trống", {
        autoClose: 700,
      });
      return;
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Thêm số 0 phía trước nếu tháng nhỏ hơn 10
    const day = ("0" + currentDate.getDate()).slice(-2); // Thêm số 0 phía trước nếu ngày nhỏ hơn 10

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/v1/new",
        {
          content: content,
          date_published: currentDate,
          short_description: shortDescription,
          thumbnail: thumbnail,
          title: title,
          category_id: categoryId,
        },
        config
      );
      if (data) {
        toast.success("Thêm thành công", {
          autoClose: 700,
        });
        navigate("/admin/news");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer closeOnClick />

      <div className="container">
        <h1>Thêm mới tin tức</h1>
        <div className="row">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề bài đăng</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Bài viết 1"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả ngắn</Form.Label>
              <Form.Control
                type="text"
                value={shortDescription}
                as="textarea"
                rows={3}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh bài đăng</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => selectThumbnail(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thư mục bài đăng</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
              >
                <option selected>Lựa chọn thư mục</option>
                {listCategories &&
                  listCategories.map((item, index) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <Button
          className="mt-3 p-2 col-5"
          variant="primary"
          onClick={handleSaveNews}
        >
          Thêm mới
        </Button>
      </div>
    </>
  );
}
