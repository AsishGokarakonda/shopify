import React from 'react'
import { useContext } from 'react'
import productsContext from '../context/productsContext'
import { useEffect } from 'react'
import CartItem from './CartItem'

const GetCart = () => {
    const context = useContext(productsContext)
    const { getcart,cartset} = context
    useEffect(() => {
        getcart(localStorage.getItem("Authorization"))
        console.log(cartset)
    })
    

  return (
    <div className='container'>
    <div className="row my-3" >
      <h1>Cart</h1>
      {cartset.map((item) => {
        return <CartItem item={item} key={item._id}/>
      })}
    </div>
  </div>
  )
}

export default GetCart