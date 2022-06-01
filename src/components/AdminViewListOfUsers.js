import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import productsContext from '../context/productsContext'
import UserCard from './UserCard'


const AdminViewListOfUsers = () => {
    const context = useContext(productsContext)
    const { getallusers, allusers } = context
    const navigate = useNavigate()
    useEffect(() => {
        getallusers()
        // console.log(allusers)
    })
    const handleGoBack = () =>{
        navigate("/Adminhome")
    }

    return (
        <div className='container'>
            <div className="row my-3" >
                <div>
                    <h1>List Of users</h1>
                    <button onClick={handleGoBack} className='btn btn-primary'>Go back</button>
                </div>
                {allusers.map((details) => {
                    return <UserCard details={details} key={details._id} />
                })}
            </div>
        </div>
    )
}

export default AdminViewListOfUsers