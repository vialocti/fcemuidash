import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, Logout } from "@mui/icons-material";
import React, { useState } from "react";

//import { getAuth, signOut } from "firebase/auth"; esto hay que habilitar
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

const NavigationBar = ({onLogout, user}) => {
const esAdmin = user?.email === "staff_dash@fce.uncu.edu.ar"


 
  
 // const auth = getAuth(); esto tambien
  const [anchorE1, setAnchorE1] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const [anchorE4, setAnchorE4] = useState(null);
  const [anchorE5, setAnchorE5] = useState(null);
  const [anchorE6, setAnchorE6] = useState(null);
  const [anchorE7, setAnchorE7] = useState(null);
  const [anchorE8, setAnchorE8] = useState(null);
  //const [anchorE9, setAnchorE9] = useState(null);


  const open = Boolean(anchorE1);
  const open1 = Boolean(anchorE2);
  const open2 = Boolean(anchorE3);
  const open3 = Boolean(anchorE4);
  const open4 = Boolean(anchorE5);
  const open5 = Boolean(anchorE6);
  const open6 = Boolean(anchorE7);
  const open7 = Boolean(anchorE8);
  //const open8 = Boolean(anchorE9);


  const onHandleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };
  const onHandleClickI = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const onHandleClickA = (event) => {
    setAnchorE3(event.currentTarget);
  };
  const onHandleClickE = (event) => {
    setAnchorE4(event.currentTarget);
  };
  const onHandleClickP = (event) => {
    setAnchorE5(event.currentTarget);
  };

  const onHandleClickC = (event) => {
    setAnchorE6(event.currentTarget);
  };

  const onHandleClickR = (event) => {
    setAnchorE7(event.currentTarget);
  };
  const onHandleClickM = (event) => {
    setAnchorE8(event.currentTarget);
  };
  /*
  const onHandleClickCAI = (event) => {
    setAnchorE9(event.currentTarget);
  };

*/
  const handleOnClose = () => {
    setAnchorE1(null);
    setAnchorE2(null);
    setAnchorE3(null);
    setAnchorE4(null);
    setAnchorE5(null);
    setAnchorE6(null);
    setAnchorE7(null);
    setAnchorE8(null);
//    setAnchorE9(null);

  };
