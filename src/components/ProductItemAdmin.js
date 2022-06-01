import React from 'react'

const ProductItemAdmin = (props) => {
    const {item,modifyproduct} = props
    return (
        <div className="col-md-4" style={{ marginTop: "15px" }}>
            <div className="card" style={{ width: "20rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-subtitle mb-2 text-muted">{item.category}</p>
                    <p className="card-text">Price: {item.price}Rs </p>
                    <button style={{ border: "0px", marginRight: "20px" }} className="btn btn-warning" onClick={() => { modifyproduct(item) }} >Update</button>
                </div>
            </div>
        </div>
    )
}

export default ProductItemAdmin