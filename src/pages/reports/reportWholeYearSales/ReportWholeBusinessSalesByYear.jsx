import React, { useEffect, useRef, useState } from 'react'
import "./reportWholeBusinessSalesByYear.css"
import axios from "axios"
import Chart from '../../../components/chart/Chart';


export default function ReportWholeBusinessSalesByYear() {

  // console.log("ReportWholeBusinessSalesByYear started")


  /************************    useRef    ********************************* 
  // Agregué este useRef porque en React18 se hace un re-render
  // doble en useEffect, debido al StrictMode y esto causaba que la llamada a axios 
  // se hiciera DOS VECES lo que causaba ir al server dos veces
  // con esto lo corregi pero al parecer tambien puedo usar Suspense,
  // state Machine, Remix, NextJS, o usar un State Manager con Store y Dispatch
  // checa:
  //        https://www.youtube.com/watch?v=HPoC-k7Rxwo&ab_channel=RealWorldReact
  ************************     useRef    *********************************/ 

  const avoidRerenderFetchVentasDelNegocio = useRef(false);


  /************************    useState    ********************************* 
  // chartData es la informacion del chart
  // granTotal es el Total de Ventas en toda la existencia de la Empresa
  ************************     useState    *********************************/ 

  const [chartData, setChartData] = useState ([]);
  const [granTotal, setGranTotal] = useState (0);
  /////////////////////////////////////////////////////////////////////////////


  /************************     useEffect    ********************************* 
  // fetchVentasDelNegocio carga la informacion que se mostrará en el Chart,
  // el total de Ventas del Año, el año más actual con Ventas
  **************************    useEffect    ******************************* */


  useEffect (() => {

    const fetchVentasDelNegocio = async () => {

      if (avoidRerenderFetchVentasDelNegocio.current) {
        return;
      }

      avoidRerenderFetchVentasDelNegocio.current = true;

      // console.log("axios carga de ventas del negocio");

      const res = await axios ({
        withCredentials: true,
        method: 'GET',
        // url: `http://127.0.0.1:8000/api/v1/sales/whole-business-sales-by-year`
        url: `https://eljuanjo-dulces.herokuapp.com/api/v1/sales/whole-business-sales-by-year`
      });

      // console.log(res)
      // console.log(res.data.data);
      // let totalEmpresa = 0;

      // const graph = res.data.data.ventaTotalPorAnio.map(current=> {
                  
      //   totalEmpresa += current.Total;

      //   return {
      //     name: current.Fecha.anio,
      //     Total: current.Total
      //   }
      // })

      // console.log("graph",graph)
      // console.log("Total",totalEmpresa)

      // console.log("carga ventas del negocio", res.data.data.ventasPorMes)
      setGranTotal(res.data.totalEmpresa)
      setChartData(res.data.data.ventaTotalPorAnio);
      // console.log("request finished de carga ventas del negocio")
      
    }
    fetchVentasDelNegocio();
  },[]);
  /////////////////////////////////////////////////////////////////////////////


  // console.log("ReportWholeBusinessSalesByYear render")

  const out = (
    <div className='reporte'>
      <Chart data={chartData} title={`Venta $${granTotal}`} grid dataKey="Total"/>
    </div>
  )

  // console.log("ReportWholeBusinessSalesByYear finished")

  return out;
}
