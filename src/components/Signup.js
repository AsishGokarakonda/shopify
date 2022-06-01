import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
const Signup = (props) => {
    const [credentials, setCredentials] = useState({ "name": "", "email": "", "password": "" })
    const host = "http://localhost:5000"
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        console.log(credentials)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await Axios.post(`${host}/api/auth/createuser`, credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            console.log(response);
            props.promptAlert("Signed up successfully", "success")
            localStorage.setItem("Authorization", response.data.token)
            navigate("/products");
        })
            .catch(function (error) {
                console.log(error)
                props.promptAlert(error.response.data.error, "danger")
            });
    }

    return (
        <div className="container" style={{ marginTop: "45px" }} >
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                    <input type="name" className="form-control" onChange={handleOnChange} name="name" minLength={3} id="name" aria-describedby="nameHelp" autoComplete="on" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={handleOnChange} name="email" required value={credentials.email} id="email" aria-describedby="emailHelp" autoComplete="on" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" minLength={5} required name="password" value={credentials.password} onChange={handleOnChange} className="form-control" id="password" autoComplete="on" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup