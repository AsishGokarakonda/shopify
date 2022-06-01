import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext,useState } from 'react'
import productsContext from '../context/productsContext'
import ProductItem from './ProductItem'


const Products = () => {
  const navigate = useNavigate()
  const context = useContext(productsContext)
  const { products, getProducts ,addReview} = context
  // const [products, setProducts] = useState()
  const [id, setId] = useState("")
  const [review, setReview] = useState({"review":""})
  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      // console.log(localStorage.getItem("Authorization"))
      getProducts()
    }
    else {
      navigate("/login")
    }
  })

  const reviewaddition = (item) =>{
    document.getElementById('launchdemo').click()
    setReview({review:""})
    setId(item._id)
    console.log(item)
  }

  const handleOnChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value })
    // console.log(newproduct)
  }
   // console.log(products)
   const handleClick = (e) => {
    e.preventDefault();
    console.log(review)
    addReview(review,id,localStorage.getItem("Authorization"))
    document.getElementById('modalclose').click()
    }
  return (
    <>
      <button type="button" className="btn btn-primary d-none" id='launchdemo' data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="htmlForm-label">Review</label>
                  <input type={"text"} className="form-control" id="title1" value={review.review} name='review' onChange={handleOnChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" id='modalclose' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </div>
          </div>
        </div>
      </div>






      <div className='container'>
        <div className="row my-3" >
          <h1>Products</h1>
          {products.map((item) => {
            return <ProductItem item={item} reviewaddition={reviewaddition} key={item._id}  />
          })}
        </div>
      </div>
    </>




  )
}

export default Products