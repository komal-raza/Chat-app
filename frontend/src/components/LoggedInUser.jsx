import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const LoggedInUser = () => {
    const {authUser} = useAuthContext();
  return (
    <div>
        <img className='rounded-full h-12 w-12' src={authUser?.profilePic} alt={authUser?.fullName} />
        <h3>{authUser?.fullName}</h3>
    </div>
  )
}

export default LoggedInUser