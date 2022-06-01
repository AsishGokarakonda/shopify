import React from 'react'

const CartItem = (props) => {
    const { item } = props
    return (
        <>
            <div className="col-md-4" style={{ marginTop: "15px" }}>
                <div className="card" style={{ width: "23rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-subtitle mb-2 text-muted">{item.category}</p>
                        <p className="card-text">Price: {item.price}Rs </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem