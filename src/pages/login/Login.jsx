import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { stateContext } from '../../context/StateProvider';

import axios from "axios";
import "./login.css"

export default function Login() {

  const history = useHistory();

  const { setCurrentUser } = useContext(stateContext);
 
  const [data, setData] = useState(
    {
      email: "",
      password: ""
    }
  )

  function handleChange(event) {
    // console.log(event)
    const {name, value, type, checked} = event.target
    setData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("email", data.email)
      console.log("password", data.password)

      const  res = await axios({
        withCredentials: true,
        method: 'POST',
        // Este url es para Development
        // url: 'http://127.0.0.1:8000/api/v1/users/login',
        url: 'https://eljuanjo-dulces.herokuapp.com/api/v1/users/login',
        // Este url es para Production
        // url: '/api/v1/users/login',
        data: {
          email : data.email,
          password : data.password
        }	
      });

      console.log("res", res);
      // console.log("res", res.data.data);

      if (res.data.status === 'success') {
        // alert ('Logged in succesfully!');
          // console.log(res.data.data.data);
          console.log ('El usuario fue loggeado con éxito!');
          // setMensajeSnackBar("Cliente loggedo")
          // setOpenSnackbar(true);

          console.log(res.data.data.user);
          setCurrentUser(res.data.data.user)          
          history.replace("/");
      } 
    }
    catch(err) {
      
      console.log(err);
      // setMensajeSnackBar("Hubo un error al grabar el cliente")
      // setOpenSnackbar(true);
    }
  }

  return (
    <div className='login'>
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Inicia sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="email" className="form__label" >Correo Electrónico</label>
              <input 
                    type="email" 
                    id="email" 
                    className="form__input" 
                    placeholder='micorreo@ejemplo.com' 
                    required 
                    onChange={handleChange}
                    name="email"
                    value={data.email || ''}
                    onInvalid={e=> e.target.setCustomValidity('El Email debe tener entre 5 y 20 caracteres')} 
                    onInput={e=> e.target.setCustomValidity('')} 
                    minLength="5"
                    maxLength="20"
              />
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__label" >Password</label>
              <input 
                    type="password" 
                    id="password" 
                    className="form__input" 
                    placeholder='••••••••' 
                    required 
                    minLength="8" 
                    onChange={handleChange}
                    name="password"
                    value={data.password || ''}
              />
            </div>
            <div className="form__group ma-bt-md">
              <Link className="forgot-password" to="/forgotPassword">Olvidé mi Password?
              </Link>
            </div>
            <div className="form__group">
              <button className="btn btn--green">Iniciar mi sesión</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
