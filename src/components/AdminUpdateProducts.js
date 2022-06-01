import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext,useState } from 'react'
import productsContext from '../context/productsContext'
import ProductItemAdmin from './ProductItemAdmin'


const AdminUpdateProducts = (props) => {
    const navigate = useNavigate()
    const context = useContext(productsContext)
    const { products, getProducts, updateProduct } = context
    const [newproduct, setNewproduct] = useState({ "name": "", "category": "", "price": "" })
    const [id, setId] = useState("")
    useEffect(() => {
        getProducts()
    })

    const handleGoBack = () =>{
        navigate("/Adminhome")
    }

    const modifyproduct = (item) => {
        // console.log(item)
        document.getElementById('launchdemo').click()
        setNewproduct({name:item.name,category:item.category,price:item.price})
        setId(item._id)
    }

    const handleOnChange = (e) => {
        setNewproduct({ ...newproduct, [e.target.name]: e.target.value })
        // console.log(newproduct)
      }

    const handleClick = (e) => {
    e.preventDefault();
    console.log(newproduct)
    updateProduct(id,newproduct).then(function (response) {
        props.promptAlert("Product updated successfully", "success")
    })
        .catch(function (error) {
            console.log(error)
            props.promptAlert(error, "danger")

        });
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
                                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">name</label>
                                    <input type={"text"} className="form-control" id="title1" value={newproduct.name} name='name' onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="htmlForm-label">category</label>
                                    <input type="text" className="form-control" id="description1" value={newproduct.category} name='category' onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="htmlForm-label">price</label>
                                    <input type="number" className="form-control" id="tag1" value={newproduct.price} name='price' onChange={handleOnChange} />
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
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                    <h1>Products</h1>
                    <button className="btn btn-danger" onClick={handleGoBack}>Go Back</button>
                    </div>
                    {products.map((item) => {
                        return <ProductItemAdmin item={item} modifyproduct={modifyproduct} key={item._id} />
                    })}
                </div>
            </div>
        </>
    )
}

export default AdminUpdateProducts