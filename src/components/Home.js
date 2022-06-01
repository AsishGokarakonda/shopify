import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const handleOnClickUser = () => {
    navigate('/signup')
  }
  const handleOnClickAdmin = () => {
    navigate('/Adminhome')
  }
  return (
    <div className='container' style={{ textAlign: "center", marginTop: "40px" }}>
      <button type="button" className="btn btn-primary mx-3" onClick={handleOnClickUser}>User</button>
     
        <button type="button" className="btn btn-primary mx-3" onClick={handleOnClickAdmin}>Admin</button>
     
    </div>
  )
}

export default Home