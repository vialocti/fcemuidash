import React, {useState,useEffect} from 'react'
import {getEgresadosEntreAnios} from '../../services/servicesEgresados'
import LineChartMultEgre from '../../utils/graphics/LinesChartMultEgre'
import BarChartMultEgre from '../../utils/graphics/BarChartMultEgre'
import { Box, Button, Container, Grid, InputLabel, MenuItem, Paper, Select, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'


//import { Loader } from 'rsuite';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faBarChart, faLineChart } from '@fortawesome/free-solid-svg-icons'

 
const EgresadosEntreAnios = () => {
    const minDistance=3
    const [anioi,setAnioi] = useState(2014)
    //const [anioActual,setAnioActual] = useState(1)
    const [aniof,setAniof] = useState(2024)
    const [anios, setAnios] = useState(null)
    const [tgrafico, setTgrafico] = useState('1') 
    const [egreAnios, setEgreAnios]=useState(null)
    const [sexo, setSexo]= useState('T')
   

    const [value, setValue] = useState([2000, 2023]);
    
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
      const traerDatos =async()=>{
        setEgreAnios(await getEgresadosEntreAnios(anioi,aniof,'L'))
      }
    
      traerDatos()
    }, [])
    
    useEffect(() => {
        const getdatos=()=>{
            //console.log('ok')
            let aniosl=[]
            for(let i=Number(anioi);i<Number(aniof)+1;i++){
                aniosl.push(i)
            }
            setAnios(aniosl)
        }
        getdatos()
    }, [egreAnios])
    

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
        }
        
    }
   
    const onHandleinfo =async()=>{
        const resu =await getEgresadosEntreAnios(anioi,aniof,'L')
        //console.log(resu)
        setEgreAnios(resu)
   
    }

  
    
   


  return (
    <Container maxWidth='false' sx={{width:'90%',paddingInline:10}}>
              
              <Grid>
              
              <Box sx={{ display:'flex',border:1, borderRadius:2, backgroundColor:'beige',width:'100%', p:2 ,flexWrap:'wrap'}}>
                    
              <Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>

                    <Typography variant='h5' textAlign={'center'}>
                    Egresos: En un Intervalo de Años Lectivos
                    </Typography>

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
                                max={2035}
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
                    
                    
                    
                    <Grid item xs={12} md={2} sx={{mt:1,marginRight:'20px'}}>
                            

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
                    <Grid xs={12} md={2} sx={{mt:1,marginRight:'50px'}}>
                    <InputLabel id="labelgenero">Genero</InputLabel>
                            <Select
                            variant='standard'
                            labelId="sexo"
                            id="sexo"
                            name='sexo'
                            value={sexo}
                            onChange={onHandleChange}
                            >
                                <MenuItem value={'T'}>Ambos</MenuItem>
                                <MenuItem value={'M'}>Varones</MenuItem>
                                <MenuItem value={'F'}>Mujeres</MenuItem>
                                
                            </Select>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{mt:4,marginLeft:'20px'}}> 
                            
                                <Button variant='outlined' onClick={onHandleinfo} >
                                    Mostrar
                                </Button>
                            
                    </Grid>
                   </Box>
               
           </Grid>
         {egreAnios
           
           ?<Grid container sx={{mt:1}}> 
          
           <Grid item xs={12} md={3}>
           
               
         </Grid>
                
               

                <Grid item xs={12} md={9} sx={{height:'450px'}}>
    
                        {tgrafico==='1'   
                                
                                ?egreAnios? <LineChartMultEgre datos={egreAnios} sexo={sexo} />:null
                                
                                :egreAnios? <BarChartMultEgre datos={egreAnios} sexo={sexo} />:null
                                }

                </Grid>


            <Grid item xs={12} md={12} sx={{p:2,mr:2}}>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Año</TableCell>
            <TableCell align="right">CPN(V)</TableCell>
            <TableCell align="right">CPN(M)</TableCell>
            <TableCell align="right">LA(V)</TableCell>
            <TableCell align="right">LA(M)</TableCell>
            <TableCell align="right">LE(V)</TableCell>
            <TableCell align="right">LE(M)</TableCell>
            <TableCell align="right">LNRG(V)</TableCell>
            <TableCell align="right">LNRG(M)</TableCell>
            <TableCell align="right">LLO(V)</TableCell>
            <TableCell align="right">LLO(M)</TableCell>
            <TableCell align="right">CP(V)</TableCell>
            <TableCell align="right">CP(M)</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {egreAnios.map((row) => (
            <TableRow
              key={row.anio}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.anio}</TableCell>

              <TableCell align="right">{row.cpnm}</TableCell>
              <TableCell align="right">{row.cpnf}</TableCell>
              <TableCell align="right">{row.lam}</TableCell>
              <TableCell align="right">{row.laf}</TableCell>
              <TableCell align="right">{row.lem}</TableCell>
              <TableCell align="right">{row.lef}</TableCell>
              <TableCell align="right">{row.lnrgm}</TableCell>
              <TableCell align="right">{row.lnrgf}</TableCell>
              <TableCell align="right">{row.llom}</TableCell>
              <TableCell align="right">{row.llof}</TableCell>
              <TableCell align="right">{row.cpm}</TableCell>
              <TableCell align="right">{row.cpf}</TableCell>
              <TableCell>{row.cpnm + row.cpnf + row.lam + row.laf + row.lem + row.lef + row.lnrgm + row.lnrgf + row.llom + row.llof + row.cpm +row.cpf}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                
            </Grid>    
               
            </Grid>  
                               
            :null}
    

    
    </Container>
  )
}

export default EgresadosEntreAnios

/**
 * 
*/