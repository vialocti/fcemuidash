import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import InfoMuestraAprobadasActividad from '../../components/aprobadasanio/InfoMuestraAprobadasActividad';
import InfoMuestraAprobadasT from '../../components/aprobadasanio/InfoMuestraAprobadasT';

const AprobadasAnioResultado = () => {

    const [anioI, setAnioI] = useState(2023);
    const [propuesta, setPropuesta] = useState("8");
    const [sede, setSede] = useState(1);
    const [habilitado, sethabilitado]=useState(false)


    const onHandleChange =(event)=>{
        sethabilitado(false)
        if (event.target.name === "anioI") {
          setAnioI(event.target.value);
        
        }
        if (event.target.name === "sede") {
          setSede(event.target.value); 
          
        }

        if (event.target.name ==="propuesta"){
            setPropuesta(event.target.value)
        }
    }

    const onHandleInfo =()=>{
        sethabilitado(true)
    }

  return (
    <Container maxWidth='false' sx={{width:'90%',paddingInline:10}}>
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
            Ingresantes:Cantidad de Estudiantes por Materias Aprobadas, Periodo:Año Academico de Ingreso
          </Typography>
        </Grid>
        
          <Grid item xs={12} md={2} sx={{ mr: 1 }}>
            <InputLabel id="anioI">Año.Lectivo</InputLabel>

            <TextField
              variant="standard"
              type="text"
              id="anioI"
              name="anioI"
              onChange={onHandleChange}
              value={anioI}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel id="sede">Sede</InputLabel>
            <Select
              variant="standard"
              name="sede"
              id="sede"
              value={sede}
              onChange={onHandleChange}
            >
                <MenuItem value={'1'}>Mendoza</MenuItem>
                <MenuItem value={'2'}>San Rafael</MenuItem>
                <MenuItem value={'3'}>Gral.Alvear</MenuItem>
                <MenuItem value={'4'}>Este</MenuItem>
              
            </Select>
          </Grid>

          <Grid item xs={12} md={5}>
          <InputLabel id="propuesta">Propuesta Academica</InputLabel>
            <Select
              variant="standard"
              name="propuesta"
              id="propuesta"
              onChange={onHandleChange}
              value={propuesta}
            >
              <MenuItem value={"8"}>CONTADOR PUBLICO</MenuItem>
              <MenuItem value={"2"}>LICENCIATURA EN ADMINISTRACION</MenuItem>
              <MenuItem value={"3"}>LICENCIATURA EN ECONOMIA</MenuItem>
              <MenuItem value={"6"}>LGN.REGIONALES</MenuItem>
              <MenuItem value={"7"}>LICENCIADO EN LOGISTICA</MenuItem>
            
            </Select>
          </Grid>

          <Grid item xs={12} md={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onHandleInfo}>
              Aceptar
            </Button>
          </Grid>
       
          
        </Box>
      </Grid>

      {sede && anioI>2018 && habilitado ? (
        <>
        <InfoMuestraAprobadasT anio={anioI} sede={sede} propuesta={propuesta}/>
        <InfoMuestraAprobadasActividad anio={anioI} sede={sede} propuesta={propuesta}/>
        </>
      ) : null}
    </Container>
   
  )
}

export default AprobadasAnioResultado