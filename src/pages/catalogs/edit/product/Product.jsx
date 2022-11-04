import "./product.css";

/************************    Material UI    *********************************/
import CalendarToday from "@mui/icons-material/CalendarToday";
import PermIdentity from "@mui/icons-material/PermIdentity";
import Publish from "@mui/icons-material/Publish";
// import LocationSearching from "@mui/icons-material/LocationSearching";
// import MailOutline from "@mui/icons-material/MailOutline";
// import PhoneAndroid from "@mui/icons-material/PhoneAndroid";
/****************************************************************************/

/**************************    Snackbar    **********************************/
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
/****************************************************************************/

/**************************    React    **********************************/
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom";
/****************************************************************************/

import axios from "axios";
// import { stateContext } from '../../context/StateProvider';


export default function Product() {

  /**************************    useRef    **********************************/
  // avoidRerenderFetchProduct evita que se mande llamar dos veces al
  // producto y por lo mismo que se pinte dos veces
  
  const avoidRerenderFetchProduct = useRef(false);
  /**************************************************************************/

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
  // mientras se esta guardando en la BD
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState (true);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensajeSnackBar, setMensajeSnackBar] = useState("");
  
  const [data, setData] = useState(
    {
      productName: "",
      inventarioActual: 0,
      inventarioMinimo: 0,
      priceMenudeo: 0,
      priceMayoreo: 0,
      costo: 0,
      sku: 0
    }
  )
  /*****************************************************************************/

  /**************************    useParams    **********************************/
  // productId es la clave de producto que viene en el URL, me sirve para
  // saber que producto se actualizara en la BD

  const {productId } = useParams();
  /****************************************************************************/

  // const { client } = useContext(stateContext);

  /************************     handleSubmit    *******************************/
  // Aqui guardo la informacion en la BD, puede ser exitoso o haber error
  /****************************************************************************/

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data.priceMayoreo)

    if (isSaving)
      return;

    try {
        setIsSaving(true);

        const formData = new FormData();
        
        formData.append("sku", data.sku);
        formData.append("productName", data.productName);
        formData.append("inventarioActual", data.inventarioActual);
        formData.append("inventarioMinimo", data.inventarioMinimo);
        formData.append("priceMenudeo", data.priceMenudeo);
        formData.append("priceMayoreo", data.priceMayoreo === null || data.priceMayoreo === "" || data.priceMayoreo === undefined ? 0 : data.priceMayoreo);
        formData.append("costo", data.costo);
        formData.append("photo", file);

        const res = await axios({
          withCredentials: true,
          method: 'PATCH',
          // url: `http://127.0.0.1:8000/api/v1/products/${productId}`,
          url: `https://eljuanjo-dulces.herokuapp.com/api/v1/products/${productId}`,
          data: formData
        })
        setIsSaving(false);
        // console.log("res", res);

        if (res.data.status === 'success') {
          // alert ('Logged in succesfully!');
          // console.log(res.data.data.data);
          console.log ('El producto fue actualizado con éxito!');
          setUpdateSuccess(true);
          setMensajeSnackBar("Producto actualizado")
          setOpenSnackbar(true);
        } 
    }
    catch(err) {
      setIsSaving(false);
      setUpdateSuccess(false);
      setMensajeSnackBar("Hubo un error al grabar el producto. Revisa que estes en línea.");
      setOpenSnackbar(true);
      console.log(err);
    }
  }

  /************************     useEffect    *******************************/
  // fetchProduct mandao cargar desde la BD el Producto que me ineteresa
  // actualizar
  /**************************************************************************/

  useEffect (() => {

    if (avoidRerenderFetchProduct.current) {
      return;
    }

    const fetchProduct = async () => {

      // solo debe de cargar datos una vez, osea al cargar la pagina
      avoidRerenderFetchProduct.current = true;

      // console.log("carga lista de productos")

      const res = await axios ({
        withCredentials: true,
        method: 'GET',
        // url: `http://127.0.0.1:8000/api/v1/products/${productId}`
        url: `https://eljuanjo-dulces.herokuapp.com/api/v1/products/${productId}`
      });
      // console.log(res.data.data.data);
      setData(res.data.data.data)
    }

    fetchProduct();
   
  }, [productId]);


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

  /************************     handleNumbers    ****************************/
  // Se encarga de solo aceptar números en la captura de datos
  /**************************************************************************/
  function handleNumbers (e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
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
      {/* <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  // useEffect(()=>{
  //   const elemUpload = document.querySelector('.form__upload');
  //   const elemUserPhoto = document.querySelector('.form__user-photo');
  
  //   // Este código es para Actualizar la foto del User despues de que la seleccionó
  //   // Pero ANTES de darle Save Settings
  //   elemUpload.addEventListener('change', e => {
  //       const file = document.getElementById('photo').files[0];
  //       const reader = new FileReader();
  
  //       reader.onload = e => {
  //           elemUserPhoto.src = e.target.result;
  //       };
  
  //       reader.readAsDataURL(file);
  //   });
  // }, [])

 
  return (
    <div className="product">
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

      <div className="productTitleContainer">
        <h1 className="productTitle">Editar Producto</h1>
        <Link to="/new-product">
          <button className="productAddButton">Crear</button>
        </Link>
      </div>
      <div className="productContainer">
        <div className="productShow">
          <div className="productShowTop">
            <img
              src={`/img/products/${data.imageCover}`}
              alt=""
              className="productShowImg"
            />
            <div className="productShowTopTitle">
              <span className="productShowProductname">{data.productName}</span>
              <span className="productShowProductTitle">SKU: {data.sku}</span>
            </div>
          </div>
          <div className="productShowBottom">
            <span className="productShowTitle">Detalle</span>
            <div className="productShowInfo">
              <PermIdentity className="productShowIcon" />
              <span className="productShowInfoTitle">Inventario Actual: {data.inventarioActual}</span>
            </div>
            <div className="productShowInfo">
              <CalendarToday className="productShowIcon" />
              <span className="productShowInfoTitle">Inventario Mínimo: {data.inventarioMinimo}</span>
            </div>
            <div className="productShowInfo">
              <CalendarToday className="productShowIcon" />
              <span className="productShowInfoTitle">Precio Menudeo: ${data.priceMenudeo}</span>
            </div>           
            <div className="productShowInfo">
              <CalendarToday className="productShowIcon" />
              <span className="productShowInfoTitle">Precio Mayoreo: ${data.priceMayoreo}</span>
            </div> 
            <div className="productShowInfo">
              <CalendarToday className="productShowIcon" />
              <span className="productShowInfoTitle">Costo: ${data.costo}</span>
            </div>             

            {/* <span className="productShowTitle">Contacto</span>
            <div className="productShowInfo">
              <PhoneAndroid className="productShowIcon" />
              <span className="productShowInfoTitle">{data.cellPhone}</span>
            </div>
            <div className="productShowInfo">
              <PhoneAndroid className="productShowIcon" />
              <span className="productShowInfoTitle">{data.fixedPhone}</span>
            </div>
            <div className="productShowInfo">
              <MailOutline className="productShowIcon" />
              <span className="productShowInfoTitle">{data.email}</span>
            </div> */}
          </div>
        </div>
        <div className="productUpdate">
          <span className="productUpdateTitle">Editar</span>

          <form className="productUpdateForm" onSubmit={handleSubmit}>
            <div className="productUpdateLeft">
            <div className="productUpdateItem">
                <label>SKU *</label>
                <input
                  type="text"
                  placeholder={data.sku}
                  className="productUpdateInput"                  
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
              <div className="productUpdateItem">
                <label>Producto *</label>
                <input
                  type="text"
                  placeholder={data.productName}
                  className="productUpdateInput"                  
                  onChange={handleChange}
                  name="productName"
                  value={data.productName || ''}
                  required
                  onInvalid={e=> e.target.setCustomValidity('El Nombre del Producto debe tener entre 5 y 40 caracteres')} 
                  onInput={e=> e.target.setCustomValidity('')} 
                  minLength="5"
                  maxLength="40"
                />
              </div>
              <div className="productUpdateItem">
                <label>Inventario Actual *</label>
                <input
                  type="number" 
                  pattern="/[^0-9]|(?<=\..*)\./g" 
                  step="1" 
                  min="1"
                  max="999999"
                  placeholder={data.inventarioActual}
                  className="productUpdateInput"
                  onChange={handleChange}
                  onKeyPress={(e)=>handleNumbers(e)}
                  name="inventarioActual"
                  value={data.inventarioActual || ''}
                  required
                  onInvalid={e=> e.target.setCustomValidity('Escribe el Inventario Actual')} 
                  onInput={e=> e.target.setCustomValidity('')} 
                />
              </div>
              <div className="productUpdateItem">
                <label>Inventario Minimo *</label>
                <input
                  type="number" 
                  pattern="/[^0-9]|(?<=\..*)\./g" 
                  step="1" 
                  min="1"
                  max="999999"
                  placeholder={data.inventarioMinimo}
                  className="productUpdateInput"
                  onChange={handleChange}
                  onKeyPress={(e)=>handleNumbers(e)}
                  name="inventarioMinimo"
                  value={data.inventarioMinimo || ''}  
                  required         
                  onInvalid={e=> e.target.setCustomValidity('Escribe el Inventario Mínimo')} 
                  onInput={e=> e.target.setCustomValidity('')}                 
                />
              </div>
              <div className="productUpdateItem">
                <label>Precio Menudeo *</label>
                <input
                  type="number" 
                  pattern="/[^0-9.]|(?<=\..*)\./g" 
                  step="0.01" 
                  min="1"
                  max="999999"
                  placeholder={data.priceMenudeo}
                  className="productUpdateInput"
                  onChange={handleChange}
                  onKeyPress={(e)=>handleNumbers(e)}
                  name="priceMenudeo"
                  value={data.priceMenudeo || ''}
                  required 
                  onInvalid={e=> e.target.setCustomValidity('Escribe el Precio al Menudeo')} 
                  onInput={e=> e.target.setCustomValidity('')}                
                />
              </div>
              <div className="productUpdateItem">
                <label>Precio Mayoreo</label>
                <input
                  type="number" 
                  pattern="/[^0-9.]|(?<=\..*)\./g" 
                  step="0.01" 
                  min="1"
                  max="999999"
                  placeholder={data.priceMayoreo}
                  className="productUpdateInput"
                  onChange={handleChange}
                  onKeyPress={(e)=>handleNumbers(e)}
                  name="priceMayoreo"
                  value={data.priceMayoreo || ''}                  
                />
              </div>              
              <div className="productUpdateItem">
                <label>Costo *</label>
                <input
                  type="number" 
                  pattern="/[^0-9.]|(?<=\..*)\./g" 
                  step="0.01" 
                  min="1"
                  max="999999"
                  placeholder={data.costo}
                  className="productUpdateInput"
                  onChange={handleChange}
                  onKeyPress={(e)=>handleNumbers(e)}
                  name="costo"
                  value={data.costo || ''}
                  required 
                  onInvalid={e=> e.target.setCustomValidity('Escribe el Costo del Producto')} 
                  onInput={e=> e.target.setCustomValidity('')}                 
                />
              </div>
            </div>

            <div className="productUpdateRight">
              <div className="productUpdateUpload">
                <img
                  className="productUpdateImg"
                  src={`/img/products/${data.imageCover}`}
                  alt=""
                />
                <label htmlFor="photo">
                  <Publish style={{"fontSize": "3rem", "cursor": "pointer"}} />
                </label>
                <input  type="file" 
                        accept="image/*" 
                        id="photo" 
                        name="photo" 
                        style={{ display: "none" }} 
                        onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button className="productUpdateButton" disabled={isSaving}>{isSaving ? 'Actualizando...' : 'Actualizar'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
