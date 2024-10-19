import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthSlice";

const googleProvider = new GoogleAuthProvider();

const LoginPage = ({ toggleAuthMode }) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
     const user = {
       uid: result.user.uid,
       email: result.user.email,
       displayName: result.user.displayName || result.user.email,
     };
    dispatch(login(user));
      navigate("/homepage");
    } catch (error) {
      console.error("Error with email login:", error.message);
      alert("email is not registed")
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || result.user.email,
      };

      dispatch(login(user));
      navigate("/homepage");
    } catch (error) {
      console.log("Error with Google login:", error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-5 text-2xl font-bold text-white">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black">Email</label>
          <input
            type="text"
            name="email"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter your email"
            value={input.email}
            onChange={handleChange}
          />
         
        </div>
        <div className="mb-4">
          <label className="block text-black">Password</label>
          <input
            type="password" 
            name="password"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter your password"
            value={input.password}
            onChange={handleChange}
          />
        </div>
        <button className="w-full py-2 text-white bg-blue-500 rounded-md">
          Login
        </button>
      </form>
      <div className="mt-6">
        <button
          className="flex items-center justify-center w-full py-2 mb-2 text-gray-700 bg-gray-100 rounded-md"
          onClick={loginWithGoogle}
        >
          <FaGoogle className="mr-2" /> Login with Google
        </button>
      </div>
      <p className="mt-4 text-sm text-black">
        Don’t have an account?
        <span onClick={toggleAuthMode} className="text-blue-500 cursor-pointer">
        Sign up
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
