import "./topbar.css";
import React, { useContext } from "react";

import { stateContext } from '../../context/StateProvider';

import NotificationsNone from "@mui/icons-material/NotificationsNone";
// import Language from "@mui/icons-material/Language";
import Settings from "@mui/icons-material/Settings";
import { Link } from 'react-router-dom';

export default function Topbar() {

  const { currentUser } = useContext(stateContext);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link className="logoLink" to="/">
          <div className="topLeft">
            <span className="logo">El Juanjo | Dulcería</span>
          </div>
        </Link>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone className="topbarIcon" />
            <span className="topIconBadge">2</span>
          </div>
          {/* <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer">
            <Settings className="topbarIcon" />
          </div>
          {
            
            currentUser && (
            <div className="authStyle">
              <Link className='logoutButton' to="/logout">Cerrar sesión</Link>
              <img src={`/img/users/${currentUser.photo}`} alt="{currentUser.name}" className="topAvatar"  />
            </div>)
          }
          { !currentUser && (
            <div className="authStyle">
              <Link className='loginButton' to="/login">Iniciar sesión</Link>
              {/* <img src="/img/users/default.jpg" alt="" className="topAvatar" /> */}
            </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
