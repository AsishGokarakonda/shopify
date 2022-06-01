import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect,useContext} from 'react'
import productsContext from '../context/productsContext'
import ProductItemAdmin from './ProductItemAdmin'


const Products = () => {
  const navigate = useNavigate()
  const context = useContext(productsContext)
  const { products, getProducts } = context
  // const [products, setProducts] = useState()
  useEffect(() => {
      getProducts()
  })
  const modifyproduct = (item) =>{
      console.log(item)
  }
  // console.log(products)
  return (
    <div className='container'>
      <div className="row my-3" >
        <h1>Products</h1>
        {products.map((item) => {
          return <ProductItemAdmin item={item} modifyproduct={modifyproduct} key={item._id} />
        })}
      </div>
    </div>
  )
}

export default Products