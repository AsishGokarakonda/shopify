import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState ,useContext} from 'react'
import productsContext from '../context/productsContext'
import { useEffect } from 'react'

const EditAccount = (props) => {
    const navigate = useNavigate()
    const [creds, setCreds] = useState({"name":"","email":""})
    const [intialcred, setIntialcred] = useState({})
    const context = useContext(productsContext)
    const { editAccount,getuserbyAuthToken,oneuser } = context
    
    if (!localStorage.getItem("Authorization")) {
        props.promptAlert("Login into your account to edit", "warning")
        navigate("/login");
    }
    useEffect(() => {
        getuserbyAuthToken(localStorage.getItem("Authorization"))
        setIntialcred({
            "name":oneuser.name,
            "email":oneuser.email
        })
    },[getuserbyAuthToken, oneuser.name, oneuser.email])
    // console.log(intialcred)
    

    const handleOnChange = (e) =>{
        setCreds({ ...creds, [e.target.name]: e.target.value })
        // console.log(creds)
    }
    const handleOnSubmit = (e) =>{
        e.preventDefault()
        console.log(creds)
        editAccount(creds,localStorage.getItem("Authorization"))
    }
    return (
        <div className='container'>
            <h1>Edit Account</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={creds.name} onChange={handleOnChange} aria-describedby="nameHelp" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={creds.email} onChange={handleOnChange} aria-describedby="emailHelp" required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
            <div style={{marginTop:"30px"}}>
                <h1>Present Account Credentials</h1>
            <div className="card" style={{ width: "20rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{intialcred.name}</h5>
                    <p className="card-subtitle mb-2 text-muted">{intialcred.email}</p>
                </div>
            </div>
            </div>
        </div>

    )
}

export default EditAccount