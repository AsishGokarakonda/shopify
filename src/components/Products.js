import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect,useContext} from 'react'
import productsContext from '../context/productsContext'
import ProductItem from './ProductItem'


const Products = () => {
  const navigate = useNavigate()
  const context = useContext(productsContext)
  const { products, getProducts } = context
  // const [products, setProducts] = useState()
  useEffect(() => {
    if(localStorage.getItem("Authorization")){
      // console.log(localStorage.getItem("Authorization"))
      getProducts()
    }
    else{
      navigate("/login")
    }
  })
  // console.log(products)
  return (
    <div className='container'>
      <div className="row my-3" >
        <h1>Products</h1>
        {products.map((item) => {
          return <ProductItem item={item} key={item._id} />
        })}
      </div>
    </div>
  )
}

export default Products