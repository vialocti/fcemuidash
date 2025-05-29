import React,{useEffect,useState} from 'react'
//import IngresantesAnioSede from '../../components/ingresantes/IngreseantesAnioSede'

import { Box, Button, Container, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import BarChartMultI from '../../utils/graphics/BarChartMultI'
import LinesChartMultI from '../../utils/graphics/LinesChartMultI'
import { traerInscriptosEntreAnios } from '../../services/servicesInscriptos'




const InscriptosPageEnTableRoweAnios = () => {

  //const [cantidad, setCantidad]= useState(0)
  const [inscripAnios, setInscripAnios]=useState(null)
  const [anioi,setAnioi] = useState(2020)
  const [aniof,setAniof] = useState(2024)
  const [tgrafico, setTgrafico] = useState('1')  
  
  useEffect(()=>{
    
    const getTableRowaerDatos = async ()=>{
      
      setInscripAnios( await traerInscriptosEntreAnios (anioi,aniof))
           
    }

    getTableRowaerDatos()
  },[])
  
  

  /*
  const buscarInfo =()=>{

  }
*/
  const onHandleChange =(event)=>{
    if(event.target.name==='anioi'){
        setAnioi(event.target.value)
    }else if(event.target.name ==='aniof'){
        setAniof(event.target.value)
    }else if(event.target.name ==='tgrafico'){
        setTgrafico(event.target.value)
    }
    
  }

  const onHandleinfo =async ()=>{
    setInscripAnios( await traerInscriptosEntreAnios (anioi,aniof))
  
  }

   
  //console.log(ingreAnios)
  return (
    <Container maxWidth='false' sx={{width:'90%', paddingInline:10}}>
   
    <Grid container>
        
           
            <Box sx={{ display:'flex',border:1, borderRadius:2, backgroundColor:'beige',width:'100%', p:2 ,flexWrap:'wrap'}}>  
              <Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>

                            <Typography variant='h5' textAlign={'center'} >
                            Comparativa Aspirantes Periodo Años Lectivos Sucesivos  </Typography>
                          </Grid>
            <Grid item xs={12} md={1}>
                 
                  <InputLabel id="anioi">Año Inicio </InputLabel>
                  
                  <TextField
                    variant='standard' 
                    type="text"
                    id="anioi"
                    name="anioi"
                    onChange={onHandleChange}
                    value={anioi}
                  
                  />
                  
            </Grid>
                  
            <Grid xs={12} md={1}></Grid>

            <Grid item xs={12} md={1}>
                  <InputLabel id="aniof">Año Fin </InputLabel>
                  
                  <TextField
                    variant='standard' 
                    type="text"
                    id="aniof"
                    name="aniof"
                    onChange={onHandleChange}
                    value={aniof}
                  
                  />
                  
            </Grid>
          

            <Grid item xs={12} md={2}></Grid>

            <Grid item xs={12} md={2}>
                <InputLabel id='labelgrafico'>Grafica</InputLabel>
                <Select 
                 variant='standard'
                 name="tgrafico"
                 id='tgrafico' 
                 value={tgrafico}
                 onChange={onHandleChange}>
                    <MenuItem value="1">Lineal</MenuItem>
                    <MenuItem value="2">Barras</MenuItem>
                    
                </Select>
            </Grid>
                <Grid item xs={12} md={1}></Grid>

            <Grid item xs={12} md={2}>
                  <Button variant='outlined' onClick={onHandleinfo} >
                    Mostrar
                  </Button>
            </Grid>

           </Box>
    
         {inscripAnios ? inscripAnios.length > 0?
              <>     
            <Grid item xs={12} md={4}>
      
     
                  <Table size='small'>
                <TableHead>
                  
                  <TableRow>
                    <TableCell>Año</TableCell>
                    <TableCell>Nro.Inscrip.</TableCell>
                    <TableCell>Nro.Insc.C.Carrera</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                {inscripAnios ? inscripAnios.map((ele,index) =>
                    <TableRow key={index}>
                      <TableCell>{ele.anio}</TableCell> 
                      <TableCell>{ele.totalI}</TableCell> 
                      <TableCell>{ele.totalIC}</TableCell>
                    </TableRow>
                  ):null}   
                </TableBody>
                </Table>
            </Grid>

            <Grid item xs={12} md={1}></Grid>
     
                <Grid item xs={12} md={6} sx={{widTableCell:'50%',height:'300px'}}>
                      {tgrafico==='1'   
                  
                        ?inscripAnios? <LinesChartMultI datos={inscripAnios} tipo={'A'} />:null
                  
                        :inscripAnios? <BarChartMultI datos={inscripAnios} tipo={'A'} />:null
                  
                      }
                </Grid>
    
  
  
              <Grid xs={12} md={12}>
                <Typography variant='h6' textAlign={'center'} sx={{m:2}}>Referencias</Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper elevation={3}>
                <Table size='small'>
                
                  <TableRow>
                    <TableCell>Nro.Inscriptos Primera Vez a la FCE</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>tipo_ingreso 1(con título secundario), 3(mayor 25 años),4(proveniente de otra Universidad),5(proveniente de otra Facultad UNCU)</TableCell>
        
                  </TableRow>
                
                </Table>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={2}></Grid>
              
              <Grid item xs={12} md={5}>
              <Paper elevation={3}>
                <Table size='small'>
                  <TableRow>
                    <TableCell>Nro.Inscriptos por Cambio de Carrera</TableCell>
                  </TableRow>
                  <TableRow>  
                    <TableCell>Solo tipo de ingreso 6, Proveniente de otra Carrera de la FCE</TableCell>
                  </TableRow>
                </Table>
                </Paper>
              </Grid>
              </>
        :null:null
        }     
    
   </Grid>
   </Container>
  )
}
export default InscriptosPageEnTableRoweAnios