import React from "react";
import { Box, Card, CardContent, Typography, Divider, List, ListItem, ListItemText, Container, Grid } from "@mui/material";

const HelpPanelInscriptosActividadesPropuestas = () => {
  return (
    <Container maxWidth='null'>
     <Grid container sx={{p:4}}> 
     <Grid xs={12} md={6}>
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Ayuda: Inscriptos a Cursada por sede y Propuesta
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" gutterBottom>
            Se mostrara información referida a las inscripciones de un año en las diferentes comisiones 
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Muestra inscripciones por cada una de las comisiones " />
            </ListItem>
            <ListItem>
              <ListItemText primary="podemos elegir sede y propuesta o sede y todas las propuestas caso MZA" />
            </ListItem>
            <ListItem>
              <ListItemText primary="" />
            </ListItem>
            
            
          </List>
          <Typography variant="body1">
            Debe seleccionar el año de referencia y la sede y la propuesta o todas, luego pulsar Aceptar.
          </Typography>      
          <Typography variant="body1">
            Se generan un listado de comisiones de las actividades que tienen inscriptos
          </Typography>   
       
          <Typography variant="body1">
           una vez mostrado el listado se puede seleccionar una actividad en particular ingresando el el campo denominado Actividad.
          </Typography>
          <Typography variant="body1">
            IMPORTANTE:las inscripciones que se muestran son las incripciones que estan provisorias si estamos en un periodo de inscripcion y definitivas luego del proceso de  confirmacion o rechazo 
          </Typography>
        </CardContent>
      </Card>
    </Box>
    </Grid>
    <Grid xs={12} md={6}>

    <Box>
       <Card variant="outlined">
         <CardContent>
           <List>
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
                     <hr />
                   </>
                 }
               />
             </ListItem>
           </List>
           <Typography variant="body2" color="textSecondary" gutterBottom>
             Por ejemplo.
           </Typography>
           <Divider sx={{ mt: 2, mb: 2 }} />
           <Typography variant="body1">
             La tabla se puede exportar a CSV para realizar análisis adicionales.
           </Typography>
         </CardContent>
       </Card>
     </Box>
     </Grid>

     </Grid>
     </Container>
  );
};

export default HelpPanelInscriptosActividadesPropuestas;
