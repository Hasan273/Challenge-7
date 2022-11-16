import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { Button } from "react-bootstrap";
import { Input, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getAllSearch } from "../../redux/actions/searchActions";

function Header({ token, setToken, setMovies }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            setToken(null);
            navigate.push("/");
          }
        }
      }
    })();
  }, [token, navigate, setToken]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const searchMovie = async (e) => {
    e.preventDefault();
    dispatch(getAllSearch(query));
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="headernav">
      <Navbar expand="lg" fixed="top" variant="dark">
        <Container>
          <Navbar.Brand
            href="#"
            className="mb-2 text-danger"
            style={{ fontSize: "32px", fontWeight: "bold" }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            MOVIELIST
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Form onSubmit={searchMovie}>
                <Input
                  status="Search Movie"
                  placeholder="Search Movie"
                  suffix={
                    <SearchOutlined
                      onClick={(e) => {
                        e.preventDefault();
                        query && navigate(`/search-result?keywords=${query}`);
                        setQuery("");
                      }}
                    />
                  }
                  size="large"
                  value={query}
                  onChange={handleSearch}
                ></Input>
              </Form>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mb-2">
              {!token ? (
                <>
                  <Button
                    variant="outline-danger"
                    className="mx-3 rounded"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="danger"
                    className="rounded"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-danger"
                    className="mx-3 rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
