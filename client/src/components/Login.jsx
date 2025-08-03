import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography } from '@mui/material';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa"
import Navbar from "./Navbar";

const Login = ({ setActive }) => {
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
    borderRadius:'16px'
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
    if (validateEmail(email) && validatePassword(password)) {

      // const userData = {
      //   email: email,
      //   password: password
      // };
      setModalMessage("Login Successfully!");
      setOpenModal(true);
      setEmail("")
      setPassword("")
      setTimeout(() => {
        setOpenModal(false)
        navigate("/")
      }, 2000);

    };
  }

  return (
    <div className="flex flex-col min-h-screen pb-32 pb-[1150px] md:pb-[610px] lg:pb-[500px] bg-slate-100">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-xl">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Login to your Account</h2>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
              required
            />
            {error.emailError && <p className="text-red-500 text-xs mt-1">{error.emailError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
              </div>
            </div>
            {error.passwordError && <p className="text-red-500 text-xs mt-1">{error.passwordError}</p>}
          </div>

          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none"
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => setActive(0)} className="font-medium text-black hover:underline">Sign Up</button>
          </div>
        </div>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography className="flex items-center gap-2 text-sm">
            {modalMessage === "Login Successfully!" ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                {modalMessage}
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 0 0 0 .708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646a.5.5 0 0 0-.708 0z" />
                </svg>
                {modalMessage}
              </>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Login