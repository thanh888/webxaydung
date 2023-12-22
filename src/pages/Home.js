import { Outlet } from "react-router";
import Footer from "../components/user/Footer";
import Header from "../components/user/Header";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <Outlet />
      <div
        className="sticky-icon"
        style={{
          position: "fixed",
          right: "0",
          bottom: "0",
          zIndex: "100",
          margin: "20px",
        }}
      >
        <div className="zalo m-1">
          <a href="https://www.facebook.com/ngocsang120920" target="_blank">
            <img src="/assets/img/icon-messager.png" width={50} height={50} />
          </a>
        </div>
        <div className="messager m-1">
          <a href="https://www.facebook.com/ngocsang120920" target="_blank">
            <img src="/assets/img/zalo-icon.png" width={50} height={50} />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
