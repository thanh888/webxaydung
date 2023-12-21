import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Employee from "./pages/admin/Employee";
import News from "./pages/admin/News";
import CategoryNews from "./pages/admin/CategoryNews";
import Candidate from "./pages/admin/Candidate";
import SubMail from "./pages/admin/SubMail";
import HomeComponent from "./components/user/HomeComponent";
import UserContact from "./pages/user/UserContact";
import UserProject from "./pages/user/UserProject";
import UserService from "./pages/user/UserService";
import About from "./pages/user/About";
import UserBlog from "./pages/user/UserBlog";
import ContactManagement from "./pages/admin/ContactManagement";
import CretateNews from "./components/admin/news/CreateNews";
import BlogDetail from "./pages/user/BlogDetail";
import UpdateNews from "./components/admin/news/UpdateNews";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />}>
              <Route index element={<HomeComponent />} />
              <Route path="contact" element={<UserContact />} />
              <Route path="projects" element={<UserProject />} />
              <Route path="services" element={<UserService />} />
              <Route path="about" element={<About />} />
              <Route path="blog" element={<UserBlog />} />
              <Route path="blog-detail/:id" element={<BlogDetail />} />
              <Route path="service-detail" element={<UserService />} />
            </Route>
            <Route path="admin" element={<Admin />}>
              <Route index element={<Employee />} />
              <Route path="category-news" element={<CategoryNews />} />
              <Route path="news" element={<News />} />
              <Route path="create-news" element={<CretateNews />} />
              <Route path="update-news/:id" element={<UpdateNews />} />
              <Route path="contact" element={<ContactManagement />} />
              <Route path="candidate" element={<Candidate />} />
              <Route path="sub-email" element={<SubMail />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
