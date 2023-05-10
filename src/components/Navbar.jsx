import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import StigmiLogo from "../img/stigmiLogo.png";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='navbar'>
      <img src={StigmiLogo} alt="" height={80}/>
      {/* <span className="logo">Lama Chat</span> */}
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar