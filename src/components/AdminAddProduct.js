import React from 'react'
import { useState } from 'react'
import productsContext from '../context/productsContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminAddProduct = (props) => {
    const [product, setProduct] = useState({ name: "", category: "", price: "" })
    const context = useContext(productsContext)
    const navigate = useNavigate()
    const { addProduct } = context
    const handleOnChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
        // console.log(product)
    }
    const handleClick = (e) => {
        e.preventDefault()
        console.log(product)
        addProduct(product).then(function (response) {
            console.log(response);
            props.promptAlert("product added", "success")
        })
            .catch(function (error) {
                console.log(error)
                props.promptAlert("Name of the product should be unique", "danger")
            });
        props.promptAlert("Product added", "success")
    }
    const handleGoBack = () =>{
        navigate("/Adminhome")
    }
    return (
        <div className='container' style={{marginTop:"45px"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <h1>Add Product</h1>
            <button className='btn btn-danger' onClick={handleGoBack}>Go back</button>
            </div>
            <form>
                <div className="mb-3" style={{marginTop:"30px"}}>
                    <label className="form-label">Name of Product</label>
                    <input type="text" className="form-control" id="name" name="name" required onChange={handleOnChange} value={product.name} />
                    <div id="emailHelp" className="form-text">Product will be added only if name is unique</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" name="category" required onChange={handleOnChange} value={product.category} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" name="price" required onChange={handleOnChange} value={product.price} />
                </div>
                <button type="submit" disabled={product.name.length === 0 || product.category.length === 0 || product.price.length === 0} onClick={handleClick} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AdminAddProduct