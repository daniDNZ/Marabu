import jwt_decode from "jwt-decode";
import { getCurUser } from "./api/ApiUser";
import "../css/login.css";
import { useContext } from "react";
import { UserContext } from "../context/context";
import { handleErrors } from "./api/ApiFetch";


function Logout() {
    if (localStorage.getItem("token")) localStorage.removeItem("token");


    return window.location = "/";
}

// Manejador del Login
const HandleLogin = (e, updateUser) => {
    e.preventDefault();
    const handleCurUser = (u) => {

        updateUser(u);
        u.roles.includes('ROLE_STAFF') 
            ? window.location = '/turdus/dashboard'
            : window.location = '/'
    }

    const data = {
        username: e.target.username.value,
        password: e.target.password.value
    }

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const request = new Request("http://192.168.1.81:8888/api/login_check", config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(response => {
              if(response.token.length > 0) {
                console.log('response token length')

                localStorage.setItem("token", response.token);
                const username = jwt_decode(response.token).username; 

                if (jwt_decode(response.token).roles.includes('ROLE_STAFF')) {
                  getCurUser(handleCurUser, username);
                } else {
                  handleCurUser({username: username, roles: jwt_decode(response.token).roles});
                }
              } 
            }
        )
        .catch(e => {
          if(e == 'Error: 401'){
            window.alert('Credenciales no válidas.')
          }
        })

    e.target.username.value = '';
    e.target.password.value = '';
}


export { Logout, HandleLogin };

function Login() {
  document.body.removeAttribute('data-bs-spy');
  document.body.removeAttribute(' data-bs-target');
  
  const {updateUser} = useContext(UserContext);


  document.body.className = '';
  document.body.classList.add("body-signin", "text-center");
  document.getElementById("root").className = '';
  document.getElementById("root").classList.add("form-signin");

  return (
    <>
      <form onSubmit={ e => HandleLogin(e, updateUser)}>
        <h1 className="h3 mb-3 fw-normal">Bienvenid@</h1>
        <div className="form-floating">
          <input type='text' id="floatingInput" name='username' placeholder='Username' className='form-control'></input>
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input type='password' id="floatingPassword" name='password' placeholder='Password' className='form-control' required></input>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type='submit' className='w-100 btn btn-lg btn-primary'>Login</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2022 Turdus</p>
      </form>
    </>

  );
}

export default Login;