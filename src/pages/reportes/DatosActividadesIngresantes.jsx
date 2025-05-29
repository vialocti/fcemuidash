import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReporteDatosActividades from '../../components/reportes/ReporteDatosActividades';

const DatosActividadesIngresantes = () => {


  const [anioI, setAnioI] = useState(2023);
   
   // const [propuesta, setPropuesta] = useState("8");
    
    const [fecha, setFecha] = useState("2024-12-18");
    const [sede, setSede] = useState('0');
    const [habilitado, sethabilitado]=useState(false)
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // Actualizamos el estado con el valor del checkbox
  };

  // Generar opciones para los días (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Opciones para los meses
  const months = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

    useEffect(() => {
      const today = new Date();
      setSelectedDay(today.getDate().toString());
      setSelectedMonth((today.getMonth() + 1).toString()); // Los meses en JavaScript son base 0
    
     
    }, [])
    

    useEffect(()=>{
        sethabilitado(false)
    }, [anioI, selectedDay,selectedMonth,isChecked])

    const onHandleChange =(event)=>{
        sethabilitado(false)
        if (event.target.name === "anioI") {
          setAnioI(event.target.value);
        
        }
        
        if (event.target.name === "sede") {
          setSede(event.target.value); 
          
        }

        
      
    }

    const onHandleInfo =()=>{
      let dia='01'
      let mes='01'

        if(isChecked){
          setFecha('0')
        } else { 
         if(selectedDay<10){
          dia= '0' + selectedDay
         }else{
          dia=selectedDay
         }

         if(selectedMonth<10){
          mes = '0' + selectedMonth
         }else{
          mes=selectedMonth
         }

         let fechaTope = anioI + '-' + mes + '-' + dia
         console.log(fechaTope) 
         setFecha(fechaTope)
        }
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
          Ingresantes: Resumen Actividades - Comparativa entre Propuestas  
        </Typography>
      </Grid>
      
        <Grid item xs={12} md={1} sx={{ mr: 1 }}>
          
         
          <TextField 
            variant="outlined"
            type="text"
            id="anioI"
            name="anioI"
            onChange={onHandleChange}
            label='Año Ingreso'
            value={anioI}
          />
        </Grid>

        <Grid item xs={12} md={1} sx={{ mr: 1 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id="select-mes-label">Mes Ref.</InputLabel>
      <Select
        labelId="select-mes-label"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        label="Mes Ref."
      >
        <MenuItem value="">
          <em>Seleccione un mes</em>
        </MenuItem>
        {months.map((month) => (
          <MenuItem key={month.value} value={month.value}>
            {month.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>  
        </Grid>

        <Grid item xs={12} md={2} sx={{ mr: 1 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id="select-dia-label">Día Ref.</InputLabel>
      <Select
        labelId="select-dia-label"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        label="Dia Ref."
      >
        <MenuItem value="">
          <em>Seleccione un día</em>
        </MenuItem>
        {days.map((day) => (
          <MenuItem key={day} value={day}>
            {day}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
        </Grid>

        <Grid xs={12} md={4}>
      
      
        <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          color="primary"
        />
      }
      label="Periodo Lectivo Completo"
    />
    


        </Grid>
        {/*
     
      */}
        <Grid item xs={12} md={1} sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={onHandleInfo}>
            Aceptar
          </Button>
        </Grid>
     
        
      </Box>
    </Grid>

    {anioI>2018 && habilitado ? (
   
      <ReporteDatosActividades anio={anioI} fecha={fecha}/>
   
      
    ) : 
        <>
        <Grid xs={12} md={6}>
          <Box variant='lined'>
            
          </Box>
        </Grid>
        <Grid xs={12} md={6}>

        </Grid>
        </>}
  
  </Container>
  )
}

export default DatosActividadesIngresantes