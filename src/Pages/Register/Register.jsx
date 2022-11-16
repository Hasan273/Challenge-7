import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import "./Register.scss";

const Register = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
    if (getToken) {
      navigate("/");
    }
  }, [token, setToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (name === "") {
      alert("Name is required");
      return;
    }
    if (email !== "" && password !== "" && name !== "") {
      const data = {
        name,
        email,
        password,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/register`,
          data
        );
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <>
        <div className="Register d-flex justify-content-center text-center align-items-center flex-column">
          <div className="container mx-auto">
            <h1 className="text-black fs-1">Register</h1>
            <Input
              size="large"
              placeholder="Username"
              className="rounded-pill my-3"
              suffix={<UserOutlined />}
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="large"
              placeholder="Email Adress"
              maxLength={30}
              className="rounded-pill my-3"
              suffix={<MailOutlined />}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input.Password
              placeholder="Password"
              size="large"
              className="my-3"
              maxLength={30}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <div>
                <Button onClick={handleSubmit}>Register</Button>
              </div>
              <p>or connect with</p>
              <div>
                <GoogleLogin setToken={setToken} label="Sign Up With Google" />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Register;
