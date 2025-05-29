import { useEffect, useState } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, Button,  Container, Grid, Box, Typography, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";

import React from 'react'
import ReportesListadoAlumnosInfo from "../../components/reportes/ReportesListadoAlumnosInfo";






const ListadoAluInfoCompleto = () => {

  const [anioI, setAnioI] = useState("2024");
  const [propuesta, setPropuesta] = useState([]);
  const [materias, setMaterias] = useState("9");
  const [datos, setDatos]=useState(null)

  const [anio, setAnio] = useState("0");
  const [matap, setMatap] = useState("0");
  const [propuestas, setPropuestas] = useState("0");
  
  

  const opcionesPropuestas = [
   
    { label: "CONTADOR PUBLICO", value: "8" },
    { label: "LIC.ADMINISTRACION", value: "2" },
    { label: "LIC. ECONOMIA", value: "3" },
    { label: "LIC. LOGISTICA", value: "7" },
  ];

  const handlePropuestaChange = (event) => {
    setPropuesta(event.target.value);
  };

  const handleSubmit = () => {
    const propuestasString = propuesta.join(",");
    //console.log({ anio, propuestas: propuestasString, matap });
    setDatos({ anioI, propuestas: propuestasString, materias })
  };

  useEffect(()=>{
    if(datos){
    setAnio(datos.anioI)
    setPropuestas(datos.propuestas)
    setMatap(datos.materias)
    //console.log(datos)
    }
  }, [datos])

  useEffect(()=>{

  }, [anio,propuestas,matap])

  return (
    <Container maxWidth='fluid'>

     <Grid container>

     <Box
          sx={{
            display: "flex",
            border: 1,
            borderRadius: 2,
            backgroundColor: "beige",
            width: "97%",
            p: 2,
            flexWrap: "wrap",
          }}
        > 
        <Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>
          <Typography variant="h6" textAlign={"center"}>
            Listado Alumnos Anio,Propuesta, Actividades Aprobadas: Proposito Curso Completo
          </Typography>
        </Grid>

     <Grid item xs={12} md={1} sx={{ mr: 1 }}>
      <TextField
        label="Año"
        type="number"
        value={anioI}
        onChange={(e) => setAnioI(e.target.value)}
        sx={{ flex: 1, minWidth: 100 }}
      />
      </Grid>

      <Grid item xs={12} md={3} sx={{ mr: 1 }}>

      <FormControl sx={{ flex: 2, minWidth: 400 }}>
        <InputLabel>Propuestas</InputLabel>
        <Select
          multiple
          value={propuesta}
          onChange={handlePropuestaChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {opcionesPropuestas.map((opcion) => (
            <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12} md={1} sx={{ mr: 1 }}>
      <TextField
        label="Mat.Apro"
        type="number"
        value={materias}
        onChange={(e) => setMaterias(e.target.value)}
        sx={{ flex: 1, minWidth: 100 }}
      />
      </Grid>

       <Grid item xs={12} md={2} sx={{ mr: 1 }}>
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ height: "100%" }}>
        Consultar
      </Button>
      </Grid>

      <Grid item xs={12} md={12} sx={{ mr: 1 }}>
          <Typography variant="h5">Referencias</Typography>
          <Table size="small" sx={{paddingInline:10}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Propuesta</TableCell>
                        <TableCell>1er Año</TableCell>
                        <TableCell>2do Año</TableCell>
                        <TableCell>3er Año</TableCell>
                        <TableCell>4to Año</TableCell>
                        <TableCell>5to Año</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>CP</TableCell>
                            <TableCell>9</TableCell>
                            <TableCell>19</TableCell>
                            <TableCell>28</TableCell>
                            <TableCell>38</TableCell>
                            <TableCell>46</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>LA</TableCell>
                            <TableCell>9</TableCell>
                            <TableCell>18</TableCell>
                            <TableCell>28</TableCell>
                            <TableCell>37</TableCell>
                            <TableCell>46</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>LE</TableCell>
                            <TableCell>9</TableCell>
                            <TableCell>18</TableCell>
                            <TableCell>26</TableCell>
                            <TableCell>34</TableCell>
                            <TableCell>42</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>LLO</TableCell>
                            <TableCell>8</TableCell>
                            <TableCell>17</TableCell>
                            <TableCell>26</TableCell>
                            <TableCell>36</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                
          </Table>
     </Grid>
          </Box>
      </Grid>
      {anio && propuestas && matap? <ReportesListadoAlumnosInfo anio={anio} propuestas={propuestas} matap={matap}/>:null

      }
    </Container>
  );
}
export default ListadoAluInfoCompleto