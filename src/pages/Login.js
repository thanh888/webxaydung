import React, { useEffect, useState } from "react";
import { loginUser } from "../redux/apiRequest";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
export default function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, []);

  const submitLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isAdmin", isAdmin);
    const data = {
      account: account,
      password: password,
      role_id: "",
    };
    loginUser(data, dispatch, navigate);
  };

  return (
    <div className="admin">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Đăng nhập</h5>
                <form onSubmit={submitLogin}>
                  <div className="mb-3">
                    <label for="account" className="form-label">
                      Tài khoản
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="account"
                      name="account"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="password" className="form-label">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Admin"
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-block">
                      Đăng Nhập
                    </button>
                    {/* <p className="text-center">Bạn không có tài khoản?</p> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
