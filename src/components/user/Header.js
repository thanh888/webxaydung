import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const navigateTo = (link) => {
    navigate(`/${link}`);
  };
  return (
    <header id="header" className="header d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <h1>
            UpConstruction<span>.</span>
          </h1>
        </Link>

        <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">Giới thiệu</NavLink>
            </li>
            <li>
              <NavLink to="/services">Dịch vụ</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Dự án</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Liên hệ</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
