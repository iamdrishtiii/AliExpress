
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdMovie } from 'react-icons/md';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Modal, Box, Typography } from '@mui/material';
import { FaRegEyeSlash } from "react-icons/fa";
import Navbar from "./Navbar";

const Signup = ({ setActive }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 3,
    borderRadius: '16px'
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [repeatShowPassword, setRepeatShowPassword] = useState(false);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("")
  const [openModal, setOpenModal] = useState(false);

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    repeatPasswordError: ""
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

  const validateRepeatPassword = (repeatPassword) => {
    let rpError = error.repeatPasswordError
    let isvalid = formValid

    if (repeatPassword !== password) {
      rpError = "Password not matched"
      isvalid = false
    }
    else {
      isvalid = true,
        rpError = ""
    }
    setRepeatPassword(repeatPassword)
    setFormValid(isvalid)
    setError({ ...error, repeatPasswordError: rpError })

    return isvalid
  }

  const handleChange = (e) => {
    if (e.target.id === "email") {
      validateEmail(e.target.value)
    } else if (e.target.id === "password") {
      validatePassword(e.target.value)
    } else if (e.target.id === "repeatPassword") {
      validateRepeatPassword(e.target.value)
    }
  }


  const handleSignup = () => {

    // const userData = {
    //   email: email,
    //   password: password,
    //   repeatPassword: repeatPassword,
    // };
    if (validateEmail(email) && validatePassword(password) && validateRepeatPassword(repeatPassword)) {
      setModalMessage("Signup successful!");
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false)
        navigate("/")
      }, 2000);
      setEmail("")
      setPassword("")

    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-32 pb-[1150px] md:pb-[610px] lg:pb-[500px] bg-slate-100">
      <Navbar />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Create Account</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
            {error.emailError && <p className="text-sm text-red-500 mt-1">{error.emailError}</p>}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
            />
            <div className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </div>
            {error.passwordError && <p className="text-sm text-red-500 mt-1">{error.passwordError}</p>}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="repeatpassword" className="block text-sm font-medium text-gray-700">Repeat Password</label>
            <input
              type={repeatShowPassword ? "text" : "password"}
              id="repeatPassword"
              value={repeatPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Repeat Password"
            />
            <div className="absolute right-3 top-3 cursor-pointer" onClick={() => setRepeatShowPassword(!repeatShowPassword)}>
              {repeatShowPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </div>
            {error.repeatPasswordError && <p className="text-sm text-red-500 mt-1">{error.repeatPasswordError}</p>}
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

          <div className="text-sm text-center mt-4 text-gray-600">
            <span>Already have an account?</span>
            <button className="ml-1 text-blue-600 hover:underline" onClick={() => setActive(1)}>
              Login
            </button>
          </div>
        </div>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography>
            <div className="flex items-center gap-2 text-sm">
              {modalMessage === "Signup successful!" ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                  <span>{modalMessage}</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 0 0 0 .708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646a.5.5 0 0 0-.708 0z" />
                  </svg>
                  <span>{modalMessage}</span>
                </>
              )}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Signup