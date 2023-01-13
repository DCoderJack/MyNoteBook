import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({email : "", password : ""});

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email : credentials.email, password : credentials.password}) // body data type must match "Content-Type" header
          });

          const json = await response.json();
          console.log(json);

          if(json.success){
            // Save the auth-token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged In Successfully!", "success");
            navigate('/');
          }else{
            props.showAlert("Invalid Details!", "danger");
          }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
  

  return (
    <div className="container mt-5">
      <h2 className = "my-3">Login to MyNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
