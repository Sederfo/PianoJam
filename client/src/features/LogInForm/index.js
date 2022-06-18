import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "utils/APIRoutes";
import { FormContainer } from "features/styledComponents/FormContainer";
import styled from "styled-components";
import { connect } from "react-redux";
import { logIn } from "actions";
import {socket} from "utils/WebSocket"

const RegisterForm = styled(FormContainer)`
  height: 100vh;
  width: 100vw;
`;

function LogInForm(props) {
  //const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
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
      //navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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
    const { password, username } = values;
    

    if (username.length === 0) {
      toast.error("Username is required!", toastOptions);
      return false;
    } else if (password.length === 0) {
      toast.error("Password is required!", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <RegisterForm>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Cynthesia</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          ></input>

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          ></input>

          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
          <span>
            Don't have an account? Register
          </span>
        </form>
      </RegisterForm>
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
)(LogInForm);

