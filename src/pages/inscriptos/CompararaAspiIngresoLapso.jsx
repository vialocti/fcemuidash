import React,{useEffect,useState} from 'react'
//import IngresantesAnioSede from '../../components/ingresantes/IngreseantesAnioSede'

import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import BarChartMultI from '../../utils/graphics/BarChartMultI'
import LinesChartMultI from '../../utils/graphics/LinesChartMultI'
import { traerInscriptosEntreAnios } from '../../services/servicesInscriptos'
import { traerIngresantesEntreAnios } from '../../services/servicesIngresantes'




const CompararaAspiIngresoLapso = () => {

  //const [cantidad, setCantidad]= useState(0)
  const [inscripAnios, setInscripAnios]=useState(null)
  const [ingreAnios, setIngreAnios]=useState(null)
  const [aniolectivo, setAniolectivo]=useState(new Date().getFullYear())
  const [compara, setCompara]= useState(null)

  const [anioi,setAnioi] = useState(2020)
  const [aniof,setAniof] = useState(2024)
  const [tgrafico, setTgrafico] = useState('1')  
  
  const tratamiento = (aspirantes, ingresantes )=>{
    let numeroArray=0
    let datos=[]
    try{
    
    if(aspirantes && ingresantes){
      
      numeroArray= aspirantes.length

    for(let i=0; i < numeroArray; i++){
      
        
      let dato={anio:aspirantes[i].anio,totalI:aspirantes[i].totalI,totalIC:ingresantes[i].totalI}
      if(aspirantes[i].totalI > 0){
      datos.push(dato)
      }
      }
    
    
    return datos
  }
   return false
}catch(error){
  console.log(error)
}  
  }

  useEffect(()=>{
      const traerdatosIni = async ()=>{
        setInscripAnios( await traerInscriptosEntreAnios(anioi,aniof))
        setIngreAnios(await traerIngresantesEntreAnios(anioi,aniof))
      }
      traerdatosIni()
  },[])

  useEffect(()=>{
    
    const getTraerDatos = async ()=>{
      
        //console.log('eureka')
        setCompara(tratamiento(inscripAnios,ingreAnios))
        
    }

    getTraerDatos()
    if(compara){
      //console.log(compara)
    }
  },[inscripAnios,ingreAnios])
  
  

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
    setInscripAnios( await traerInscriptosEntreAnios(anioi,aniof))
    setIngreAnios(await traerIngresantesEntreAnios(anioi,aniof))
    
  }

   
  //console.log(ingreAnios)
  return (

   <Container maxWidth='false' sx={{width:'90%', paddingInline:10}}>
    <Grid container >
        
              
            <Box sx={{ display:'flex',border:1, borderRadius:2, backgroundColor:'beige',width:'100%',mt:1,mb:2, p:2 ,flexWrap:'wrap'}}>  

           <Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>

              <Typography variant='h5' textAlign={'center'}>
               Comparativa Aspirantes/Ingresantes  </Typography>
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
           
    
         {compara ? compara.length > 0?
              <>     
            <Grid item xs={12} md={4} >
      
     
                  <Table size='small'>
                <TableHead >
                  
                  <TableRow>
                    <TableCell>Año</TableCell>
                    <TableCell>Nro.Aspirantes</TableCell>
                    <TableCell>Nro.Ingresantes</TableCell>
                    <TableCell>%Ingresantes</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                {compara ? compara.map((ele,index) =>
                    <TableRow key={index}>
                      <TableCell>{ele.anio}</TableCell> 
                      <TableCell>{ele.totalI}</TableCell> 
                      <TableCell>{ele.totalIC}</TableCell>
                      <TableCell>{Number(ele.totalIC/ele.totalI*100).toFixed(2)}</TableCell>
                    </TableRow>
                  ):null}   
                </TableBody>
                </Table>
            </Grid>

            <Grid item xs={12} md={1}></Grid>
     
                <Grid item xs={12} md={6} sx={{width:'50%',height:'300px'}}>
                      {tgrafico==='1'   
                  
                        ?compara? <LinesChartMultI datos={compara} tipo={'C'} />:null
                  
                        :compara? <BarChartMultI datos={compara} tipo={'C'} />:null
                  
                      }
                </Grid>
    
  
  
                <Grid xs={12} md={12}>
                <Typography variant='h6' textAlign={'center'} sx={{m:2}}>Referencias</Typography>
                </Grid>
              <Grid item xs={12} md={5}>
                <Table size='small'>
                
                  <TableRow>
                    <TableCell>Aspirantes de Ingreso</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>Tipo_ingreso 1(con título secundario), 3(mayor 25 años),4(proveniente de Otra Universidad),5(proveniente de Otra Facultad UNCU)</TableCell>
                  </TableRow>
                
                </Table>
              </Grid>
              
              <Grid item xs={12} md={2}></Grid>
              
              <Grid item xs={12} md={5}>
                <Table size='small'>
                  <TableRow>
                    <TableCell>Ingresantes solo por Aprobación Condiciones de Ingreso</TableCell>
                  </TableRow>
                  
                  <TableRow>  
                    <TableCell>Porcentaje de Ingresantes referidos a los aspirantes</TableCell>
                  </TableRow>
                </Table>
              </Grid>
              </>
        :null:null
        }     
    
   </Grid>
   </Container>
  )
}
export default CompararaAspiIngresoLapso