import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
    const [credentials, setCredentials] = useState({userName: "", email : "", password : "", cpassword : ""});
    const {userName, email, password} = credentials;

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName, email , password}) // body data type must match "Content-Type" header
          });

          const json = await response.json();
          console.log(json);

          if(json.success){
            // Save the auth-token and redirect
            props.showAlert("Logged In Successfully!", "success");
            localStorage.setItem('token', json.authtoken);
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
      <h2 my-3>Create account to use MyNoteBook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input type="userName" className="form-control" name='userName' id="userName" onChange={onChange} required minLength={5} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} required aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={8}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="cpassword" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={8}/>
        </div>
        <button disabled={password.length<8} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup   