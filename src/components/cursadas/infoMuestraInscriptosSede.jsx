import {
  Box,
  Container,
  Grid,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";


const InfoMuestraInscriptosSede = ({ sede, materias, total }) => {

  const [sedeN, setSedeN]=useState('Mendoza')
  const [actividad, setActividad]=useState('')
  const [muestra, setMuestra] = useState(null)

  useEffect(()=>{
    if(sede==='1'){
      setSedeN(' Mendoza')
    }else if(sede==='2'){
      setSedeN(' San Rafael')
      
    }else if(sede==='3'){
      setSedeN(' Gral.Alvear')
    }else if(sede==='4'){
      setSedeN(' Este')
    }
    setActividad('')
    setMuestra(materias)
   

  },[materias,sede])

  
  //console.log(materias)
  const onHandleChange = (event) => {
    
    if (event.target.name === "actividad") {
      setActividad(event.target.value );
    }
    
    let mat=[]
    mat = materias.filter(tb=>tb.nombre.toUpperCase().startsWith(event.target.value.trim().toUpperCase()))
    //console.log(actividad)
    if(mat.length > 0){
      setMuestra(mat)
      //console.log(muestra)
    }else{
      setMuestra(materias)
    }
  };

  
  return (
      

    <Container maxWidth='false' sx={{padding:4}}> 
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Box component="Paper" sx={{ p: 3 }}>
            <Typography variant="h6">Sede:{sedeN}, Total Inscriptos: {total}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box component="Paper" sx={{ p: 3 }}>
          <InputLabel id="actividad">Actividad</InputLabel>

            <TextField
              variant="standard"
              type="text"
              id="actividad"
              name="actividad"
              onChange={onHandleChange}
              value={actividad}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Box component="Paper" sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    
                    <TableCell>Nombre Actividad</TableCell>
                    <TableCell>Comisión</TableCell>
                    <TableCell>Inscriptos</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {muestra
                    ? muestra.map((dato, index) => (
                        <TableRow key={index}>
                          
                          <TableCell>{dato.nombre}</TableCell>
                          <TableCell>{dato.comi}</TableCell>
                          <TableCell>{dato.tot}</TableCell>
                          
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InfoMuestraInscriptosSede;
