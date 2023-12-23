import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Button, ListGroup, Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Employee from "./admin/Employee.js";
import News from "./admin/News.js";
import Contact from "./admin/ContactManagement.js";
import Candidate from "./admin/Candidate.js";
import CategoryNews from "./admin/CategoryNews.js";
import SubMail from "./admin/SubMail.js";
import { logoutUser } from "../redux/apiRequest.js";
export default function Admin() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    if (!user) {
      navigate("/login");
    }
  }, []);
  const handleLogout = () => {
    logoutUser(dispatch, navigate);
  };
  return (
    <div className="admin">
      <div className="">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <img src="/assets/img/logo.jpg" height={40} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ">
                {isAdmin === true ? (
                  <>
                    <Nav.Link as={Link} to="/admin/" className="text-dark">
                      Nhân viên
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/candidate"
                      className="text-dark"
                    >
                      Ứng viên
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/job-opening"
                      className="text-dark"
                    >
                      Bài Tuyển dụng
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/contact"
                      className="text-dark"
                    >
                      Liên hệ
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/sub-email"
                      className="text-dark"
                    >
                      Sub-email
                    </Nav.Link>
                  </>
                ) : (
                  ""
                )}
                <Nav.Link
                  as={Link}
                  to="/admin/category-news"
                  className="text-dark"
                >
                  Danh mục tin tức
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/news" className="text-dark">
                  Tin tức
                </Nav.Link>
              </Nav>
              <div>
                <Button className="btn" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="body">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
