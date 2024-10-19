import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthSlice";

const RegistrationPage = ({ toggleAuthMode }) => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();

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
      const userDetails = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      const user = userDetails.user;
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: input.name,
        })
      );
      setInput({ email: "", password: "", name: "" });
      toggleAuthMode();

    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-5 text-2xl font-bold text-black">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-black">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-md"
            value={input.name}
            onChange={handleChange}
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Email</label>
          <input
            type="text"
            name="email"
            className="w-full px-4 py-2 border rounded-md"
            value={input.email}
            onChange={handleChange}
        
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Password</label>
          <input
            type="text"
            name="password"
            className="w-full px-4 py-2 border rounded-md"
            value={input.password}
            onChange={handleChange}
          
          />
        </div>
        <button className="w-full py-2 text-black bg-blue-600 rounded-md">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm text-black">
        Already have an account?
        <span onClick={toggleAuthMode} className="text-blue-500 cursor-pointer">
          Login
        </span>
      </p>
    </div>
  );
};

export default RegistrationPage;
