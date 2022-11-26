import "./newClient.css";
import axios from "axios";

/**************************    React    **********************************/
import { useEffect, useRef, useState } from 'react';
/****************************************************************************/

/**************************    Snackbar    **********************************/
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import {FaTimes} from "react-icons/fa";
import { Alert } from '@mui/material';
/****************************************************************************/



const INITIAL_STATE = { 
  ownerName: "", 
  businessName: "", 
  businessAddress: "",
  cellPhone: "", 
  fixedPhone: "",
  email: "", 
  esMayorista: false,
  sku: 0,
  // imageCover: ""
}

export default function NewClient() {

  /**************************    useRef    **********************************/
  // inputRef lo uso para que al cargar la pagina ponga el focus en el nombre
  // del cliente

  const inputRef = useRef(null);
  /*****************************************************************************/


  /**************************    useState    **********************************/
  
  // mensajeSnackBar es el mensaje que se mostrara en el SnackBar, puede ser 
  // de exito o de error segun si se grabó la informacion en la BD

  // updateSuccess es boolean que indica si tuvo exito o no el grabado en la BD
  
  // data es un Object con toda la informacion a grabar en la BD

  // openSnackbar es boolean que manda abrir y cerrar el Snackbar

  // isSaving es un boolean para saber si esta grabando la informacion en la BD
  // lo uso para deshabilitar el boton de Grabar y que el usuario no le de click
  // mientras se esta guardando en la BD
  const [data, setData] = useState (INITIAL_STATE);
  const [isSaving, setIsSaving] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState (true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensajeSnackBar, setMensajeSnackBar] = useState("");
  /*****************************************************************************/
 

  /**************************    useEffect    **********************************/
  // Al cargar la pagina pone el focus en el nombre del producto
  useEffect(()=>{
    inputRef.current.focus();
  },[])
  /*****************************************************************************/


  /************************     handleSubmit    *******************************/
  // Aqui guardo la informacion en la BD, puede ser exitoso o haber error
  /****************************************************************************/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSaving)
      return;
      
    try {
      setIsSaving(true);

      const res = await axios({
        withCredentials: true,
        method: 'POST',
        url: `http://127.0.0.1:8000/api/v1/clients/`,
        // url: `https://eljuanjo-dulces.herokuapp.com/api/v1/clients/`,
        data: {
              sku: data.sku, 
              ownerName: data.ownerName, 
              businessName: data.businessName, 
              businessAddress: data.businessAddress,
              cellPhone: data.cellPhone, 
              fixedPhone: data.fixedPhone,
              email: data.email, 
              esMayorista: data.esMayorista,
              imageCover: "" ,
      }})

      setIsSaving(false);

      if (res.data.status === 'success') {
        // alert ('Logged in succesfully!');
        // console.log(res.data.data.data);
        // console.log ('El cliente fue creado con éxito!');
        setUpdateSuccess(true);
        setMensajeSnackBar("El Cliente fue creado")
        setOpenSnackbar(true);

        setData(INITIAL_STATE);
        inputRef.current.focus();
      } 
    }
    catch(err) {
      setIsSaving(false);
      setUpdateSuccess(false);
      setMensajeSnackBar("Hubo un error al grabar el cliente. Revisa que estes en línea.");
      setOpenSnackbar(true);
      console.log(err);
    }
  }


  /************************     handleChange    *****************************/
  // Se encarga de guardar en setData, la informacion de cada input
  /**************************************************************************/  

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
      {/* <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
        UNDO
      </Button> */}
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
    <div className="newClient">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
            severity= {updateSuccess ?  "success" : "error"} 
            action={action}
            sx={{ fontSize: '1.4rem', backgroundColor:'#333', color: 'white', }}
        >{mensajeSnackBar}
        </Alert>
      </Snackbar>

      <h1 className="newClientTitle">Nuevo Cliente</h1>

      <form className="newClientForm" onSubmit={handleSubmit}>
        <div className="newClientItem">
          <label>SKU *</label>
          <input 
              ref={inputRef}
              type="text" 
              placeholder="12345" 
              onChange={handleChange}
              name="sku"
              value={data.sku || ''}  
              required
              onInvalid={e=> e.target.setCustomValidity('Escribe el SKU')} 
              onInput={e=> e.target.setCustomValidity('')}   
          />
        </div>
        <div className="newClientItem">
          <label>Negocio *</label>
          <input 
              type="text" 
              placeholder="Mi Tiendita" 
              onChange={handleChange}
              name="businessName"
              value={data.businessName || ''}  
              required
              onInvalid={e=> e.target.setCustomValidity('Escribe el Nombre del Negocio')} 
              onInput={e=> e.target.setCustomValidity('')}   
          />
        </div>
        <div className="newClientItem">
          <label>Contacto *</label>
          <input 
              type="text" 
              placeholder="Carlos Treviño" 
              onChange={handleChange}
              name="ownerName"
              value={data.ownerName || ''}  
              required
              onInvalid={e=> e.target.setCustomValidity('El Nombre del Contacto debe tener entre 5 y 80 caracteres')} 
              onInput={e=> e.target.setCustomValidity('')} 
              minLength="5"
              maxLength="80"
          />
        </div>
        <div className="newClientItem">
          <label>Dirección</label>
          <input 
              type="text" 
              placeholder="Av. Juárez 2222 Col. Centro, Monterrey, N.L." 
              onChange={handleChange}
              name="businessAddress"
              value={data.businessAddress || ''}  
              onInvalid={e=> e.target.setCustomValidity('La Dirección debe tener menos de 100 caracteres')} 
              onInput={e=> e.target.setCustomValidity('')} 
              maxLength="100"                 
          />
        </div>
        <div className="newClientItem">
          <label>Celular</label>
          <input 
              type="text" 
              placeholder="81 80 118990" 
              onChange={handleChange}
              name="cellPhone"
              value={data.cellPhone || ''}  
              onInvalid={e=> e.target.setCustomValidity('El Número de Celular debe ser menor a 20 caracteres')} 
              onInput={e=> e.target.setCustomValidity('')} 
              maxLength="20"    
          />
        </div>
        <div className="newClientItem">
          <label>Teléfono</label>
          <input 
              type="text" 
              placeholder="81 12 345678" 
              onChange={handleChange}
              name="fixedPhone"
              value={data.fixedPhone || ''}   
              onInvalid={e=> e.target.setCustomValidity('El Número de Teléfono debe ser menor a 20 caracteres')} 
              onInput={e=> e.target.setCustomValidity('')} 
              maxLength="20"             
          />
        </div>
        <div className="newClientItem">
          <label>Email</label>
          <input 
              className="inputClientItem"
              type="email" 
              placeholder="carlos.trevino@gmail.com" 
              onChange={handleChange}
              name="email"
              value={data.email || ''}                
          />
        </div>

        <div className="newClientItem">
            <label htmlFor="esMayorista">¿Es Mayorista?</label>
            <input 
                type="checkbox" 
                id="esMayorista" 
                checked={data.esMayorista}
                onChange={handleChange}
                name="esMayorista"
                value={data.esMayorista}
            />
        </div>
        {/* <div className="newClientItem">
          <label htmlFor="esmayorista">¿Es Mayorista?</label>
              <select 
                  className="newClientSelect"
                  id="esmayorista" 
                  value={data.esMayorista}
                  onChange={handleChange}
                  name="esmayorista"
              >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
              </select>          
        </div> */}
        <button className="newClientButton" disabled={isSaving}>{isSaving ? 'Grabando...' : 'Crear'}</button>
      </form>
    </div>
  );
}
