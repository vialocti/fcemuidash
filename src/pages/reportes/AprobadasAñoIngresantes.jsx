import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReporteAprobadasIngresantes from '../../components/reportes/ReporteAprobadasIngresantes';
import { traerAprobadasAnioReport } from '../../services/servicesUtils'
import HelpBusquedareporAIngreso from '../../components/ayudas/HelpBusquedareporAIngreso';
import NotDataFound from '../../components/ayudas/NotDataFound';
import { blue } from '@mui/material/colors';




const AprobadasAñoIngresantes = () => {
 
    const [anioI, setAnioI] = useState(2023);
   
    const [propuesta, setPropuesta] = useState("8");
    
    const [fecha, setFecha] = useState("2024-12-18");
    const [sede, setSede] = useState('0');
    const [habilitado, sethabilitado]=useState(false)
    const [selectedDay, setSelectedDay] = useState("1");
    const [selectedMonth, setSelectedMonth] = useState("6");
    const [datosmat, setDatosmat]= useState(null)
    const [isChecked, setIsChecked] = useState(false);
    const [fechaFormat, setfechaFormat]= useState('0');
    const [loading, setLoading]=useState(false)



    function formatearFecha(fechaStr) {
      // Array con los nombres de los meses
      const meses = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
    
      // Convertir el string de fecha a un objeto Date
      let fecha = new Date(fechaStr + "T00:00:00");
      // console.log(fechaStr,'-' ,fecha)
      // Obtener el mes y el día
      let mes = meses[fecha.getMonth()]; // getMonth() devuelve un índice de 0 a 11
      let dia = fecha.getDate(); // getDate() devuelve el día del mes
    
      // Devolver la cadena formateada
      //setFechaReferencia(`Mes: ${mes}, Día: ${dia}`)
      let fechaFormat=`Mes: ${mes}, Día: ${dia}`;
      return fechaFormat
    }

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
    

    useEffect(()=>{
         
      const traerDatos =async()=>{
     
        const resu = await  traerAprobadasAnioReport(anioI,sede,fecha) 
    
        setDatosmat(resu)
      }
      if (habilitado){ 
        setLoading(true)
        traerDatos()
        
      }
    }, [habilitado])



    const onHandleChange =(event)=>{
        setDatosmat(null)
        sethabilitado(false)
        setLoading(false)
        if (event.target.name === "anioI") {
          setAnioI(event.target.value);
        
        }
        if (event.target.name === "mes") {
      
          setSelectedMonth(event.target.value);
        
        }
        if (event.target.name === "dia") {
          setSelectedDay(event.target.value);
        
        }
           

      
    }

    const onHandleInfo =async ()=>{
      let dia='01'
      let mes='01'

        if(isChecked){
          setFecha('0')
          setfechaFormat('0')
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
            setfechaFormat(formatearFecha(fechaTope)) 
            setFecha(fechaTope)
        }
        
        if(anioI>2018){
           
            
             sethabilitado(true)
        }else{}
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
            Ingresantes:Cantidad de Estudiantes por Materias Aprobadas
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
          name="mes"
          labelId="select-mes-label"
          value={selectedMonth}
          onChange={onHandleChange}
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
          name="dia"
          labelId="select-dia-label"
          value={selectedDay}
          onChange={onHandleChange}
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

      {datosmat? 
      datosmat.length>0? 
      <ReporteAprobadasIngresantes datos={datosmat} sede={sede} anio={anioI} fecha={fechaFormat}/>
       : <NotDataFound message={'sin datos para el periodo solicitado'} messageone={'verifique mes que desea comparar'} /> 
       : !loading ? <HelpBusquedareporAIngreso/>:
       
       <Box sx={{marginInline:5, marginTop:2,borderColor:blue}}><Alert severity='info'><Typography variant='h6'>...Procesando Datos</Typography></Alert></Box>
}
    </Container>
   
  )
}

export default AprobadasAñoIngresantes
        //