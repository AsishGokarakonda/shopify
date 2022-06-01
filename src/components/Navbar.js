import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const loc = useLocation()
    // console.log(loc)
    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem("Authorization")
        navigate('/login')
        console.log("first")
    }
    return (

        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${loc.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${loc.pathname === "/products" ? "active" : ""}`} to="/products">Products</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="/">Action</a></li>
            <li><a className="dropdown-item" href="/">Another action</a></li>
            <li><hr className="dropdown-divider"></li>
            <li><a className="dropdown-item" href="/">Something else here</a></li>
          </ul> */}
                        </li>
                    </ul>
                    {!localStorage.getItem("Authorization") ? <form className='d-flex'>
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link>
                    </form> :
                        <button onClick={handleLogOut} className='btn btn-primary mx-2'>
                            LogOut
                        </button>
                    }
                </div>
            </div>
        </nav>

    )
}

export default Navbar