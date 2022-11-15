import "./login.css"
import axios from "axios";

import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { stateContext } from '../../context/StateProvider';

/**************************    Snackbar    **********************************/
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import {FaTimes} from "react-icons/fa";
import { Alert } from '@mui/material';
/****************************************************************************/

import { domAnimation, LazyMotion, m } from 'framer-motion';

const containerVariants = {
  hidden: { 
    opacity: 0, 
  },
  visible: { 
    opacity: 1, 
    transition: { delay: .5, duration: 1.5 }
  },
  exit: {
    // y: "-100vh",
    opacity: 0,
    transition: { duration: .4, ease: 'easeInOut' }
  }
};

export default function Login() {

  const [mensajeSnackBar, setMensajeSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const history = useHistory();

    /**************************    useRef    **********************************/
  // inputRef lo uso para que al cargar la pagina ponga el focus en el nombre
  // del cliente

  const inputRef = useRef(null);
  /*****************************************************************************/


  const { setCurrentUser } = useContext(stateContext);
 
  /**************************    useEffect    **********************************/
  // Al cargar la pagina pone el focus en el nombre del producto
  useEffect(()=>{
    inputRef.current.focus();
  },[])
  /*****************************************************************************/


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
      // showAlert ('error', err.response.data.message);
      setMensajeSnackBar(err.response.data.message)
      setOpenSnackbar(true);

    }
  }

  /************************     handleCloseSnackbar    **********************/
  // Es el handle que se encarga cerrar el Snackbar
  /**************************************************************************/
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  /*****************************     action    ******************************/
  // Se encarga agregar un icono de X al SnackBar
  /**************************************************************************/  
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        {/* <CloseIcon fontSize="small" /> */}
        <FaTimes />
      </IconButton>
    </>
  );


  return (
    <LazyMotion features={domAnimation}>
      <m.div className="login"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
            severity= {"error"} 
            action={action}
            sx={{ fontSize: '1.4rem', backgroundColor:'#333', color: 'white', }}
        >{mensajeSnackBar}
        </Alert>
      </Snackbar>   

      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Inicia sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="email" className="form__label" >Correo Electrónico</label>
              <input 
                    ref={inputRef}
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
    </m.div>
    </LazyMotion>
  )
}
