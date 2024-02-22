
import React,{useState, useEffect} from 'react'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getListadoEgreAnioPropuesta } from '../../services/servicesEgresados'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { CSVLink } from 'react-csv';

const EgresadosAnioListado = () => {
    const [anio, setAnio] = useState(2023)
    const [lapso, setLapso] = useState('L')
    const [carrera, setCarrera]=useState('3')
    const [listado, setListado]= useState([])
    
    const onHandleChange =(event)=>{
        if(event.target.name==='anio'){
            setAnio(event.target.value)
        }else if(event.target.name ==='lapso'){
            setLapso(event.target.value)
        }else if(event.target.name ==='carrera'){
            setCarrera(event.target.value)
        }
        
      }

    useEffect(() => {
    
    
      const getDatos = async() => {
        const resu = await getListadoEgreAnioPropuesta(anio,carrera,lapso,0,0)
        setListado(resu)
      }

      getDatos()

    }, [])

    useEffect(() => {
    
    
        const getDatos = async() => {
          const resu = await getListadoEgreAnioPropuesta(anio,carrera,lapso,0,0)
          setListado(resu)
        }
  
        getDatos()
  
      }, [anio,lapso,carrera])
    

    const onHandleInfo =()=>{
    //<CSVLink data={listado} filename={"Egresados_" + "_" + Date.now() + ".csv"}></CSVLink>
        
    }

    const traerCarrera=(car)=>{
       
        if(car==='3'){
            return 'CONTADOR PUBLICO NACIONAL'
        }else if(car==='4'){
            return 'LICENCIATURA EN ADMINISTRACION'

        }else if(car==='5'){
            return 'LICENCIATURA EN ECONOMIA'

        }else if(car==='6'){
            return 'LICENCIATURA EN NEGOCIOS REGIONALES'

        }else if(car==='7'){
            return 'LCENCIATURA EN LOGISTICA'

        }else if(car==='8'){
            return 'CONTADOR PUBLICO NACIONAL'

        }
    }

    return (
        <Container>

            <Grid>
            
                    <Grid item xs={12} md={12}>
                     <Typography variant='h5' textAlign={'center'} color={'white'} backgroundColor={'#444444'} 
                        sx={{m:2}}
                    >Listado de Egresados Carrera - Año</Typography>
                    </Grid>
            
                    <Box sx={{ display:'flex',border:1, borderRadius:2, backgroundColor:'beige',width:'100%',mt:1,mb:2, p:2 }}>  

                    <Grid item xs={12} md={1} sx={{marginRight:'10px'}}>
                 
                        <InputLabel id="anio">Año </InputLabel>
                  
                        <TextField
                            variant='standard' 
                            type="text"
                            id="anio"
                            name="anio"
                            onChange={onHandleChange}
                            value={anio}
                        
                        />
                  
                    </Grid>
                  
                    

                    <Grid item xs={12} md={2} sx={{marginRight:'20px'}}>
                            <InputLabel id="carrera">Carrera</InputLabel>
                            <Select
                            variant='standard'
                            labelId="carrera"
                            id="carrera"
                            name='carrera'
                            value={carrera}
                            onChange={onHandleChange}
                            >
                                <MenuItem value={'3'}>CPN</MenuItem>
                                <MenuItem value={'4'}>LA</MenuItem>
                                <MenuItem value={'5'}>LE</MenuItem>
                                <MenuItem value={'6'}>LNRG</MenuItem>
                                <MenuItem value={'7'}>LLO</MenuItem>
                                <MenuItem value={'8'}>CP</MenuItem>
                            </Select>
                    </Grid>

                    <Grid item xs={12} md={2} sx={{marginRight:'20px'}}>
                        <InputLabel id='lapso'>Periodo</InputLabel>
                        <Select 
                            variant='standard'
                            name="lapso"
                            id='lapso' 
                            value={lapso}
                            onChange={onHandleChange}>
                                <MenuItem value="L">Año Lectivo</MenuItem>
                                <MenuItem value="C">Año Calendario</MenuItem>
                                
                            </Select>
                        </Grid>
                    
                    <Grid item xs={12} md={2} sx={{marginLeft:'50px'}}>
                          {listado?  
                        <Button variant='outlined'>
                        
                        <CSVLink data={listado} filename={"Egresados_" + anio +'_' +lapso + '_' + traerCarrera(carrera) +  ".csv"}>Exportar</CSVLink>
                       
                        </Button> :null 
                        }
                    </Grid>
                </Box>
        </Grid>

        {listado?listado.length > 0
        ?<Grid container>
            <Grid Item component={Paper}xs={12} sx={{padding:'10px'}}>
                <Typography variant='h5'>Carrera:{traerCarrera(carrera)}</Typography>
                <Typography>Referencias: Tiempo en finalizar la carrera en años, añoIFac: año ingreso FCE, añoICar: año ingreso carrera</Typography>
                <Typography>Podra exportar los datos en formato csv</Typography>
                <Typography>Año Lectivo desde 01 de Abril año hasta 31 de Marzo año+1, Año Calendario desde 01 de Enero hasta 31 de Diciembre</Typography>
            </Grid>
            <Grid item xs={12} sx={{padding:'20px'}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        
                        <TableCell align="right">Legajo</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Carrera</TableCell>
                        <TableCell align="right">Promedio</TableCell>
                        <TableCell align="right">Prom.sin Aplazos</TableCell>
                        <TableCell align="right">F_Egreso</TableCell>
                        <TableCell align="right">añoIFac</TableCell>
                        <TableCell align="right">añoICar</TableCell>
                        <TableCell align="right">Tiempo</TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {listado.map((row,index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        

                        <TableCell align="right">{row.legajo}</TableCell>
                        <TableCell align="right">{row.namec}</TableCell>
                        <TableCell align="right">{row.propuesta}</TableCell>
                        <TableCell align="right">{row.promedio}</TableCell>
                        <TableCell align="right">{row.promesa}</TableCell>
                        <TableCell align="right">{row.fecha_egreso}</TableCell>
                        <TableCell align="right">{row.anio}</TableCell>
                        <TableCell align="right">{row.aniop}</TableCell>
                        <TableCell align="right">{row.tiempo}</TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        </Grid>:null:null

        }
        </Container>
  )
}



export default EgresadosAnioListado