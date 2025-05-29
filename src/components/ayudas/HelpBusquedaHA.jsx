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

const HelpBusquedaHA = () => {
  return (
    <Box sx={{ m: 2, maxWidth: '90%' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Ayuda: Muestra Datos Históricos - Resultado de Actividades
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {/* Columna Izquierda: Resultados */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                Este panel de ayuda te guía para realizar búsquedas en la base de datos sobre resultados históricos de actividades. Los resultados incluyen:
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
                        <strong>Año Inicio</strong> y <strong>Año Final</strong>: Define el intervalo de años para la búsqueda.
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
                        <strong>Tipo de Comisión</strong>: Puede ser <em>Normal</em>, <em>Recursada</em> o <em>Ambas</em>.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <strong>Actividad</strong>: Puedes seleccionar <em>Todas las Actividades</em> o especificar alguna en particular.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Recomendación: Si buscas datos para una actividad específica, es preferible ingresar un intervalo de años (por ejemplo, año inicio y año final) para obtener resultados comparativos. Si deseas ver datos de todas las actividades, se recomienda seleccionar un año en particular.
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
            Con esta información, obtendrás resultados detallados que incluyen los valores absolutos (inscriptos, regulares, libres, promocionados, etc.) y los porcentajes e índices correspondientes, facilitando el análisis histórico de las materias.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HelpBusquedaHA;
