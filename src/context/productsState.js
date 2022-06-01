import React from "react";
import productsContext from "./productsContext";
import { useState } from "react";
import Axios from 'axios'

const ProductsState = (props) => {
  const host = "http://localhost:5000"
  const productsIntial = []
  const [products, setProducts] = useState(productsIntial)
  const [reviews, setReviews] = useState([])
  const [allusers, setAllusers] = useState([])
  const [oneuser, setOneuser] = useState({})
  const getProducts = async () => {
    const response = await fetch(`${host}/api/products/getallproducts`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newProducts = await response.json()
    setProducts(newProducts)
  }


  const MoreAboutProduct = async (item,Authorization) => {
      setReviews([])
      console.log("hi")
      console.log(item)
      const key = `${host}/api/products/more/${item}`
      const response = await fetch(key, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Authorization,
        },
      });
      const allReviews = await response.json()
      setReviews(allReviews)
  
  }


  const addReview = async (review,itemid,Authorization) => {
    console.log("addreview")
    // console.log(review)
    console.log(review)
    console.log(itemid)
    console.log(Authorization)
    const response = await fetch(`${host}/api/products/addreview/${itemid}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Authorization,
      },
      body: JSON.stringify(review)
    });
    const reviewaddition = await response.json()
    console.log("final")
    console.log(reviewaddition)
}

const getallusers = async () => {
  const response = await fetch(`${host}/api/auth/getallusers`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const allusersgot = await response.json()
  setAllusers(allusersgot)
}

const blockuser = async (id) =>{
  // http://localhost:5000/api/auth/blockuser/6295e439e3f126ea805fe28a
  console.log(id)
  const response = await fetch(`${host}/api/auth/blockuser/${id}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json()
  console.log(result)
}

const unblockuser =async (id) =>{
  // http://localhost:5000/api/auth/unblockuser/6295e439e3f126ea805fe28a
  console.log(id)
  const response = await fetch(`${host}/api/auth/unblockuser/${id}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json()
  console.log(result)
}

const addProduct = async (product) =>{
  console.log(product)
  // http://localhost:5000/api/products/addproduct
  const response = await fetch(`${host}/api/products/addproduct`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(product)
  });
  const result = await response.json()
  console.log(result) 
}

const updateProduct = async (id,product) =>{
  console.log(product)
  console.log(id)
  // http://localhost:5000/api/products/updateproduct/6295dedc9ccaac4dba181376
  const response = await fetch(`${host}/api/products/updateproduct/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(product)
  });
  const result = await response.json()
  console.log(result) 
  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    if (element.id === id) {
      element.name = product.name
      element.category = product.category
      element.price = product.price
    }
  }
}


  const deleteAccount = async (Authorization) =>{
    // http://localhost:5000/api/auth/deleteuser/
    console.log(Authorization)
    const response = await fetch(`${host}/api/auth/deleteuser/`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Authorization
      }
    });
    // const result = await response.json()
    console.log(response) 
    localStorage.removeItem("Authorization")
  }


  const editAccount = async (Authorization) =>{
    // http://localhost:5000/api/auth/edituser
    const response = await fetch(`${host}/api/auth/edituser`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Authorization
      }
    });
    const result = await response.json()
    console.log(result) 
    console.log(response)

  }

  const getuserbyAuthToken = async(Authorization) =>{
    // http://localhost:5000/api/auth/getuser
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Authorization
      }
    });
    const result = await response.json()
    console.log(result)
    setOneuser(result)
  }
  return (
    <productsContext.Provider value={{ products, getProducts , MoreAboutProduct , reviews, addReview, getallusers,allusers,blockuser,unblockuser,addProduct,updateProduct,deleteAccount,editAccount,getuserbyAuthToken,oneuser}}>
      {props.children}
    </productsContext.Provider>
  )
}

export default ProductsState