import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const HelpBusquedaResultadoA = () => {
  return (
    <Box sx={{ m: 2, maxWidth: '90%' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Ayuda: Muestra Resultado de Actividad Seleccionada
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {/* Columna Izquierda: Resultados */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                Este panel de ayuda te guía para realizar búsquedas en la base de datos sobre resultado de la actividad seleccionada. Los resultados incluyen:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="• Inscriptos(Inscrip.)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Regulares(Regul.)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Libres(Libr.) y Libres*(Libr*)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Promocionados(Prom.)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Aprobados en ciclo corto(Apr.CC): cantidad de aprobados en primera mesa posterior fin cursado" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Aprobados en ciclo largo(Apr.CL): cantidad de aprobados en mesas de examen hasta un año despues de fin de cursado" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Índice de cursada(I.Cur): tiene en cuenta regulares y promocionados" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Índice de ciclo corto(I.CCort): tiene en cuenta regulares, promocionados + aprobados ciclo corto" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Índice de ciclo largo(I.Clarg): tiene en cuenta regulares, promocionados + aprobadosciclo corto+aprobados ciclo largo" />
                </ListItem>
              </List>
            </Grid>
            {/* Columna Derecha: Parámetros y Recomendaciones */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                Para ejecutar la búsqueda, deberás ingresar los siguientes parámetros:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <strong>Año</strong> Define el Año de Analisis.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <strong>Sede</strong>: Selecciona la sede sobre la cual se desea filtrar la búsqueda.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <strong>Propuesta</strong>: Seleccionar para que Propuesta en caso de Actividades que esten en mas de una Propuesta.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <strong>Tipo de Comisión</strong>: Puede ser <em>Normal</em>, <em>Recursada</em> o <em>Ambas</em>.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <strong>Actividad</strong>: Actividad que se desea.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Datos de Salida: Muestra resultado total de la actividad, y abajo la informacion de cada una de las comisiones, si hay mas de una en la actividad 
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Importatante: Muestra el año seleccionado y el año anterior para realizar la comparacion, se pueden exportar los datos de las comisiones 
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                (I.Cur)Indice de Cursada = Regul./Inscrip. * 0,7 + Prom./Inscrip. * 0,3
              </Typography>
              <Typography variant="body2" color="textSecondary">
                (I.CCort)Indice de Ciclo Corto = Regul./Inscrip. * 0,7 + (Prom./Inscrip.  +  Apr.CC/Inscrip.) * 0,3
              </Typography>
              <Typography variant="body2" color="textSecondary">
                (I.Larg.)Indice de Ciclo Largo = Regul./Inscrip. * 0,7 + (Prom./Inscrip.  +  Apr.CL/Inscrip) * 0,3
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Typography variant="body1">
            Con esta información, obtendrás resultados detallados que incluyen los valores absolutos (inscriptos, regulares, libres, promocionados, etc.) y los porcentajes e índices correspondientes, facilitando el análisis de cada Actividad.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HelpBusquedaResultadoA;
