import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdMovie } from 'react-icons/md';
import { Modal, Box, Typography } from '@mui/material';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa"
const Login = ({ setActive }) => {
  const style = {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("")
  const [openModal, setOpenModal] = useState(false);

  const [error, setError] = useState({
    emailError: "",
    passwordError: ""
  })

  const [formValid, setFormValid] = useState(false)
  const validateEmail = (email) => {
    let eError = error.emailError;
    let isValid = formValid;

    if (!/[A-Za-z0-9%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}/.test(email)) {
      eError = "This is invalid";
      isValid = false;
    } else {
      isValid = true;
      eError = "";
    }

    setEmail(email);
    setFormValid(isValid);
    setError({ ...error, emailError: eError });

    return isValid;
  };


  const validatePassword = (password) => {
    let pError = error.passwordError;
    let isvalid = formValid;

    if (password.trim().length < 9) {
      pError = "Enter atleast 8 char with Capital & special character"
      isvalid = false
    } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()-+=])(?=\S+$).{8,20}$/.test(password)) {
      pError = "This is invalid password"
      isvalid = false
    } else {
      isvalid = true
      pError = ""
    }
    setPassword(password)
    setFormValid(isvalid)
    setError({ ...error, passwordError: pError })

    return isvalid


  }
  const handleChange = (e) => {

    if (e.target.id === "email") {
      validateEmail(e.target.value)
    } else if (e.target.id === "password") {
      validatePassword(e.target.value)
    }
  }


  const handleLogin = () => {
    if (validateEmail(email)&&validatePassword(password)) {

    // const userData = {
    //   email: email,
    //   password: password
    // };
    setModalMessage("Login Successfully!");
    setOpenModal(true);
    setTimeout(() => setOpenModal(false), 2000);
    setEmail("")
    setPassword("")
    navigate("/");
  };
}

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-col items-center justify-center h-full  bg-white">
        <div className="bg-gray-100 rounded-2xl flex flex-col gap-3 shadow-lg m-3 sm:m-6 p-4 sm:p-8 sm:px-16 ">
          <h2 className="text-[42px] text-black mb-4">Login</h2>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="mt-1 py-2 px-4 text-black outline-none bg-white text-[20px] block w-full rounded-md shadow-sm focus:ring-opacity-50"
              value={email}
              placeholder="Enter Email"
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleChange}
              required
            />
            <p style={{ color: "red" }}>{error.emailError}</p>
            <div className="h-[1.3px] mt-3 w-full bg-gray-400"></div>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 py-2 px-4 text-black outline-none bg-white text-[20px] block w-full rounded-md shadow-sm focus:ring-opacity-50"
                value={password}
                placeholder="Password"
                // onChange={(e) => setPassword(e.target.value)}
                onChange={handleChange}
                required
              />
              
              
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaRegEyeSlash color="white" />
                ) : (
                  <MdOutlineRemoveRedEye color="white" />
                )}
              </div>
            </div>

             <p style={{ color: "red" }}>{error.passwordError}</p>
              
            <div className="h-[1.3px] mt-3 w-full bg-gray-400"></div>
          </div>
          <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-600"
            onClick={handleLogin}>
            Login to your Account </button>
          <div className="mt-4 text-[16px] flex gap-1 text-black mx-auto">
            <p>Didn't have an account ?</p>
            <button
              className="text-gray-600 hover:underline focus:outline-none"
              onClick={() => setActive(0)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>


      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className='flex flex-row gap-2 text-sm'>
              {modalMessage === "Login Successfully!" ? (
                <>
                  <p className='pt-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg></p>
                  {modalMessage}
                </>
              ) : (
                <>
                  <p className='pt-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 0 0 0 .708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646a.5.5 0 0 0-.708 0z" />
                  </svg></p>
                  {modalMessage}
                </>
              )}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Login