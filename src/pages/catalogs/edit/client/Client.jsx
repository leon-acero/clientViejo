import "./client.css";

/************************    Material UI    *********************************/
// import CalendarToday from "@mui/icons-material/CalendarToday";
// import MailOutline from "@mui/icons-material/MailOutline";
// import PermIdentity from "@mui/icons-material/PermIdentity";
// import PhoneAndroid from "@mui/icons-material/PhoneAndroid";
// import Publish from "@mui/icons-material/Publish";
// import LocationSearching from "@mui/icons-material/LocationSearching";
/****************************************************************************/

import {FaHouzz, FaEnvelope, FaBarcode, FaLocationArrow, FaChrome, FaMobileAlt, FaPhoneAlt, FaCloudUploadAlt} from "react-icons/fa";

/**************************    Snackbar    **********************************/
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import {FaTimes} from "react-icons/fa";
import { Alert } from '@mui/material';
/****************************************************************************/

/**************************    React    **********************************/
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom";
/****************************************************************************/

import axios from "axios";
// import { stateContext } from '../../context/StateProvider';


export default function Client() {

  // const { client } = useContext(stateContext);

  /**************************    useRef    **********************************/
  // avoidRerenderFetchClient evita que se mande llamar dos veces al
  // cliente y por lo mismo que se pinte dos veces
  
  const avoidRerenderFetchClient = useRef(false);
  /*****************************************************************************/

  
  /**************************    useState    **********************************/
  // file es la imagen del Producto que se va a guardar en la BD (el nombre) y el
  // archivo fisico se guarda en el file system

  // mensajeSnackBar es el mensaje que se mostrara en el SnackBar, puede ser 
  // de exito o de error segun si se grabó la informacion en la BD

  // updateSuccess es boolean que indica si tuvo exito o no el grabado en la BD
  
  // data es un Object con toda la informacion a grabar en la BD

  // openSnackbar es boolean que manda abrir y cerrar el Snackbar

  // isSaving es un boolean para saber si esta grabando la informacion en la BD
  // lo uso para deshabilitar el boton de Grabar y que el usuario no le de click
  // mientras se esta guardando en la BD  const [file, setFile] = useState(null);
 
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState (true);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensajeSnackBar, setMensajeSnackBar] = useState("");

  const [data, setData] = useState(
    {
        sku: 0,
        ownerName: "", 
        businessName: "", 
        businessAddress: "",
        cellPhone: "", 
        fixedPhone: "",
        email: "", 
        esMayorista: false,
        // imageCover: ""
    }
  )
  /*****************************************************************************/

  /**************************    useParams    **********************************/
  // clientId es la clave de cliente que viene en el URL, me sirve para
  // saber que cliente se actualizara en la BD

  const {clientId } = useParams();
  /*****************************************************************************/

  /************************     handleSubmit    *******************************/
  // Aqui guardo la informacion en la BD, puede ser exitoso o haber error
  /****************************************************************************/

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSaving)
      return;

    try {
        // console.log("imageCover", file)
        // console.log("imageCover", file.name)

        setIsSaving(true);

        const formData = new FormData();
        
        formData.append("sku", data.sku);
        formData.append("ownerName", data.ownerName);
        formData.append("businessName", data.businessName);
        formData.append("businessAddress", data.businessAddress);
        formData.append("cellPhone", data.cellPhone);
        formData.append("fixedPhone", data.fixedPhone);
        formData.append("email", data.email);
        formData.append("esMayorista", data.esMayorista);
        formData.append("photo", file);
        // formData.append("imageCover", file.name);


        const res = await axios({
          withCredentials: true,
          method: 'PATCH',
          url: `http://127.0.0.1:8000/api/v1/clients/${clientId}`,
          // url: `https://eljuanjo-dulces.herokuapp.com/api/v1/clients/${clientId}`,
          data: formData
        })

        // const res = await axios.patch(`http://127.0.0.1:8000/api/v1/clients/${clientId}`, formData, {
        //   headers: {
        //     "content-type": "multipart/form-data",
        //   },
        // });

        // const res = await axios({
        //   method: 'PATCH',
        //   url: `http://127.0.0.1:8000/api/v1/clients/${clientId}`,
        //   data: {
        //         ownerName: data.ownerName, 
        //         businessName: data.businessName, 
        //         businessAddress: data.businessAddress,
        //         cellPhone: data.cellPhone, 
        //         fixedPhone: data.fixedPhone,
        //         email: data.email, 
        //         esMayorista: data.esMayorista,
        //         imageCover: "" ,
        //   }})

        setIsSaving(false);

        if (res.data.status === 'success') {
          // alert ('Logged in succesfully!');
            // console.log(res.data.data.data);
            console.log ('El cliente fue actualizado con éxito!');
            setUpdateSuccess(true);
            setMensajeSnackBar("Cliente actualizado")
            setOpenSnackbar(true);
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


  /************************     useEffect    *******************************/
  // fetchClient mandao cargar desde la BD el Producto que me ineteresa
  // actualizar
  /**************************************************************************/

  useEffect (() => {

    if (avoidRerenderFetchClient.current) {
      return;
    }

    const fetchClient = async () => {

      // solo debe de cargar datos una vez, osea al cargar la pagina
      avoidRerenderFetchClient.current = true;

      // console.log("cargar cliente")
      const res = await axios ({
        withCredentials: true,
        method: 'GET',
        url: `http://127.0.0.1:8000/api/v1/clients/${clientId}`
        // url: `https://eljuanjo-dulces.herokuapp.com/api/v1/clients/${clientId}`
      });
      // console.log(res.data.data.data);
      setData(res.data.data.data)
    }

    fetchClient();
   
  }, [clientId]);


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
    <div className="client">

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

      <div className="clientTitleContainer">
        <h1 className="clientTitle">Editar Cliente</h1>
        <Link to="/new-client">
          <button className="clientAddButton">Crear</button>
        </Link>
      </div>
      <div className="clientContainer">
        <div className="clientShow">
          <div className="clientShowTop">
            <img
              src={`/img/clients/${data.imageCover}`}
              alt=""
              className="clientShowImg"
            />
            <div className="clientShowTopTitle">
              <span className="clientShowClientname">{data.businessName}</span>
              <span className="clientShowClientTitle">{data.ownerName}</span>
            </div>
          </div>
          <div className="clientShowBottom">
            <span className="clientShowTitle">Detalle</span>
            <div className="clientShowInfo">
              <FaBarcode className="clientShowIcon" />
              <span className="clientShowInfoTitle">SKU: {data.sku}</span>
            </div>
            <div className="clientShowInfo">
              <FaLocationArrow className="clientShowIcon" />
              <span className="clientShowInfoTitle">{data.businessAddress}</span>
            </div>
            <div className="clientShowInfo">
              <FaHouzz className="clientShowIcon" />
              <span className="clientShowInfoTitle">{data.esMayorista ? "Es Mayorista" : "Es Minorista"}</span>
            </div>
            <div className="clientShowInfo">
              <FaChrome className="clientShowIcon" />
              <span className="clientShowInfoTitle">{data.slug}</span>
            </div>           

            <span className="clientShowTitle">Contacto</span>
            <div className="clientShowInfo">
              <FaMobileAlt className="clientShowIcon" />
              <span className="clientShowInfoTitle">{data.cellPhone}</span>
            </div>
            <div className="clientShowInfo">
              <FaPhoneAlt className="clientShowIcon" />
              <span className="clientShowInfoTitle">{data.fixedPhone}</span>
            </div>
            <div className="clientShowInfo">
              <FaEnvelope className="clientShowIcon" />
              <span className="clientShowInfoTitle">{data.email}</span>
            </div>
          </div>
        </div>
        <div className="clientUpdate">
          <span className="clientUpdateTitle">Editar</span>

          <form className="clientUpdateForm" onSubmit={handleSubmit}>
            <div className="clientUpdateLeft">
              <div className="clientUpdateItem">
                <label>SKU *</label>
                <input
                  type="text"
                  placeholder={data.sku}
                  className="clientUpdateInput"                  
                  onChange={handleChange}
                  name="sku"
                  value={data.sku || ''}
                  required
                  onInvalid={e=> e.target.setCustomValidity('El SKU debe tener por lo menos 1 caracter')} 
                  onInput={e=> e.target.setCustomValidity('')} 
                  minLength="1"
                  maxLength="5"
                />
              </div>              
              <div className="clientUpdateItem">
                <label>Negocio *</label>
                <input
                  type="text"
                  placeholder={data.businessName}
                  className="clientUpdateInput"                  
                  onChange={handleChange}
                  name="businessName"
                  value={data.businessName || ''}
                  required
                  onInvalid={e=> e.target.setCustomValidity('El Nombre del Negocio debe tener entre 5 y 80 caracteres')} 
                  onInput={e=> e.target.setCustomValidity('')} 
                  minLength="5"
                  maxLength="80"
                />
              </div>
              <div className="clientUpdateItem">
                <label>Contacto *</label>
                <input
                  type="text"
                  placeholder={data.ownerName}
                  className="clientUpdateInput"
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
              <div className="clientUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  placeholder={data.email}
                  className="clientUpdateInput"
                  onChange={handleChange}
                  name="email"
                  value={data.email || ''}                  
                />
              </div>
              <div className="clientUpdateItem">
                <label>Celular</label>
                <input
                  type="text"
                  placeholder={data.cellPhone}
                  className="clientUpdateInput"
                  onChange={handleChange}
                  name="cellPhone"
                  value={data.cellPhone || ''}  
                  onInvalid={e=> e.target.setCustomValidity('El Número de Celular debe ser menor a 20 caracteres')} 
                  onInput={e=> e.target.setCustomValidity('')} 
                  maxLength="20"                
                />
              </div>
              <div className="clientUpdateItem">
                <label>Teléfono Fijo</label>
                <input
                  type="text"
                  placeholder={data.fixedPhone}
                  className="clientUpdateInput"
                  onChange={handleChange}
                  name="fixedPhone"
                  value={data.fixedPhone || ''} 
                  onInvalid={e=> e.target.setCustomValidity('El Número de Teléfono debe ser menor a 20 caracteres')} 
                  onInput={e=> e.target.setCustomValidity('')} 
                  maxLength="20"                                   
                />
              </div>              
              <div className="clientUpdateItem">
                <label>Dirección</label>
                <input
                  type="text"
                  placeholder={data.businessAddress}
                  className="clientUpdateInput"
                  onChange={handleChange}
                  name="businessAddress"
                  value={data.businessAddress || ''}   
                  onInvalid={e=> e.target.setCustomValidity('La Dirección debe tener menos de 100 caracteres')} 
                  onInput={e=> e.target.setCustomValidity('')} 
                  maxLength="100"               
                />
              </div>
              
              <div className="clientUpdateItem">
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
              {/* <div className="clientUpdateItem">
                <label>Es Mayorista</label>
                <select className="newClientSelect" name="esmayorista" id="esmayorista">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div> */}

              {/* <input
                type="text"
                placeholder={data.imageCover}
                onChange={handleChange}
                name="imageCover"
                value={data.imageCover}
            /> */}
            </div>
            <div className="clientUpdateRight">
              <div className="clientUpdateUpload">
                <img
                  className="clientUpdateImg"
                  src={`/img/clients/${data.imageCover}`}
                  alt=""
                />
                <label htmlFor="photo">
                  <FaCloudUploadAlt className="clientUpdateIcon__upload" />
                </label>
                <input  type="file" 
                        accept="image/*" 
                        id="photo" 
                        name="photo" 
                        style={{ display: "none" }} 
                        onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button className="clientUpdateButton" disabled={isSaving}>{isSaving ? 'Grabando...' : 'Actualizar'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
