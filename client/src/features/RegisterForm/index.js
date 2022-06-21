import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "utils/APIRoutes";
import { FormContainer } from "features/styledComponents/FormContainer";
import styled from "styled-components";
import {socket} from "utils/WebSocket"
import { logIn } from "actions";
import { connect } from "react-redux";

const RegisterFormStyled = styled(FormContainer)`
  height: 100vh;
  width: 100vw;
`;

function RegisterForm(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      
      if (data.status === false) {
        
        toast.error(data.msg, toastOptions);
      }

      //pass information to local storage
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        props.logIn(data.user)
        socket.emit("sign-in", data.user.username)
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username length should be greater than 3 characters!",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password length should be greater than 8 characters!",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required!", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  
  return (
    <>
      <RegisterFormStyled>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="Logo" /> */}
            <h1>Register</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          ></input>
          <button type="submit" onClick={handleSubmit}>
            Create User
          </button>
        </form>
      </RegisterFormStyled>
      <ToastContainer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (data) => dispatch(logIn(data)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);