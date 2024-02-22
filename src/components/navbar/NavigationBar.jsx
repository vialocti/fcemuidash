import { KeyboardArrowDown } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  const [anchorE1, setAnchorE1] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const [anchorE4, setAnchorE4] = useState(null);
  const [anchorE5, setAnchorE5] = useState(null);
  const [anchorE6, setAnchorE6] = useState(null);
  const [anchorE7, setAnchorE7] = useState(null);

  const open = Boolean(anchorE1);
  const open1 = Boolean(anchorE2);
  const open2 = Boolean(anchorE3);
  const open3 = Boolean(anchorE4);
  const open4 = Boolean(anchorE5);
  const open5 = Boolean(anchorE6);
  const open6 = Boolean(anchorE7);

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

  const handleOnClose = () => {
    setAnchorE1(null);
    setAnchorE2(null);
    setAnchorE3(null);
    setAnchorE4(null);
    setAnchorE5(null);
    setAnchorE6(null);
    setAnchorE7(null);
  };
  return (
    <AppBar position="static" color="primary" enableColorOnDark sx={{mb:1,p:1}}>
      <Toolbar>
        <Typography variant="h6">FCE-DASH</Typography>
        <Box>
          <Button color="inherit" component={NavLink} to={"/"}>
            Inicio
          </Button>

          <Button
            id="btn-inscriptos"
            color="inherit"
            onClick={onHandleClick}
            aria-controls={open ? "mnu-inscriptos" : undefined}
            ria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
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

          {/*Cursadas*/}
          <Button
            id="btn-cursadas"
            color="inherit"
            onClick={onHandleClickC}
            aria-controls={open5 ? "mnu-cursadas" : undefined}
            aria-haspopup="true"
            aria-expanded={open5 ? "true" : undefined}
            endIcon={<KeyboardArrowDown />}
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

            <MenuItem
              component={NavLink}
              to={"/infocursadasanio"}
              onClick={handleOnClose}
            >
              Comisiones Año
            </MenuItem>

            <MenuItem
              component={NavLink}
              to={"/comisionescursadaanio"}
              onClick={handleOnClose}
            >
              Resultado por Actividad
            </MenuItem>
            <MenuItem component={NavLink} to={"/"} onClick={handleOnClose}>
              Comparativa Comisiones
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
          >
            Rendimiento Academico
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
              to={"/aluinfouno"}
              onClick={handleOnClose}
            >
              Estudiantes Info Uno
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
          >
            Personal FCE
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
              to={"/presentedia"}
              onClick={handleOnClose}
            >
              Presentes Dia
            </MenuItem>
            <MenuItem
              component={NavLink}
              to={"/meshoras"}
              onClick={handleOnClose}
            >
              Datos Mes
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
