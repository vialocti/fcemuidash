import React from "react";
import { Box, Card, CardContent, Typography, Divider, List, ListItem, ListItemText, Container, Grid } from "@mui/material";

const HelpPanelInscriptos = () => {
  return (
    <Container maxWidth='null'>
     <Grid container sx={{p:4}}> 
     <Grid xs={12} md={6}>
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Ayuda: Inscriptos a Cursada
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" gutterBottom>
            Se mostrara información referida a las inscripciones de un año y sede de referencia
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Muestra inscripciones por cada una de las actividades " />
            </ListItem>
            <ListItem>
              <ListItemText primary="A demas por cada actividad muestra los porcentajes de inscripciones definitivas de los ultimos cuatro años" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Tambien se muestra una tabla de valores primarios, la cual se puede exportar para verificar los porcentajes mostrados " />
            </ListItem>
            
            
          </List>
          <Typography variant="body1">
            Debe seleccionar el año de referencia y la sede, luego pulsar Aceptar.
          </Typography>      
          <Typography variant="body1">
            Se generan dos muestras una con los datos de inscriptos y los porcentajes de aceptados de los años anteriores, un promedio de aceptacion y un pronostico para el año  y otra mas abajo que muestra valores absolutos de 
            aceptados y rechazados,
          </Typography>   
       
          <Typography variant="body1">
            Las tablas se adaptan dinámicamente a los años disponibles y permiten una exportación sencilla a CSV para realizar análisis adicionales.
          </Typography>
          <Typography variant="body1">
            IMPORTANTE:las inscripciones del año de referencia tiene todas las inscripciones (aceptadas, de baja y rechazadas).
            aceptadas cuando es un año cerrado, si es el actual son inscripciones provisorias
          </Typography>
        </CardContent>
      </Card>
    </Box>
    </Grid>
    <Grid xs={12} md={6}>

    <Box>
       <Card variant="outlined">
         <CardContent>
           <Typography variant="h5" gutterBottom>
             Ayuda: Muestra de Información
           </Typography>
           <Divider sx={{ mb: 2 }} />
           <Typography variant="body1" gutterBottom>
             Este panel muestra información detallada sobre los inscriptos y el porcentaje de aceptados por actividad. La tabla se genera dinámicamente y permite:
           </Typography>
           <List>
             <ListItem>
               <ListItemText primary="Ordenar los datos por actividad u otras columnas." />
             </ListItem>
             <ListItem>
               <ListItemText primary="Desplazarse verticalmente (scroll) en caso de haber muchas filas." />
             </ListItem>
             <ListItem>
               <ListItemText primary="Exportar los datos a CSV para un análisis posterior." />
             </ListItem>
           </List>
           <Typography variant="body1" gutterBottom>
             <strong>Columnas clave de la tabla:</strong>
           </Typography>
           <List dense>
             <ListItem>
               <ListItemText
                 primary={
                   <>
                     <strong>Actividad:</strong> Nombre de la asignatura.
                   </>
                 }
               />
             </ListItem>
             <ListItem>
               <ListItemText
                 primary={
                   <>
                     <strong>Incriptos:</strong> Número total de inscriptos en el año de referencia.
                   </>
                 }
               />
             </ListItem>
             <ListItem>
               <ListItemText
                 primary={
                   <>
                     <strong>% Aceptados [Año]:</strong> Calculado como el número de inscriptos aprobados dividido por la suma de aprobados y rechazados para ese año, expresado en porcentaje.
                   </>
                 }
               />
             </ListItem>
           </List>
           <Typography variant="body2" color="textSecondary" gutterBottom>
             Por ejemplo, si para el año 2022 se tienen 83 aceptados y 40 rechazados, el porcentaje de aceptados se calcula como (83 / (83 + 40)) * 100 ≈ 67.60%.
           </Typography>
           <Divider sx={{ mt: 2, mb: 2 }} />
           <Typography variant="body1">
             La tabla se adapta dinámicamente a los años disponibles y permite una exportación sencilla a CSV para realizar análisis adicionales.
           </Typography>
         </CardContent>
       </Card>
     </Box>
     </Grid>

     </Grid>
     </Container>
  );
};

export default HelpPanelInscriptos;
