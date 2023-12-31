import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Employee from "./pages/admin/Employee";
import News from "./pages/admin/News";
import CategoryNews from "./pages/admin/CategoryNews";
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
import JobOpening from "./pages/admin/JobOpening";
import ServiceDetail from "./pages/user/ServiceDetail";
import Candidate from "./pages/admin/Candidate";
import UserJobOpening from "./pages/user/UserJobOpening";
import DetailJobOpening from "./pages/user/DetailJobOpening";
import Search from "./pages/user/Search";
import UserCategory from "./pages/user/UserCategory";
import AccountManagement from "./pages/admin/AccountManagement";
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
              <Route path="job-opening" element={<UserJobOpening />} />
              <Route
                path="job-opening-detail/:id"
                element={<DetailJobOpening />}
              />
              <Route path="about" element={<About />} />
              <Route path="category/:id" element={<UserCategory />} />
              <Route path="blog" element={<UserBlog />} />
              <Route path="blog-detail/:id" element={<BlogDetail />} />
              <Route path="search/:keyword" element={<Search />} />
              <Route path="service-detail/:id" element={<ServiceDetail />} />
            </Route>
            <Route path="admin" element={<Admin />}>
              <Route index element={<Employee />} />
              <Route path="user" element={<AccountManagement />} />
              <Route path="category-news" element={<CategoryNews />} />
              <Route path="news" element={<News />} />
              <Route path="create-news" element={<CretateNews />} />
              <Route path="update-news/:id" element={<UpdateNews />} />
              <Route path="contact" element={<ContactManagement />} />
              <Route path="candidate" element={<Candidate />} />
              <Route path="sub-email" element={<SubMail />} />
              <Route path="job-opening" element={<JobOpening />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
