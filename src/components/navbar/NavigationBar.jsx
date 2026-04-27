import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import {
  KeyboardArrowDown,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Logout
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const NavigationBar = ({ onLogout, user }) => {
  const esAdmin = user?.email === "staff_dash@fce.uncu.edu.ar";

  // --- ESTADOS ---
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(""); // Controla submenús en Mobile
  const [anchorEl, setAnchorEl] = useState({
    estudiantes: null,
    cursadas: null,
    examenes: null,
    egresados: null,
    historicos: null,
    reportes: null,
  });

  // --- HANDLERS ---
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleOpenMenu = (event, menuId) => {
    setAnchorEl({ ...anchorEl, [menuId]: event.currentTarget });
  };

  const handleCloseMenu = () => {
    setAnchorEl({
      estudiantes: null,
      cursadas: null,
      examenes: null,
      egresados: null,
      historicos: null,
      reportes: null,
    });
  };

  const handleMobileSubMenu = (name) => {
    setOpenSubMenu(openSubMenu === name ? "" : name);
  };

  const handleMobileClick = () => {
    setMobileOpen(false);
    setOpenSubMenu("");
  };

  // --- COMPONENTE SUBMENÚ REUTILIZABLE (Para evitar repetir código) ---
  const MenuLink = ({ to, primary, mobile = false }) => (
    <ListItem
      button
      component={NavLink}
      to={to}
      onClick={mobile ? handleMobileClick : handleCloseMenu}
      sx={mobile ? { pl: 4 } : {}}
    >
      {mobile ? <ListItemText primary={primary} /> : primary}
    </ListItem>
  );

  // --- CONTENIDO DEL DRAWER (MOBILE) ---
  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6">FCE-DASH</Typography>
      </Box>
      <List component="nav">
        <ListItem button component={NavLink} to="/" onClick={handleMobileClick}>
          <ListItemText primary="Inicio" />
        </ListItem>

        {esAdmin && (
          <>
            <ListItem button component={NavLink} to="/info-ciclo-lectivo" onClick={handleMobileClick}>
              <ListItemText primary="Ciclo Lectivo" />
            </ListItem>
            <ListItem button component={NavLink} to="/ingresantes" onClick={handleMobileClick}>
              <ListItemText primary="Ingresantes" />
            </ListItem>

            {/* Estudiantes */}
            <ListItem button onClick={() => handleMobileSubMenu("estudiantes")}>
              <ListItemText primary="Estudiantes" />
              {openSubMenu === "estudiantes" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu === "estudiantes"} timeout="auto">
              <List disablePadding>
              <MenuLink to="alumnos-reinscriptos" primary="Reinscripciones" mobile />
                <MenuLink to="/estudiantes-activos" primary="Estudiantes Activos" mobile />
                <MenuLink to="/cohorte-evolucion" primary="Desgranamiento Cohorte" mobile />
                <MenuLink to="/alumnos-coeficiente" primary="Coef. Tiempo Estudiantes" mobile />
              </List>
            </Collapse>
          </>
        )}

        {/* Cursadas */}
        <ListItem button onClick={() => handleMobileSubMenu("cursadas")}>
          <ListItemText primary="Cursadas" />
          {openSubMenu === "cursadas" ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSubMenu === "cursadas"} timeout="auto">
          <List disablePadding>
            <MenuLink to="/inscripcionesComi" primary="Inscripciones Sede" mobile />
            <MenuLink to="/comparativaInsc" primary="Comparativa Actividad" mobile />
            <MenuLink to="/listado-cursada-actividad" primary="Listado Inscriptos" mobile />
            <MenuLink to="/comisiones-cursadas-anio-resultado" primary="Resultado Actividad" mobile />
            <MenuLink to="/aprobadas-carrera-1er-anio" primary="Aprobadas (1er Año)" mobile />
          </List>
        </Collapse>

        {esAdmin && (
          <>
            {/* Exámenes */}
            <ListItem button onClick={() => handleMobileSubMenu("examenes")}>
              <ListItemText primary="Exámenes" />
              {openSubMenu === "examenes" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu === "examenes"} timeout="auto">
              <List disablePadding>
                <MenuLink to="/reporteexamenes" primary="Exámenes Mesa" mobile />
               {/* <MenuLink to="/reporteexamenescp" primary="Comparativa Turnos" mobile /> */}
                <MenuLink to="/epocas-examen-analisis-comparativo" primary="Resultados Período" mobile />
              </List>
            </Collapse>

            {/* Egresados */}
            <ListItem button onClick={() => handleMobileSubMenu("egresados")}>
              <ListItemText primary="Egresados" />
              {openSubMenu === "egresados" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu === "egresados"} timeout="auto">
              <List disablePadding>
                <MenuLink to="/egreaniocarrera" primary="Egresados Año" mobile />
                <MenuLink to="/egreanios" primary="Comparativa Años" mobile />
                <MenuLink to="/egreanioscar" primary="Egresados Carrera/Sexo" mobile />
              </List>
            </Collapse>

            {/* Datos Históricos */}
            <ListItem button onClick={() => handleMobileSubMenu("historicos")}>
              <ListItemText primary="Datos Históricos" />
              {openSubMenu === "historicos" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu === "historicos"} timeout="auto">
              <List disablePadding>
                <MenuLink to="/indicetotperiodo" primary="Índices Período Ciclo" mobile />
                <MenuLink to="/historicoresuActividad" primary="Análisis Actividades" mobile />
                <MenuLink to="/historicosAprobadas" primary="Aprobadas Ingresantes" mobile />
              </List>
            </Collapse>

            {/* Reportes */}
            <ListItem button onClick={() => handleMobileSubMenu("reportes")}>
              <ListItemText primary="Reportes" />
              {openSubMenu === "reportes" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu === "reportes"} timeout="auto">
              <List disablePadding>
                <MenuLink to="/aprobadas-primer-anio-reporte" primary="Comp. Aprobadas Ing." mobile />
                <MenuLink to="/datosactividadreport" primary="Datos Actividad Ing." mobile />
                <MenuLink to="/listado-alumnos-info-rendimiento" primary="Alumnos Rendimiento" mobile />
                <MenuLink to="/reporte-comisiones-contacto" primary="Índices Comisiones" mobile />
              </List>
            </Collapse>
          </>
        )}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button fullWidth variant="outlined" color="error" startIcon={<Logout />} onClick={onLogout}>
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="primary" sx={{ height: 50, top: 0, zIndex: 1100 }}>
        <Toolbar sx={{ minHeight: '50px !important', px: 2 }}>

          {/* BOTÓN HAMBURGUESA - Solo visible en móvil */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: { xs: 1, md: 0 }, mr: 3, fontSize: '1rem' }}>
            FCE-DASH
          </Typography>

          {/* MENÚ DESKTOP - Oculto en móviles */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 0.5 }}>
            <Button color="inherit" component={NavLink} to="/" sx={{ fontSize: '0.8rem', textTransform: 'none' }}>Inicio</Button>

            {esAdmin && (
              <>
                <Button color="inherit" component={NavLink} to="/info-ciclo-lectivo" sx={{ fontSize: '0.8rem', textTransform: 'none' }}>Ciclo Lectivo</Button>
                <Button color="inherit" component={NavLink} to="/ingresantes" sx={{ fontSize: '0.8rem', textTransform: 'none' }}>Ingresantes</Button>

                {/* Estudiantes */}
                <Button color="inherit" endIcon={<KeyboardArrowDown />} onClick={(e) => handleOpenMenu(e, 'estudiantes')} sx={{ fontSize: '0.8rem', textTransform: 'none' }}>Estudiantes</Button>
                <Menu anchorEl={anchorEl.estudiantes} open={Boolean(anchorEl.estudiantes)} onClose={handleCloseMenu}>
                 <MenuItem onClick={handleCloseMenu} component={NavLink} to="/alumnos-reinscriptos">Reinscripciones</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/estudiantes-activos">Estudiantes Activos</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/cohorte-evolucion">Desgranamiento Cohorte</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/alumnos-coeficiente">Coef. Tiempo Estudiantes</MenuItem>
                </Menu>
              </>
            )}

            {/* Cursadas */}
            <Button color="inherit" endIcon={<KeyboardArrowDown />} onClick={(e) => handleOpenMenu(e, 'cursadas')} sx={{ fontSize: '0.8rem', textTransform: 'none' }}>Cursadas</Button>
            <Menu anchorEl={anchorEl.cursadas} open={Boolean(anchorEl.cursadas)} onClose={handleCloseMenu}>
              <MenuItem onClick={handleCloseMenu} component={NavLink} to="/inscripcionesComi">Inscripciones Sede</MenuItem>
              <MenuItem onClick={handleCloseMenu} component={NavLink} to="/comparativaInsc">Comparativa Actividad</MenuItem>
              <MenuItem onClick={handleCloseMenu} component={NavLink} to="/listado-cursada-actividad">Listado Inscriptos</MenuItem>
              <MenuItem onClick={handleCloseMenu} component={NavLink} to="/comisiones-cursadas-anio-resultado">Resultado Actividad</MenuItem>
              <MenuItem onClick={handleCloseMenu} component={NavLink} to="/aprobadas-carrera-1er-anio">Aprobadas Carrera(1er Año)</MenuItem>
            </Menu>

            {esAdmin && (
              <>
                {/* Exámenes */}
                <Button color="inherit" endIcon={<KeyboardArrowDown />} onClick={(e) => handleOpenMenu(e, 'examenes')} sx={{ fontSize: '0.8rem', textTransform: 'none' }}>Exámenes</Button>
                <Menu anchorEl={anchorEl.examenes} open={Boolean(anchorEl.examenes)} onClose={handleCloseMenu}>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/reporteexamenes">Exámenes Mesa</MenuItem>
                 {/* <MenuItem onClick={handleCloseMenu} component={NavLink} to="/reporteexamenescp">Comparativa Turnos</MenuItem> */}
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/epocas-examen-analisis-comparativo">Comparativa Exámenes Período</MenuItem>
                </Menu>

                {/* Egresados */}
                <Button color="inherit" endIcon={<KeyboardArrowDown />} onClick={(e) => handleOpenMenu(e, 'egresados')} sx={{ fontSize: '0.8rem', textTransform: 'none' }}>Egresados</Button>
                <Menu anchorEl={anchorEl.egresados} open={Boolean(anchorEl.egresados)} onClose={handleCloseMenu}>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/egreaniocarrera">Egresados Año</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/egreanios">Comparativa Años</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/egreanioscar">Comparativa Carrera/Sexo</MenuItem>
                </Menu>

                {/* Históricos */}
                <Button color="inherit" endIcon={<KeyboardArrowDown />} onClick={(e) => handleOpenMenu(e, 'historicos')} sx={{ fontSize: '0.8rem', textTransform: 'none' }}>Históricos</Button>
                <Menu anchorEl={anchorEl.historicos} open={Boolean(anchorEl.historicos)} onClose={handleCloseMenu}>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/indicetotperiodo">Índices Período Ciclo</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/historicoresuActividad">Análisis Actividades</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/historicosAprobadas">Aprobadas Ingresantes</MenuItem>
                </Menu>

                {/* Reportes */}
                <Button color="inherit" endIcon={<KeyboardArrowDown />} onClick={(e) => handleOpenMenu(e, 'reportes')} sx={{ fontSize: '0.8rem', textTransform: 'none' }}>Reportes</Button>
                <Menu anchorEl={anchorEl.reportes} open={Boolean(anchorEl.reportes)} onClose={handleCloseMenu}>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/aprobadas-primer-anio-reporte">Comp. Aprobadas Ingresantes</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/datosactividadreport">Datos Actividad Ingresantes</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/listado-alumnos-info-rendimiento">Alumnos - Rendimiento</MenuItem>
                  <MenuItem onClick={handleCloseMenu} component={NavLink} to="/reporte-comisiones-contacto">Índices Comisiones-Contacto</MenuItem>
                </Menu>
              </>
            )}
          </Box>

          <Button
            variant="contained"
            color="success"
            onClick={onLogout}
            sx={{ ml: 2, display: { xs: 'none', md: 'inline-flex' }, fontSize: '0.75rem', textTransform: 'none' }}
          >
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* DRAWER PARA MÓVIL */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavigationBar;