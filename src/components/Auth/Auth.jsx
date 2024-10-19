import React,{useState} from 'react'
import Login from './Login'
import Signin from './Signin'
import social from "../../assets/images/social.png";
function Auth() {
  const [isRegistered,setIsRegistered]=useState(true)

  const toggleAuthMode =()=>{
    setIsRegistered(!isRegistered)
  }
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-center bg-cover">
        <img src={social} alt="jjkimage" className="object-cover w-full h-full round-lg" />
      </div>
      <div className="flex items-center justify-center w-1/2">
        {isRegistered ? (
          <Login toggleAuthMode={toggleAuthMode} />
        ) : (
          <Signin toggleAuthMode={toggleAuthMode} />
        )}
      </div>
    </div>
  );}

export default Auth