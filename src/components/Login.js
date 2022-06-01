import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Login = (props) => {
  const host = "http://localhost:5000"
  const [creds, setCreds] = useState({ "email": "", "password": "" })
  const navigate = useNavigate();
  const handleOnChange = (e) => {
      setCreds({ ...creds, [e.target.name]: e.target.value })
      console.log(creds)
  }
  const handleOnSubmit = async (e) => {
      e.preventDefault()
      await Axios.post(`${host}/api/auth/loginuser`, creds, {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      }).then(function (response) {
          props.promptAlert("Logged in successfully", "success")
          console.log(response.data.token);
          localStorage.setItem("Authorization", response.data.token)
          navigate("/products");
      })
          .catch(function (error) {
              console.log(error)
              props.promptAlert(error.response.data.message, "danger")

          });
  }
  return (
    <div className="container" style={{marginTop:"45px"}} >
    <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control"  value={creds.email} name='email' onChange={handleOnChange} placeholder="Email" id="email" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={creds.password} name='password' onChange={handleOnChange} autoComplete="on" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  )
}

export default Login