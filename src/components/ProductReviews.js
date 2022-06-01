import React from 'react'
import productsContext from '../context/productsContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReviewCard from './ReviewCard'

const ProductReviews = () => {
    const navigate = useNavigate()
    const context = useContext(productsContext)
    const { reviews } = context
    console.log(reviews)

        if (!localStorage.getItem("Authorization")) {
            //   console.log(localStorage.getItem("Authorization"))
            navigate("/login")
        }

    return (
        <div className='container'>
            {reviews.length !== 0 && <div style={{ padding: "10px", textAlign: "center", border: "2px solid gray" }}>
                <h1> {reviews.length !== 0 && `Product Name : ${reviews[0]["itemname"]}`} </h1>
                <h1> {reviews.length !== 0 && `Category : ${reviews[0]["itemcategory"]} `} </h1>
                <h1> {reviews.length !== 0 && `Price : ${reviews[0]["itemprice"]}`}</h1>
            </div>}

            <div style={{marginTop:"40px"}}>
                <h1>
                    Reviews
                </h1>
                <div>
                    {reviews.length === 0 && "No review to display"}
                </div>
                {/* {reviews.length !==0 && } */}
                <div className="row my-3" style={{textAlign:"center"}} >
                    {reviews.map((review) => {
                        return <ReviewCard review={review} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductReviews