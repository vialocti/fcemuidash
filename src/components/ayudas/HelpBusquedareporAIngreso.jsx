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

const HelpBusquedareporAIngreso = () => {
  return (
    <Box sx={{ m: 2, maxWidth: '90%' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Ayuda: Estudiantes Por cantidad de Materias Aprobadas
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {/* Columna Izquierda: Resultados */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                Esta Consulta extrae cantidad de alumnos que aprueban desde 0  a 9 materias, dada una fecha de referencia o ciclo lectivo completo de el año de referencia y el año anterior  
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="• LLO - Licenciatura en Logista" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• CP - Contador Público" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• LA - Licenciatura en Administración" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• LE - Licenciatura en Economia" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Inscriptos - Número de Inscriptos por Propuesta  " />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Promovidos a 2do (valor/porc.) alumnos que pasan a 2do año" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Curso Completo (valor/porc.) alumnos que aprobaron totalidad de materias de 1er año" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• % Diferencia Promocion a 2do, es la diferencia porcentual  absoluta promovidos a 2do, entre los años" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• % Diferencia Curso Completo, es la diferencia porcentual absoluta curso completo, entre años " />
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
                        <strong>Año Ingreso de Referencia</strong>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <strong>Mes</strong>: Mes de referencia para consultar datos.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <strong>Dia</strong>: Dia de referencia para consultar datos.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <strong>Periodo Ciclo Completo</strong>: si esta marcado, se consulta ciclo coompleto, sin importar mes ni dia seleccionado.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Recomendación: Si buscas datos para una fecha específica, toma el recaudo de verificar los turnos de examen.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                El primer cuadro te muestra la informacion del Año de ingreso de referencia
              </Typography>
              <Typography variant="body2" color="textSecondary">
                El segundo cuadro te muestra la informacion del Año anterior al de referencia
              </Typography>
              <Typography variant="body2" color="textSecondary">
                En el tercer cuadro mostramos la diferencia absoluta porcentual
              </Typography>
              <Typography variant="body2" color="textSecondary">
                En la cuarto cuadro se muestran los datos crudos, los cuales se pueden exportar
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Typography variant="body1">
            Recuerda que esta informacion es solo de ingresantes y propuestas, CP(valores unificados) toma sedes Mza y SR, LLogistica(valores unificados) sedes Mza y Este, LA y LE sede Mza .
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HelpBusquedareporAIngreso;
