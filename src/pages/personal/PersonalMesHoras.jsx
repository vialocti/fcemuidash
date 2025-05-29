import { Box, Button, CircularProgress, Container, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { traerDatosPeronalHR } from '../../services/servicesPersonal'
import LineChartMultiple from '../../utils/graphics/LinesChartMultiple'
import BarChartMultiple from '../../utils/graphics/BarChartMultiple'
import { DataGrid } from '@mui/x-data-grid'



const PersonalMesHoras = () => {


const [anio, setAnio] = useState('1')
const [mes, setMes] = useState('01')
const [claustro, setClaustro] = useState('1')
const [tgrafico, setTgrafico] = useState('1')
const [finMes, setFinMes]=useState(31)
const [horasmes, setHorasmes] = useState(null)
const [ejecuta, setEjecuta]=useState(false)
const [progress, setProgress] = useState(1);



useEffect(() => {
  
setAnio(new Date().getFullYear())


}, [])


const onHandleChange= (event)=>{
    if(event.target.name==='claustro'){
        setClaustro(event.target.value)
    }else if(event.target.name==='anio'){
        setAnio(event.target.value)
    }else if(event.target.name==='mes'){
        setMes(event.target.value)
        calcularFindeMes(event.target.value)
    }else if(event.target.name==='tgrafico'){
        setTgrafico(event.target.value)
    }
}


const calcularFindeMes =(mes)=>{
    if(mes==='04' || mes==='06'|| mes==='09' || mes==='11'){
        setFinMes(30)

    }else if(mes==='02'){
        setFinMes(29)
    }else{
        setFinMes(31)
    }
}


const traerNombreDiaSemana =(dias)=>{
    let diasSemana=['Domingo', 'Lunes','Martes','Miercoles','Jueves','Viernes', 'Sabado']
    //console.log(dias)
    return diasSemana[dias]
}


const onHandleinfo =async ()=>{
    //console.log(finMes)
    setEjecuta(true)
    setHorasmes(null)
    let datosmes=[]
    for(let i=1; i< finMes+1;i++){
        let dia = i < 10 ? '0'+ i : i.toString()
        let fecha = anio.toString() + '-' + mes + '-' + dia  
        let diasemana= new Date(fecha + 'T00:00:00')
        let nombredia= traerNombreDiaSemana(diasemana.getDay())
        let registro={
            id:0,
            diasemana:'',
            //fecha:'',
            registros:0,
            horast:0.0,
            promediodia:0.0
        }
        setProgress(i*3)
        //console.log(fecha, diasemana.getDay())
         if(diasemana.getDay() !== 0){
                let datos = await traerDatosPeronalHR(fecha,claustro)
                if (datos.nroreg !== 0){
                    
                    registro={
                        id:Number(dia),
                        diasemana:nombredia + '(' + dia + ')',
                        //fecha:dia,
                        registros:datos.nroreg,
                         horast:Number(datos.horas.toFixed(2)),
                         promediodia:Number((datos.horas/datos.nroreg).toFixed(2))
                        }
                }else{
                    registro={
                        id:Number(dia),
                        diasemana:nombredia + '(' + dia + ')',
                       // fecha:dia,
                        registros:0,
                        horast:0.0,
                        promediodia:0.0
                    }   
                }
            datosmes.push(registro)
         }
         
    }
    setHorasmes(datosmes)
    setEjecuta(false)
}


const columns = [
       
    {
      field: 'diasemana',
      headerName: 'Dia',
      width: 110,
      editable: false,
    },
    {
        field: 'registros',
        headerName: 'Nro.Reg.',
        type: 'number',
        width: 80,
        editable: false,
      },
    {
      field: 'horast',
      headerName: 'Horas',
      type: 'number',
      width: 90,
      editable: false,
    },
    {
      field: 'promediodia',
      type: 'number',
      headerName: 'Promedio',
      width: 100,
      editable: false,
    },
  ];


  //if(horasmes){console.log(horasmes)}
  return (
    <Container maxWidth='false' sx={{width:'90%', paddingInline:10}}>
        <Grid container>
        
        <Grid item xs={12} md={12}>
          <Typography variant='h5' textAlign={'center'} color={'white'} backgroundColor={'#444444'} 
          sx={{m:2}}
          > Horas, Promedio, Asistencia Personal Docente y No Docente</Typography>
        </Grid>
        <Box sx={{ display:'flex',border:1, borderRadius:2, backgroundColor:'beige',width:'100%',mt:1,mb:2, p:2 ,flexWrap:'wrap'}}>  

        <Grid item xs={12} md={1}>
             
              <InputLabel id="anioi">Año</InputLabel>
              
              <TextField
                variant='standard' 
                type="text"
                id="anio"
                name="anio"
                onChange={onHandleChange}
                value={anio}
              
              />
              
        </Grid>
              
        <Grid item xs={12} md={1}></Grid>

        <Grid item xs={12} md={2}>
            <InputLabel id='mes'>Mes</InputLabel>
            <Select 
             variant='standard'
             name="mes"
             id='mes' 
             value={mes}
             onChange={onHandleChange}>
                <MenuItem value="01">Enero</MenuItem>
                <MenuItem value="02">Febrero</MenuItem>
                <MenuItem value="03">Marzo</MenuItem>
                <MenuItem value="04">Abril</MenuItem>
                <MenuItem value="05">Mayo</MenuItem>
                <MenuItem value="06">Junio</MenuItem>
                <MenuItem value="07">Julio</MenuItem>
                <MenuItem value="08">Agosto</MenuItem>
                <MenuItem value="09">Septiembre</MenuItem>
                <MenuItem value="10">Octubre</MenuItem>
                <MenuItem value="11">Noviembre</MenuItem>
                <MenuItem value="12">Diciembre</MenuItem>
                
            </Select>
        </Grid>      

        <Grid item xs={12} md={1}></Grid>

        <Grid item xs={12} md={2}>
            <InputLabel id='personal'>Claustro</InputLabel>
            <Select 
             variant='standard'
             name="claustro"
             id='claustro' 
             value={claustro}
             onChange={onHandleChange}>
                <MenuItem value="1">Docente</MenuItem>
                <MenuItem value="2">No Docente</MenuItem>
                
            </Select>
        </Grid>
        
        
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


            

        <Grid item xs={12} md={1}>
              <Button variant='outlined' onClick={onHandleinfo} >
                Mostrar
              </Button>
        </Grid>
        <Grid item xs={12} md={1}></Grid>
       {ejecuta?  
        <Grid item  xs={12} md={1}>
            <Box sx={{ display: 'flex' }}>
                
                <CircularProgress variant="determinate" value={progress} />
            </Box>
        </Grid>:null}
      
      </Box>

    {horasmes?horasmes.length>0?
        <>
        
      <Grid item xs={12} md={4}>
            <DataGrid
                rows={horasmes}
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
      </Grid>

         {/** 
            <Table size='small'>
                <TableHead>
                    <TableRow>
                      
                      <TableCell>Dia</TableCell>
                      <TableCell>Horas</TableCell>
                      <TableCell>Registros</TableCell>
                      <TableCell>Promedio</TableCell>
                    
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {horasmes.map((item,index)=>
                    <TableRow key={index}>
                        
                        <TableCell>{item.diasemana}({item.fecha})</TableCell>
                        <TableCell>{item.horast}</TableCell>
                        <TableCell>{item.registros}</TableCell>
                        <TableCell>{item.promediodia}</TableCell>
                    </TableRow>
                     )}
                </TableBody>
            </Table>
        */} 
           
      
      
      <Grid item xs={12} md={8} sx={{p:1}}>
        {tgrafico==='1'
        ?<LineChartMultiple datos={horasmes} claustro={claustro} />
        :<BarChartMultiple datos={horasmes} claustro={claustro} />
        }
      </Grid>
     </>
     :null:null}
    
            <Grid item xs={12} md={6} sx={{p:1}}>
            <Paper elevation={3}>
                <Typography variant='h6'>Proposito y Operación</Typography>
                <Typography>Mostrar cantidad de personas que registraron, cantidad de horas y promedio diario</Typography>
                <Typography>Elija un año, un mes y el claustro que desea mostrar</Typography>
                <Typography>Mostrara una tabla y una grafica la cual podrá elegir entre barras o lineal</Typography>              
                <Typography>Esta operación tarda algunos segundos, vera un circulo de progreso a su derecha en el cuadro de opciones</Typography>

                </Paper>
            </Grid>

            <Grid item xs={12} md={6} sx={{p:1}}>
                <Paper elevation={3}>
                <Typography variant='h6'>Referencias</Typography>
                <Typography>En la Tabla se mostraran las siguientes columnas</Typography>
                <Typography>Dia(dia de la semana y su numero)no muestra dias domingos</Typography>
                <Typography>Nro.Reg(nro de personas que registraron en el dia)</Typography>
                <Typography>Horas(sumatoria de horas del dia)</Typography>
                <Typography>Promedio(promedio de horas del dia)</Typography>
                </Paper>
            </Grid>

    </Grid>      

    </Container>
  )
}

export default PersonalMesHoras