import "./sidebar.css";
import LineStyle from "@mui/icons-material/LineStyle";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Storefront from "@mui/icons-material/Storefront";
import TrendingUp from "@mui/icons-material/TrendingUp";
// import Timeline from "@mui/icons-material/Timeline";
// import PermIdentity from "@mui/icons-material/PermIdentity";
// import BarChart from "@mui/icons-material/BarChart";
// import MailOutline from "@mui/icons-material/MailOutline";
// import DynamicFeed from "@mui/icons-material/DynamicFeed";
// import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
// import WorkOutline from "@mui/icons-material/WorkOutline";
// import Report from "@mui/icons-material/Report";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Transacciones</h3>
          <ul className="sidebarList">      
            <Link to="/search-client" className="link">     
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Ventas
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Compras
            </li>
            {/* <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>        
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Catálogos</h3>
          <ul className="sidebarList">
            <Link to="/clients" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Clientes
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Productos
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li> */}
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reportes
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Reportes</h3>
          <ul className="sidebarList">
            <Link to="/sales/whole-year-sales" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Ventas Anuales
              </li>
            </Link>
            <Link to="/sales/monthly-sales" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Venta Mensuales Por Año
              </li>
            </Link>
            <Link to="/sales/weekly-sales" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Venta Semanales Por Mes
              </li>
            </Link>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Venta por Cliente
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Venta por Producto
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
