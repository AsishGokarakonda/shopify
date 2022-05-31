import React from 'react'


const Login = () => {
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
          localStorage.setItem("token", response.data.token)
          navigate("/");
      })
          .catch(function (error) {
              console.log(error)
              props.promptAlert(error.response.data.message, "danger")

          });
  }
  return (
    <div className="container" style={{marginTop:"45px"}} >
    <form>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="Email2" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="Password2" />
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  )
}

export default Login