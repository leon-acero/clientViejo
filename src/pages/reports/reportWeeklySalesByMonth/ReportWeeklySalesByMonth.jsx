import "./reportWeeklySalesByMonth.css"

import React, { useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios" 
import Chart from '../../../components/chart/Chart';
import { format } from 'date-fns'


export default function ReportWeeklySalesByMonth() {

  /************************    useRef    ********************************* /
  // Agregué estos dos useRefs porque en React18 se hace un re-render
  // doble en useEffect, debido al StrictMode y esto causaba que la llamada a axios 
  // se hiciera DOS VECES lo que causaba ir al server dos veces
  // con esto lo corregi pero al parecer tambien puedo usar Suspense,
  // state Machine, Remix, NextJS, o usar un State Manager con Store y Dispatch
  // checa:
  //        https://www.youtube.com/watch?v=HPoC-k7Rxwo&ab_channel=RealWorldReact
  ************************     useRef    *********************************/ 

  const avoidRerenderFetchVentasDelNegocio = useRef(false);

  /************************    useState    *********************************/
  // chartData es la informacion del chart
  // totalAcumulado es el totalAcumulado de Ventas en todo el Año
  // dateRange es el Rango de Fechas que quiero consultar
  // startDate es la fecha de comienzo de busqueda
  // endDate es la fecha de término de búsqueda

  const [chartData, setChartData] = useState ([]);
  const [totalAcumulado, setTotalAcumulado] = useState (0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  /************************     useState    *********************************/ 


  /************************     useEffect    *********************************/
  // 
  // fetchVentasDelNegocio carga la informacion que se mostrará en el Chart,
  // el total de Ventas del Año, el año más actual con Ventas
  /**************************    useEffect    ******************************* */

  useEffect (() => {

    const fetchVentasDelNegocio = async () => {

      // console.log("useEffect")

      if (avoidRerenderFetchVentasDelNegocio.current) {
        return;
      }

      // con este if me aseguro que se mande llamar axios SOLO si 
      // year tiene valor, ya que al cargar la pagina empieza con undefined
      // y es solo hasta que cargo los años con fetchYearsSales que
      // puede year tener un valor válido
      // Deberia haber una mejor manera de validar esto
      if (startDate !== null && endDate !== null) {

        avoidRerenderFetchVentasDelNegocio.current = true;

        // console.log("axios carga de ventas del negocio");

        const res = await axios ({
          withCredentials: true,
          method: 'GET',
          // url: `http://127.0.0.1:8000/api/v1/sales/weekly-sales/${year}/${month}`
          // url: `http://127.0.0.1:8000/api/v1/sales/weekly-sales/2022/9`

          url: `http://127.0.0.1:8000/api/v1/sales//weekly-range-sales/${format(startDate, "yyyy-MM-dd")}/${format(endDate, "yyyy-MM-dd")}`
          // url: `https://eljuanjo-dulces.herokuapp.com/api/v1/sales//weekly-range-sales/${format(startDate, "yyyy-MM-dd")}/${format(endDate, "yyyy-MM-dd")}`
        });

        // console.log(res)
        // console.log(res.data.data.ventasPorSemana);

        // console.log("carga ventas del negocio", res.data.data.ventasPorMes)
        setTotalAcumulado(res.data.totalAcumulado)
        setChartData(res.data.data.ventasPorSemana);
        // console.log("request finished de carga ventas del negocio")

      }
    }
    fetchVentasDelNegocio();
  }, [startDate, endDate]);
  /////////////////////////////////////////////////////////////////////////////
  

  const handleChangeDatePicker = (update) => {
    setDateRange(update)
    avoidRerenderFetchVentasDelNegocio.current = false;
  }

  // console.log("ReportWeeklySalesByMonth render")


  return (
    <div className='reporte'>
    
      <DatePicker className="datePicker"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => handleChangeDatePicker(update)}
        dateFormat="yyyy-MMM-dd" 
      />
      <Chart data={chartData} title={`Venta Acumulada $${totalAcumulado}`} grid dataKey="SubTotal"/>
    </div>
  )
}
