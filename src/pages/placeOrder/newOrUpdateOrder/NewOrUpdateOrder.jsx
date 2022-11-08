import "./newOrUpdateOrder.css"
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import axios from "axios";

export default function NewOrUpdateOrder() {

  const [ultimosCincoPedidos, setUltimosCincoPedidos] = useState([]);
  /**************************    useRef    **********************************/
  // avoidRerenderFetchClient evita que se mande llamar dos veces al
  // cliente y por lo mismo que se pinte dos veces
  
  const avoidRerenderFetchClient = useRef(false);
  /*****************************************************************************/

  /****************************    useLocation    *****************************/
  // Estos datos del Cliente los obtengo con useLocation los cuales los mandé
  // desde clientFound.jsx

  const {clientId, businessName, cellPhone, esMayorista} = useLocation().state;
  /****************************************************************************/

  useEffect (()=>{

    if (avoidRerenderFetchClient.current) {
      return;
    }

    const fetchUltimosCincoPedidosPorEntregar = async ()=> {
      
      // solo debe de cargar datos una vez, osea al cargar la pagina
      avoidRerenderFetchClient.current = true;

      const res = await axios ({
        withCredentials: true,
        method: 'GET',
        // url: `http://127.0.0.1:8000/api/v1/sales/ultimos-cinco-pedidos-por-entregar/${clientId}`
        url: `https://eljuanjo-dulces.herokuapp.com/api/v1/sales/ultimos-cinco-pedidos-por-entregar/${clientId}`
      });
      // console.log("res",res.data.data.ultimosCincoPedidosPorEntregar);
      setUltimosCincoPedidos(res.data.data.ultimosCincoPedidosPorEntregar);   
    }

    fetchUltimosCincoPedidosPorEntregar ();
  }, [clientId])


  return (
    <div className="newOrUpdateOrder">
      {/* <h2><span>PASO 2: </span>CREA UN NUEVO PEDIDO O SELECCIONA UNO POR ENTREGAR</h2> */}
      <div className="businessInfo">
        <p className="businessInfo__businessName">{businessName}</p>
        <p className="businessInfo__cellPhone">{cellPhone}</p>
        <p className="businessInfo__esMayorista">{esMayorista ? "Mayorista" : "Minorista"}</p>
      </div>

      <div className="ultimosPedidos__container">
        <Link className="linkNuevoPedido" to={{
              // pathname: `/new-order/${clientId}`,
              pathname: `/update-order/client/${clientId}`,
              state: {
                      clientId,
                      businessName, 
                      cellPhone, 
                      esMayorista,
                      usarComponenteComo: "nuevoPedido",
                      // en un nuevo pedido NO uso fecha, solo en actualizar
                      // le paso de todos modos una fecha para que no haya undefined
                      fecha: new Date()
              }
            }}><button className="linkNuevoPedido__button">Nuevo Pedido</button>
        </Link>

        {/* <p className='pedidosPorEntregar__title'>Pedidos Por Entregar por Fecha</p> */}
         
          <div>
            <p className="pedidosPorEntregar__title">Pedidos Por Entregar por Fecha</p>

            <div className="ultimosCincoPedidos_group">
              {ultimosCincoPedidos?.length > 0
              ?              
                ultimosCincoPedidos.map((current, index) =>  

                  
                    <Link key={index} className="linkNuevoPedido" to={{
                      pathname: `/update-order/client/${clientId}`,
                      state: {
                              clientId: clientId,
                              businessName: businessName, 
                              cellPhone: cellPhone, 
                              esMayorista: esMayorista,
                              fecha: current._id.Fecha,
                              usarComponenteComo: "actualizarPedido"
                      }
                    }}>
                      <button className='linkActualizarPedido__button'>{
                        // current._id.Fecha
                        (new Date (current._id.Fecha)).toString()
                        }
                      </button> 
                    </Link>
                  
                )
              : <p className="pedidosPorEntregar__nohay">No hay Pedidos por Entregar</p> 
              }
            </div>              

          </div>
        
      </div>
    </div>
  )
}
