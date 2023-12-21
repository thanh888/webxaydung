import { Outlet } from "react-router";
import Footer from "../components/user/Footer";
import Header from "../components/user/Header";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <Outlet />

      <Footer />
    </div>
  );
}
