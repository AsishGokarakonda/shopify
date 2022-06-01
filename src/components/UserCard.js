import React from 'react'
import productsContext from '../context/productsContext'
import { useContext } from 'react'

const UserCard = (props) => {
    const { details } = props
    const context = useContext(productsContext)
    const { blockuser,unblockuser } = context

    const handleBlockClick = (id) => {
        // console.log(id)
        blockuser(id)
    }
    const handleUnblockClick = (id) =>{
        console.log(id)
        unblockuser(id)
    }
    return (
        // <div classNameName="col-md-3" style={{ marginTop: "15px" }}>
        <div className="col-md-4" style={{ marginTop: "15px" }}>
            <div className="card" style={{ width: "20rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{details.name}</h5>
                    <p className="card-subtitle mb-2 text-muted">{details.email}</p>
                    <p className="card-text">
                        {details.blocked}
                        <button style={{ marginLeft: "25px" }} className='btn btn-danger' onClick={() => { handleBlockClick(details._id) }}>Block</button>
                        <button style={{marginLeft:"25px"}} className='btn btn-success' onClick={()=>{handleUnblockClick(details._id)}}>UnBlock</button> 
                    </p>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default UserCard