import "./topbar.css";
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';

import { stateContext } from '../../context/StateProvider';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import {FaHandshake, FaSignOutAlt } from "react-icons/fa";

import { domAnimation, LazyMotion, m } from 'framer-motion';

const logoVariants = {
  hidden: { y: -250 },
  visible: { 
    y: 0,
    transition: { delay: 0.2, type: 'spring', stiffness: 120 }
  },
}

const loginVariants = {
  hidden: { y: -250 },
  visible: { 
    y: 0,
    transition: { delay: 1.5, type: 'spring', stiffness: 280 }
  },
  exit: {
    opacity: 0,
    transition: { delay: .25, duration: .8, ease: 'easeInOut' }
  }
}


export default function Topbar() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser } = useContext(stateContext);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link className="logoLink" to="/">
          <LazyMotion features={domAnimation}>
            <m.div className="topLeft"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="logo">El Juanjo | Dulcería</span>
            </m.div>
          </LazyMotion>
        </Link>
        <div className="topRight">
          {
            
            currentUser && (
            <div className="authStyle">
              <img 
                  src={`/img/users/${currentUser.photo}`} 
                  alt="{currentUser.name}" 
                  className="topAvatar"  
                  // onClick={(e)=>setOpen(true)}
                  onClick={handleClick}
              />
            </div>)
          }
          <LazyMotion features={domAnimation}>
            { !currentUser && (
                <m.div className="authStyle"
                  variants={loginVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link className='loginButton' to="/login">Iniciar sesión</Link>
                </m.div>                
              )
            }
          </LazyMotion>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openMenu}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* <MenuItem>
              <Avatar /> My account
            </MenuItem> */}
            <MenuItem className="menuItem tipografia" >
              <Link className='liga__flex crearPedidoButton' to="/search-client">
                <ListItemIcon>
                  <FaHandshake className="iconos__placeOrder" />
                </ListItemIcon>
                Crear Pedido</Link>
            </MenuItem>

            <MenuItem className="menuItem" >
              <Link className='liga__flex logoutButton' to="/logout">
                <ListItemIcon>
                  <FaSignOutAlt className="iconos__signOut" />
                </ListItemIcon>
                Cerrar Sesión</Link>
            </MenuItem>

            {/* <MenuItem className="tipografia">
              <ListItemIcon>
                <FaHandshake className="iconos__placeOrder" />
              </ListItemIcon>
              Crear Pedido
            </MenuItem> */}
            {/* <MenuItem className="tipografia">
              <ListItemIcon>
                <FaSignOutAlt className="iconos__sigOut" />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem> */}
          </Menu>          
          {/* <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
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
            <MenuItem className="menuItem" onClick={(e)=>setOpen(false)}>
              <Link className='crearPedidoButton' to="/search-client">Crear Pedido</Link>
            </MenuItem>
            
            <MenuItem className="menuItem" onClick={(e)=>setOpen(false)}>
              <Link className='logoutButton' to="/logout">Cerrar Sesión</Link>
            </MenuItem>
            
          </Menu> */}
        </div>
      </div>
    </div>
  );
}
