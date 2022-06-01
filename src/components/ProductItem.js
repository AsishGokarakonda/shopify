import React from 'react'
import productsContext from '../context/productsContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductItem = (props) => {
    const { item } = props
    const context = useContext(productsContext)
    const { MoreAboutProduct, addReview } = context
    const navigator = useNavigate()
    const [userreview, setUserreview] = useState({ "review": "" })
    console.log(item)
    const handleOnClick = (item) => {
        MoreAboutProduct(item._id, localStorage.getItem("Authorization"))
        navigator("/productReviews")
    }
    const handleOnChange = (e) => {
        e.preventDefault();
        setUserreview({ ...userreview, [e.target.name]: e.target.value })
        console.log(userreview)
    }
    const handlereviewClick = (e) => {
        console.log(item)

    }
    return (
        <>
            <div className="col-md-4" style={{ marginTop: "15px" }}>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{item.name} {item._id}</h5>
                        <p className="card-subtitle mb-2 text-muted">{item.category}</p>
                        <p className="card-text">Price: {item.price}Rs </p>
                        <button style={{ border: "0px", marginRight: "20px" }} className="btn btn-primary" onClick={() => { handleOnClick(item) }} >More</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem