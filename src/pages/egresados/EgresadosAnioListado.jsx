
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
import { getListadoEgreAnioPropuesta, getEgresadosAniosaFecha } from '../../services/servicesEgresados'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { CSVLink } from 'react-csv';
import { DataGrid } from '@mui/x-data-grid'
import ModalGrafico from '../../components/formModales/ModalGrafico'

const EgresadosAnioListado = () => {
    const [anio, setAnio] = useState(2025)
    const anioN = new Date().getFullYear()
    const [lapso, setLapso] = useState('C')
    const [carrera, setCarrera]=useState('T')
    const [listado, setListado]= useState([])
    const [total, setTotal]=useState(0)
    const [datosGT, setDatosGT]=useState('')
    const [datosGP, setDatosGP]=useState('')
    const [egresadosFecha, setEgresadosFecha]=useState([])
    
    const onHandleChange =(event)=>{
        if(event.target.name==='anio'){
            setAnio(event.target.value)
        }else if(event.target.name ==='lapso'){
            setLapso(event.target.value)
        }else if(event.target.name ==='carrera'){
            setCarrera(event.target.value)
        }
        
      }

//////

const [openModal, setOpenModal] = useState(false);

// Funciones para abrir y cerrar el modal
const handleOpenModal = () => setOpenModal(true);
const handleCloseModal = () => setOpenModal(false);









    useEffect(() => {
    
      
      const getDatos = async() => {
        const resu = await getEgresadosAniosaFecha()
        if(resu){
           setEgresadosFecha(resu)
        }
      }

      getDatos()

    }, [])

    useEffect(() => {
    
    
        const getDatos = async() => {
          const resu = await getListadoEgreAnioPropuesta(anio,carrera,lapso,0,0)
         if(resu){
          setListado(resu)
          setTotal(resu.length)
         }
        }
  
        getDatos()
  
      }, [anio,lapso,carrera])

      useEffect(()=>{
        const promediosString = listado.map(item => item.promedio).join(', ');
        const tiemposString = listado.map(item => item.tiempo).join(', ');

        setDatosGT(tiemposString)
        setDatosGP(promediosString);
        
      },[listado])


      const localizedTextsMap = {
        columnMenuUnsort: "No Orden",
        columnMenuSortAsc: "Orden Asc",
        columnMenuSortDesc: "Orden Desc",
        columnMenuFilter: "Filtro",
        columnMenuHideColumn: "Ocultar",
        columnMenuManageColumns: "Admin Columnas"
        
      };

      const columns = [
        {
          field: "legajo",
          headerName: "Lejajo",
          type: "number",
          width: 100,
          editable: false,
        },
        {
          field: "namec",
          headerName: "Estudiante",
          type: "string",
          width: 300,
          editable: false,
        },
        {
          field: "sede",
          headerName: "Sede",
          type: "string",
          width: 100,
          editable: false,
        },
        {
          field: "propuesta",
          headerName: "Propuesta",
          type: "string",
          width: 100,
          editable: false,
        },
        {
          field: "promedio",
          type: "number",
          headerName: "Promedio",
          width: 150,
          editable: false,
        },
        {
          field: "promesa",
          type: "number",
          headerName: "Promedio(S.A)",
          width: 150,
          editable: false,
        },
        {
          field: "fecha_egreso",
          type: "string",
          headerName: "Fecha Egreso",
          width: 150,
          editable: false,
        },
        {
          field: "aniop",
          type: "number",
          headerName: "Ingr.Prop",
          width: 100,
          editable: false,
        },
        {
          field: "anio",
          type: "number",
          headerName: "Ingr.Fac",
          width: 100,
          editable: false,
        },
        {
          field: "tiempop",
          type: "number",
          headerName: "DuraciónIP",
          width: 100,
          editable: false,
        },
        {
          field: "tiempo",
          type: "number",
          headerName: "DuraciónIF",
          width: 100,
          editable: false,
        },
      ];
    

  

    const traerCarrera=(car)=>{
        if(car==='T'){
            return 'TODAS LAS PROPUESTAS'
        }else if(car==='3'){
            return 'CONTADOR PUBLICO NACIONAL'
        }else if(car==='4'){
            return 'LICENCIATURA EN ADMINISTRACION'

        }else if(car==='5'){
            return 'LICENCIATURA EN ECONOMIA'

        }else if(car==='6'){
            return 'LICENCIATURA EN NEGOCIOS REGIONALES'

        }else if(car==='7'){
            return 'LCENCIATURA EN LOGISTICA'

        }else if(car==='9'){
            return 'CONTADOR PUBLICO'

        }
    }
   console.log(egresadosFecha)
    return (
        <Container maxWidth='false' sx={{width:'90%',paddingInline:10}}>
          
           {openModal?
            <ModalGrafico open={openModal} onClose={handleCloseModal} datosgP={datosGP} datosgT={datosGT}  />
            :null
          }

            <Grid container>
           
                    
            
                    <Box sx={{ display:'flex',flexWrap:'wrap',border:1, borderRadius:2, backgroundColor:'beige',width:'100%',mt:1,mb:2, p:2 }}>  
                    
                    <Grid item xs={12} md={12} bgcolor={"#444444"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>

                            <Typography variant='h6' textAlign={'center'}>
                                Listado de Egresados Carrera - Año
                            </Typography>
                    
                    </Grid>
                    
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
                  
                    

                    <Grid item xs={12} md={1} sx={{marginRight:'10px'}}>
                            <InputLabel id="carrera">Carrera</InputLabel>
                            <Select
                            variant='standard'
                            labelId="carrera"
                            id="carrera"
                            name='carrera'
                            value={carrera}
                            onChange={onHandleChange}
                            >
                                <MenuItem value={'T'}>Todas</MenuItem>
                                <MenuItem value={'3'}>CPN</MenuItem>
                                <MenuItem value={'4'}>LA</MenuItem>
                                <MenuItem value={'5'}>LE</MenuItem>
                                <MenuItem value={'6'}>LNRG</MenuItem>
                                <MenuItem value={'7'}>LLO</MenuItem>
                                <MenuItem value={'9'}>CP</MenuItem>
                            </Select>
                    </Grid>

                    <Grid item xs={12} md={2} sx={{marginRight:'10px'}}>
                        <InputLabel id='lapso'>Periodo</InputLabel>
                        <Select 
                            variant='standard'
                            name="lapso"
                            id='lapso' 
                            value={lapso}
                            onChange={onHandleChange}>
                                <MenuItem value="L">Año Lectivo</MenuItem>
                                <MenuItem value="C">Año Calendario</MenuItem>
                                <MenuItem value="E">Año Colación</MenuItem>
                                
                            </Select>
                        </Grid>

                    <Grid item xs={12} md={7} sx={{marginRight:'5px'}}>
                      <TableContainer component={Paper} sx={{width:'100%', backgroundColor:'beige'}}>
                      
                        <Table  size='small' aria-label="simple table">
                            
                            <TableHead>
                              <TableRow>
                              <TableCell align="center" colSpan={6}>
                                   Evolución Egresados a la Fecha (Año Calendario) comparativa años anteriores
                               </TableCell>
                              </TableRow>
                                <TableRow>
                                    <TableCell align="right">{anioN}</TableCell>
                                    <TableCell align="right">{anioN-1}</TableCell>
                                    <TableCell align="right">{anioN-2}</TableCell>
                                    <TableCell align="right">{anioN-3}</TableCell>
                                    <TableCell align="right">{anioN-4}</TableCell>
                                    <TableCell align="right">{anioN-5}</TableCell>

                                </TableRow>
                            </TableHead>
                            
                            
                            <TableBody>
                               {egresadosFecha.length>0?
                                <TableRow>
                                    <TableCell align="right">{egresadosFecha[0].cantidad}</TableCell>
                                    <TableCell align="right">{egresadosFecha[1].cantidad}</TableCell>
                                    <TableCell align="right">{egresadosFecha[2].cantidad}</TableCell>
                                    <TableCell align="right">{egresadosFecha[3].cantidad}</TableCell> 
                                    <TableCell align="right">{egresadosFecha[4].cantidad}</TableCell>
                                    <TableCell align="right">{egresadosFecha[5].cantidad}</TableCell>
                                </TableRow>
                                :<TableRow>
                                    <TableCell align="right">s/d</TableCell>
                                    <TableCell align="right">s/d</TableCell>
                                    <TableCell align="right">s/d</TableCell>
                                    <TableCell align="right">s/d</TableCell> 
                                    <TableCell align="right">s/d</TableCell>
                                    <TableCell align="right">s/d</TableCell>
                                </TableRow>
                            }
                            </TableBody>
                      
                        </Table>
                    </TableContainer>

                     </Grid> 
                    
                   
                </Box>
        </Grid>

        {listado?listado.length > 0
        ?<Grid container>
            <Grid Item component={Paper}xs={12} md={7}sx={{padding:'2px'}}>
                <Typography variant='h6'>Carrera:{traerCarrera(carrera)}, Total:{total}</Typography>
                
            </Grid>

            <Grid item xs={12} md={2} sx={{marginLeft:'50px'}}>
                          {listado?  
                        <Button variant='outlined'>
                        
                        <CSVLink data={listado} filename={"Egresados_" + anio +'_' +lapso + '_' + traerCarrera(carrera) +  ".csv"}>Exportar</CSVLink>
                       
                        </Button> :null 
                        }
                    </Grid>

                    <Grid item xs={12} md={2}>
                      
                         <Button variant="contained" color="primary" onClick={handleOpenModal}>
                           Ver Gráfico
                          </Button>
                    </Grid>

            <Grid item xs={12} md={12} sx={{ p: 2 }}>
          <div style={{ height: 550, width: "100%" }}>
            <DataGrid
              rows={listado}
              columns={columns}
              getRowId={(row) => row.alumno}
              localeText={localizedTextsMap}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 8 },
                },
              }}
              pageSizeOptions={[8, 15]}
              checkboxSelection
            />
          </div>
        </Grid>
            <Grid item xs={12} sx={{padding:'20px'}}>
            <Typography>Referencias: DuraciónIF(facultad) o DuracionIP(propuesta) en finalizar la carrera en años, Ingr.Fac: año ingreso FCE, Ingr.Prop: año ingreso carrera</Typography>
                
                <Typography>Año Lectivo desde 01 de Abril año hasta 31 de Marzo año+1, Año Calendario desde 01 de Enero hasta 31 de Diciembre</Typography>
                <Typography>Año Colacion desde 01 de Octubre año anterior hasta 30 de Septirmbre de año seleccionado</Typography>
            </Grid>
        </Grid>:null:null

        }
        </Container>
  )
}



export default EgresadosAnioListado

/*
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
*/