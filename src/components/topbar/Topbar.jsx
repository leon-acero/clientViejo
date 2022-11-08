import "./topbar.css";
import React, { useContext, useState } from "react";

import { stateContext } from '../../context/StateProvider';

import NotificationsNone from "@mui/icons-material/NotificationsNone";
// import Language from "@mui/icons-material/Language";
import Settings from "@mui/icons-material/Settings";
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Menu, MenuItem } from '@mui/material';

export default function Topbar() {

  const [open, setOpen] = useState(false);

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
          {/* <div className="topbarIconContainer">
            <NotificationsNone className="topbarIcon" />
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            <Settings className="topbarIcon" />
          </div> */}
          {
            
            currentUser && (
            <div className="authStyle">
              {/* <Link className='logoutButton' to="/logout">Cerrar sesión</Link> */}

              {/* <Link to="/search-client">
                <img src={`/img/users/${currentUser.photo}`} alt="{currentUser.name}" className="topAvatar"  />
              </Link> */}
              <img 
                  src={`/img/users/${currentUser.photo}`} 
                  alt="{currentUser.name}" 
                  className="topAvatar"  
                  onClick={(e)=>setOpen(true)}
              />
            </div>)
          }
          { !currentUser && (
            <div className="authStyle">
              <Link className='loginButton' to="/login">Iniciar sesión</Link>
              {/* <img src="/img/users/default.jpg" alt="" className="topAvatar" /> */}
            </div>
            )
          }
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            // anchorEl={anchorEl}
            open={open}
            onClose={(e)=>setOpen(false)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {/* <MenuItem className="menuItem">Profile</MenuItem> */}
            <MenuItem className="menuItem" onClick={(e)=>setOpen(false)}>
              <Link className='crearPedidoButton' to="/search-client">Crear Pedido</Link>
            </MenuItem>
            
            <MenuItem className="menuItem" onClick={(e)=>setOpen(false)}>
              <Link className='logoutButton' to="/logout">Cerrar Sesión</Link>
            </MenuItem>
            
          </Menu>
        </div>
      </div>
    </div>
  );
}