/* esto tambien
  const handleLogout =async ()=>{
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  }
    */
  return (
    <AppBar  position="static" color="primary" enableColorOnDark sx={{mb:1, height: 50, minHeight: 50 }}>
      <Toolbar sx={{ minHeight: '50px',justifyContent: 'center' }}>
        <Typography variant="h7" sx={{mr:5}}>FCE-DASH</Typography>
        
        <Box>
      
          <Button color="inherit" component={NavLink} to={"/"} sx={{
        fontSize: '0.9rem',     // más chico
        textTransform: 'none',   // evitar mayúsculas automáticas
        padding: '2px 8px',      // más compacto
      }}>
            Inicio
          </Button>

          
          
          {esAdmin && (<>
          <Button
            id="btn-inscriptos"
            color="inherit"
            onClick={onHandleClick}
            aria-controls={open ? "mnu-inscriptos" : undefined}
            ria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
            sx={{
              fontSize: '0.9rem',     // más chico
              textTransform: 'none',   // evitar mayúsculas automáticas
              padding: '2px 8px',      // más compacto
            }}
            
          >
            Aspirantes
          </Button>
          <Menu
            id="mnu-inscriptos"
            anchorEl={anchorE1}
            open={open}
            MenuListProps={{
              "aria-labelledby": "btn-inscriptos",
            }}
            onClose={handleOnClose}
          >
            <MenuItem
              component={NavLink}
              to={"/inscriptos"}
              onClick={handleOnClose}
            >
              Aspirantes Año
            </MenuItem>
            <MenuItem
              component={NavLink}
              to={"/inscriptosanios"}
              onClick={handleOnClose}
            >
              Comparativa Aspirantes Años
            </MenuItem>
            <MenuItem
              component={NavLink}
              to={"/compaaspingre"}
              onClick={handleOnClose}
            >
              Comparativa Aspirantes-Ingresantes
            </MenuItem>
          </Menu>

          <Button
            id="btn-ingresantes"
            color="inherit"
            onClick={onHandleClickI}
            aria-controls={open1 ? "mnu-ingresantes" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
            sx={{
              fontSize: '0.9rem',     // más chico
              textTransform: 'none',   // evitar mayúsculas automáticas
              padding: '2px 8px',      // más compacto
            }}
          >
            Ingresantes
          </Button>
          <Menu
            id="mnu-ingresantes"
            anchorEl={anchorE2}
            open={open1}
            MenuListProps={{
              "aria-labelledby": "btn-ingresantes",
            }}
            onClose={handleOnClose}
          >
            <MenuItem
              component={NavLink}
              to={"/ingresantes"}
              onClick={handleOnClose}
            >
              Ingresantes Año
            </MenuItem>
            <MenuItem
              component={NavLink}
              to={"/ingresantesanios"}
              onClick={handleOnClose}
            >
              Comparativa Ingresantes Años
            </MenuItem>
          </Menu>

        
          {/**Alumnos */}
          <Button
            id="btn-alumnos"
            color="inherit"
            onClick={onHandleClickA}
            aria-controls={open2 ? "mnu-alumnos" : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
            sx={{
              fontSize: '0.9rem',     // más chico
              textTransform: 'none',   // evitar mayúsculas automáticas
              padding: '2px 8px',      // más compacto
            }}
          >
            Estudiantes
          </Button>
          <Menu
            id="mnu-alumnos"
            anchorEl={anchorE3}
            open={open2}
            MenuListProps={{
              "aria-labelledby": "btn-alumnos",
            }}
            onClose={handleOnClose}
          >
            <MenuItem
              component={NavLink}
              to={"/alumnos"}
              onClick={handleOnClose}
            >
              Estudiantes Activos
            </MenuItem>
            <MenuItem
              component={NavLink}
              to={"/cohortedesme"}
              onClick={handleOnClose}
            >
              Desgranamiento Cohorte
            </MenuItem>
            <MenuItem
               component={NavLink}
               to={"/consuopenai"}
               onClick={handleOnClose}
            >
              Consulta Alumnos Info
            </MenuItem>
            <MenuItem
              component={NavLink}
              to={"/aluinfouno"}
              onClick={handleOnClose}
            >
             Coef. Tiempo Estudiantes 
            </MenuItem>

          
          </Menu>
          </>)}
 {/*Cursadas*/}
          <Button
            id="btn-cursadas"
            color="inherit"
            onClick={onHandleClickC}
            aria-controls={open5 ? "mnu-cursadas" : undefined}
            aria-haspopup="true"
            aria-expanded={open5 ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
            sx={{
              fontSize: '0.9rem',     // más chico
              textTransform: 'none',   // evitar mayúsculas automáticas
              padding: '2px 8px',      // más compacto
            }}
          >
            Cursadas
          </Button>
          <Menu
            id="mnu-cursadas"
            anchorEl={anchorE6}
            open={open5}
            MenuListProps={{
              "aria-labelledby": "btn-egresados",
            }}
            onClose={handleOnClose}
          >
            <MenuItem
              component={NavLink}
              to={"/inscripcionesComi"}
              onClick={handleOnClose}
            >Inscripciones Sede </MenuItem>

           <MenuItem component={NavLink} to={"/comparativaInsc"} onClick={handleOnClose}>
              Comparativa Inscripciones Actividad
            </MenuItem>
           
            <MenuItem component={NavLink} to={"/infocursadalistado"} onClick={handleOnClose}>
              Listado Inscriptos Comision
            </MenuItem>

            <MenuItem
              component={NavLink}
              to={"/comisionescursadaanio"}
              onClick={handleOnClose}
            >
              Resultado por Actividad
            </MenuItem>
            
            <MenuItem
              component={NavLink}
              to={"/aprobadasanioprimer"}
              onClick={handleOnClose}
            >
              Aprobadas Año Lectivo(1er)
            </MenuItem>
            
            

          </Menu>
       {esAdmin && (<>
          
           {/*examenes*/}
           <Button
            id="btn-examenes"
            color="inherit"
            onClick={onHandleClickM}
            aria-controls={open7 ? "mnu-examenes" : undefined}
            aria-haspopup="true"
            aria-expanded={open7 ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
            sx={{
              fontSize: '0.9rem',     // más chico
              textTransform: 'none',   // evitar mayúsculas automáticas
              padding: '2px 8px',      // más compacto
            }}
          >
            Examenes
          </Button>
          <Menu
            id="mnu-examenes"
            anchorEl={anchorE8}
            open={open7}
            MenuListProps={{
              "aria-labelledby": "btn-egresados",
            }}
            onClose={handleOnClose}
          >
            <MenuItem
              component={NavLink}
              to={"/reporteexamenes"}
              onClick={handleOnClose}
            >Examenes Mesa</MenuItem>

           <MenuItem component={NavLink} to={"/reporteexamenescp"} onClick={handleOnClose}>
              Comparativa Turnos Examen
            </MenuItem>
           
            <MenuItem
              component={NavLink}
              to={"/reporteepocasexamen"}
              onClick={handleOnClose}
            >
              Resultados Examenes Periodo
            </MenuItem>
                       

          </Menu>

          {/* Egresados*/}
          <Button
            id="btn-egresados"
            color="inherit"
            onClick={onHandleClickE}
            aria-controls={open3 ? "mnu-egresados" : undefined}
            aria-haspopup="true"
            aria-expanded={open3 ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
            sx={{
              fontSize: '0.9rem',     // más chico
              textTransform: 'none',   // evitar mayúsculas automáticas
              padding: '2px 8px',      // más compacto
            }}
          >
            Egresados
          </Button>
          <Menu
            id="mnu-egresados"
            anchorEl={anchorE4}
            open={open3}
            MenuListProps={{
              "aria-labelledby": "btn-egresados",
            }}
            onClose={handleOnClose}
          >
            <MenuItem
              component={NavLink}
              to={"/egreaniocarrera"}
              onClick={handleOnClose}
            >
              Egresados Año
            </MenuItem>
            <MenuItem
              component={NavLink}
              to={"/egreanios"}
              onClick={handleOnClose}
            >
              Comparativa Egresados Años
            </MenuItem>
            <MenuItem
              component={NavLink}
              to={"/egreanioscar"}
              onClick={handleOnClose}
            >
              Comparativa Egresados Carrera/Sexo Años
            </MenuItem>
          </Menu>

         


           



          {/*Rendimientos*/}
          <Button
            id="btn-rendimiento"
            color="inherit"
            onClick={onHandleClickR}
            aria-controls={open6 ? "mnu-rendimiento" : undefined}
            aria-haspopup="true"
            aria-expanded={open6 ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
            sx={{
              fontSize: '0.9rem',     // más chico
              textTransform: 'none',   // evitar mayúsculas automáticas
              padding: '2px 8px',      // más compacto
            }}
          >
            Datos Historicos
          </Button>
          <Menu
            id="mnu-rendimiento"
            anchorEl={anchorE7}
            open={open6}
            MenuListProps={{
              "aria-labelledby": "btn-rendimiento",
            }}
            onClose={handleOnClose}
          >

            <MenuItem
                component={NavLink}
                to={"/indicetotperiodo"}
                onClick={handleOnClose}
              >
                Historicos Indices Periodo
            </MenuItem>
            <MenuItem
                component={NavLink}
                to={"/historicoresuActividad"}
                onClick={handleOnClose}
              >
                Historicos Resultado Actividad
            </MenuItem>
            <MenuItem
              component={NavLink}
              to={"/historicosAprobadas"}
              onClick={handleOnClose}
            >
              Historicos Aprobadas 1er Año
            </MenuItem>



           
          </Menu>

          {/*Personas*/}
          <Button
            id="btn-personal"
            color="inherit"
            onClick={onHandleClickP}
            aria-controls={open4 ? "mnu-personal" : undefined}
            aria-haspopup="true"
            aria-expanded={open4 ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
            sx={{
              fontSize: '0.9rem',     // más chico
              textTransform: 'none',   // evitar mayúsculas automáticas
              padding: '2px 8px',      // más compacto
            }}
          >
            Reportes
          </Button>
          <Menu
            id="mnu-personal"
            anchorEl={anchorE5}
            open={open4}
            MenuListProps={{
              "aria-labelledby": "btn-egresados",
            }}
            onClose={handleOnClose}
          >
            <MenuItem
              component={NavLink}
              to={"/aprobadasprimerreport"}
              onClick={handleOnClose}
            >
              Aprobadas Ingresantes
            </MenuItem>

            <MenuItem
              component={NavLink}
              to={"/datosactividadreport"}
              onClick={handleOnClose}
            >
              Datos Actividad Igresantes
            </MenuItem>

                       
            
            <MenuItem
              component={NavLink}
              to={"/listadoaluinfo"}
              onClick={handleOnClose}
            > 
                Alumnos - Rendimiento
            </MenuItem>
           
            <MenuItem
              component={NavLink}
              to={"/reportecomicontacto"}
              onClick={handleOnClose}
            > 
                Indices Comisiones-Contacto
            </MenuItem>

            <MenuItem
              component={NavLink}
              to={"/"}
              onClick={handleOnClose}
            >
              Reporte Periodo Lectivo
            </MenuItem>
            
           
           
          </Menu>
           </>)}
          <Button variant="contained"  color="success" onClick={() => {
                console.log("Cerrar sesión clickeado");
                onLogout();
}}
sx={{
        fontSize: '0.9rem',     // más chico
        textTransform: 'none',   // evitar mayúsculas automáticas
        padding: '2px 8px',      // más compacto
        
      }}>
            Cerrar Sesion
          </Button>



 </Box>


           
          {/**
           *  to={"/reportegeneral"}
          <Button
            id="btn-personal"
            color="inherit"
            onClick={onHandleClickCAI}
            aria-controls={open8 ? "mnu-personal" : undefined}
            aria-haspopup="true"
            aria-expanded={open8 ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
          >
            Consultas AI
          </Button>
           <Menu
             id="mnu-consultaai"
             anchorEl={anchorE9}
             open={open8}
             MenuListProps={{
               "aria-labelledby": "btn-egresados",
             }}
             onClose={handleOnClose}
           >

        

          </Menu>
       
        */}
        {/* Contenedor para empujar el botón a la derecha 
        <Box sx={{ ml: "auto" }}>
          <Button color="secondary" variant="contained" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Box>*/}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
