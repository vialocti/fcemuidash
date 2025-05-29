import React, {useState,useEffect} from 'react'
import {getEgresadosEntreAnios} from '../../services/servicesEgresados'
import LineChartMultEgre from '../../utils/graphics/LinesChartMultEgre'
import BarChartMultEgre from '../../utils/graphics/BarChartMultEgre'
import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, Slider, TextField, Typography} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import LineChartMult from '../../utils/graphics/LinesChartMult'
import BarChartMult from '../../utils/graphics/BarChartMult'


//import { Loader } from 'rsuite';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faBarChart, faLineChart } from '@fortawesome/free-solid-svg-icons'

 
const EgresadosEntreAniosCarrera = () => {
    const minDistance=3
    const [anioi,setAnioi] = useState(2014)
    const [aniof,setAniof] = useState(2024)
    const [anios, setAnios] = useState(null)
    const [tgrafico, setTgrafico] = useState('1') 
    const [egreAnios, setEgreAnios]=useState(null)
    const [sexo, setSexo]= useState('T')
    const [rows, setRows]= useState(null)
    const [carrera, setCarrera] = useState('1')
    const [nameCarrera, setNameCarrera] = useState('CPN')
    const [value, setValue] = useState([2000, 2024]);
    
  
    
    const handleChange = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      } else {
        setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      } 
      setAnioi(newValue[0])
      setAniof(newValue[1])
    };

 /*
      const handleChange = (event, newValue) => {
   
    console.log(newValue[0],value[1])
    setValue(newValue);
  };
  */
  function valuetext(value) {
   
  }
 

    useEffect(() => {
        const getdatos=()=>{
            console.log('ok')
            let aniosl=[]
            for(let i=Number(anioi);i<Number(aniof)+1;i++){
                aniosl.push(i)
            }
            setAnios(aniosl)
        }
        getdatos()
    }, [egreAnios])
    
    useEffect(() => {
      
    
     const buscarCarrera=()=>{ 
      const rowsT =[]
        
      egreAnios.map((ele)=>{
          
          
          //console.log(enviarElemento(ele.anio,ele.cpnm,ele.cpnf))
          if(carrera==='1'){
            rowsT.push(enviarElemento(ele.anio,ele.cpnm,ele.cpnf))
            setNameCarrera('CPN')
          }else if (carrera==='2'){
            rowsT.push(enviarElemento(ele.anio,ele.lam,ele.laf))
            setNameCarrera('LA')
          }else if (carrera==='3'){
            rowsT.push(enviarElemento(ele.anio,ele.lem,ele.lef))
            setNameCarrera('LE')
          }else if (carrera==='6'){
            rowsT.push(enviarElemento(ele.anio,ele.lnrgm,ele.lnrgf))
            setNameCarrera('LNRG')
          }else if (carrera==='7'){
            rowsT.push(enviarElemento(ele.anio,ele.llom,ele.llof))
            setNameCarrera('LLO')
          }else if (carrera==='8'){
            rowsT.push(enviarElemento(ele.anio,ele.cpm,ele.cpf))
            setNameCarrera('CP')
          }
      })
     
      
      setRows(rowsT)

    }
    if(egreAnios){
      buscarCarrera()
    }
    }, [carrera])
    

    const onHandleChange =(event)=>{

        console.log(event.target.name)
        if(event.target.name==='anioi'){
            setAnioi(event.target.value)
        }else if(event.target.name ==='aniof'){
            setAniof(event.target.value)
        }else if(event.target.name ==='tgrafico'){
           
            setTgrafico(event.target.value)
        }else if(event.target.name ==='sexo'){
            setSexo(event.target.value)
        }else if(event.target.name==='carrera'){
          setCarrera(event.target.value)
        }
        
    }
    const enviarElemento=(anio,cantim,cantif)=>{
           const rw={
            id:anio,
            anio,
            cantim,
            cantif,
            cantit:cantim + cantif
           }
            return rw
    }
    const onHandleinfo =async()=>{
        const resu =await getEgresadosEntreAnios(anioi,aniof,'L')
        //console.log(resu)
        setEgreAnios(resu)
        const rowsT =[]
        
        resu.map((ele)=>{
            
            
            //console.log(enviarElemento(ele.anio,ele.cpnm,ele.cpnf))
            rowsT.push(enviarElemento(ele.anio,ele.cpnm,ele.cpnf))
            setCarrera('1')
            setNameCarrera('CPN')
        
    })
       
        
        setRows(rowsT)
    }

    const columns = [
       
        {
          field: 'anio',
          headerName: 'Año',
          width: 100,
          editable: false,
        },
        {
            field: 'cantit',
            headerName: 'Tot.',
            type: 'number',
            width: 100,
            editable: false,
          },
        {
          field: 'cantim',
          headerName: 'Var.',
          type: 'number',
          width: 100,
          editable: false,
        },
        {
          field: 'cantif',
          type: 'number',
          headerName: 'Muj.',
          width: 90,
          editable: false,
        },
      ];
    
   

  if(rows){console.log(rows)}
  return (
    <Container maxWidth='false' sx={{width:'90%',paddingInline:10}}>
               
              <Grid>
             
              <Box sx={{ display:'flex',border:1, borderRadius:2, backgroundColor:'beige',width:'100%', p:2 ,flexWrap:'wrap'}}>
                   
              <Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>
                
                <Typography variant='h5' color='white' sx={{textAlign:'center'}}> Egresos Comparativa Carrera - Sexo Años Lectivos</Typography>
            
          </Grid>
                   
                   
                    <Grid item xs={12} md={3} sx={{m:1,marginRight:'20px'}}>
                        <Typography id="input-slider" gutterBottom>
                            Int. Años
                        </Typography>
                            <Slider
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                size='small'
                                getAriaValueText={valuetext}
                                min={1995}
                                max={2030}
                                disableSwap
                            />
                    </Grid>
                
                    
                    <Grid item xs={12} md={1} sx={{m:1,marginRight:'20px'}}>
             
                    <InputLabel id="Anioi">Inicio</InputLabel>                 
                        <TextField variant='standard' 
                                type="text"
                                id="anioi"
                                name="anioi"
                                size='small'
                                onChange={onHandleChange}
                                value={anioi}
                
                            />
                    </Grid>

                    <Grid item xs={12} md={1} sx={{m:1,marginRight:'20px'}}>
                    <InputLabel id="AnioF">Fin</InputLabel>                              
                            <TextField 
                                variant='standard'
                                type="text"
                                id="aniof"
                                name="aniof"
                                size='small'
                                onChange={onHandleChange}
                                value={aniof}
                
                            />
                    
                    
                    </Grid>
                    
                    
                    <Grid item xs={12} md={2} sx={{m:1,marginRight:'20px'}}>
                    <InputLabel id="carrera">Carrera</InputLabel>
                            <Select
                            variant='standard'
                            labelId="carrera"
                            id="carrera"
                            name='carrera'
                            value={carrera}
                            onChange={onHandleChange}
                            >
                                <MenuItem value={'1'}>CPN</MenuItem>
                                <MenuItem value={'2'}>LA</MenuItem>
                                <MenuItem value={'3'}>LE</MenuItem>
                                <MenuItem value={'6'}>LNRG</MenuItem>
                                <MenuItem value={'7'}>LLO</MenuItem>
                                <MenuItem value={'8'}>CP</MenuItem>
                            </Select>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{mt:1,marginRight:'50px'}}>
                            

                            <InputLabel id="labelGrafica">T.Grafica</InputLabel>
                            <Select
                            variant='standard'
                            labelId="tgrafico"
                            id="tgrafico"
                            name='tgrafico'
                            value={tgrafico}
                            onChange={onHandleChange}
                            >
                                <MenuItem value={'1'}>Lineal</MenuItem>
                                <MenuItem value={'2'}>Barras</MenuItem>
                            </Select>
                                
                        


                    </Grid>
                    <Grid xs={12} md={2} sx={{mt:1}}>
                    
                    </Grid>
                    <Grid item xs={12} md={2} sx={{mt:4,marginLeft:'20px'}}> 
                            
                                <Button variant='outlined' onClick={onHandleinfo} >
                                    Mostrar
                                </Button>
                            
                    </Grid>
                </Box>
               
           </Grid>
         {egreAnios
           
           ?<Grid container sx={{mt:2}}> 
          
           <Grid item xs={12} md={4}>
            <Box><Typography>Carera: {nameCarrera}</Typography></Box>
           <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid size='small'
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5]}
               
                disableRowSelectionOnClick
            />
    </Box>
               
                </Grid>
                
               

                <Grid item xs={12} md={8} sx={{height:'400px'}}>
    
                        {tgrafico==='1'   
                                
                                ?rows? <LineChartMult datos={rows}  />:null
                                
                                :rows? <BarChartMult datos={rows}  />:null
                                }

                </Grid>
                
               
            </Grid>                     
            :null}
    

    
    </Container>
  )
}

export default EgresadosEntreAniosCarrera

/**
 * 
*/