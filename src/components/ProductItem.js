import React from 'react'
import productsContext from '../context/productsContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductItem = (props) => {
    const { item,reviewaddition,cardAdd } = props
    const context = useContext(productsContext)
    const { MoreAboutProduct, addReview } = context
    const navigator = useNavigate()
    const [userreview, setUserreview] = useState({ "review": "" })
    // console.log(item)
    const handleOnClick = (item) => {
         MoreAboutProduct(item._id, localStorage.getItem("Authorization"))
        navigator("/productReviews")
    }

    return (
        <>
            <div className="col-md-4" style={{ marginTop: "15px" }}>
                <div className="card" style={{ width: "23rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-subtitle mb-2 text-muted">{item.category}</p>
                        <p className="card-text">Price: {item.price}Rs </p>
                        <button style={{ border: "0px", marginRight: "20px" }} className="btn btn-primary" onClick={() => { handleOnClick(item) }} >More</button>

                        <button style={{ border: "0px", marginRight: "20px" }} className="btn btn-success" onClick={() => { reviewaddition(item) }} >Review It</button>

                        <button style={{ border: "0px", marginRight: "20px" }} className="btn btn-info" onClick={() => { cardAdd(item) }} >Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem