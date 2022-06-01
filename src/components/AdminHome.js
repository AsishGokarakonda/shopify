import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
    const navigate = useNavigate()
    localStorage.removeItem("Authorization")
    const handleOnClick = (url) =>{
        navigate(`/${url}`)
    }
  return (
    <div style={{textAlign:"center"}}>
        <div>        
        <button className='btn btn-primary' onClick={()=>{handleOnClick("listofusers")}} style={{margin:"10px"}}>View List Of Users</button>
        <button className='btn btn-primary' onClick={()=>{handleOnClick("updateproduct")}} style={{margin:"10px"}}>Update Product Details</button>
        <button className='btn btn-primary' onClick={()=>{handleOnClick("addproduct")}} style={{margin:"10px"}}>Add A Product</button>
        </div>
    </div>
  )
}

export default AdminHome