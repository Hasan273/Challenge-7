import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { Button } from "react-bootstrap";

function GoogleLogin({ setToken, label }) {
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const data = {
          access_token: response.access_token,
        };
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/google`,
          data
        );
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <div className="d-grid">
      <div className="m-auto">
        <Button variant="primary" onClick={googleLogin}>
          <FontAwesomeIcon icon={faGoogle} /> {label}
        </Button>
      </div>
    </div>
  );
}

export default GoogleLogin;
