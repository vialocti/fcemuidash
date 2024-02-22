import React, { useEffect, useState } from 'react'
//import { useCursadasAnio } from '../../hooks/useCursadasAnio'
import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { traerComisionesPerLect, traerListadoComisiones } from '../../services/servicesCursadas.js'

const InfoCursadasAnio = () => {
    
     const [comisionesAnio, setComisionesAnio]=useState(null)
     const [comisionesAnioSel, setComisionesAnioSel]=useState(null)
     const [sedeComisionesPLM, setSedeComisionesPLM]=useState(null)
     
     const [anio, setAnio]= useState(0)
  //const {error,loading,sedeComisionesPL, listadoComisiones} = useCursadasAnio(anio)
 
  useEffect(()=>{

    const cargar = async(anioC)=>{
        console.log(anioC)
        setComisionesAnio(await traerListadoComisiones(anioC))
        setSedeComisionesPLM(await traerComisionesPerLect(anioC))
        }
    
    let fecha = new Date().toISOString()
    let fechacompa = fecha.substring(0,4) + '-04-01'
    //console.log(fechacompa)
    if (fecha < fechacompa){
        
       
        setAnio(Number(fecha.substring(0,4))-1) 
       // cargar(fecha.getFullYear-1)

    }else{
       
        setAnio(Number(fecha.substring(0,4)))
        //cargar(fecha.getFullYear)
    }
    

       
   
},[])
  

   
    
    useEffect(()=>{
        const cargar = async()=>{
        setComisionesAnio(await traerListadoComisiones(anio))
        setSedeComisionesPLM(await traerComisionesPerLect(anio))
        }

        cargar()
    },[anio])

    //traer pgen y ubi
    const traerubicacion=sede=>{
      
     if(sede==='MZA'){
        return 1
      }else if(sede==='SRF'){
        return 2
      }else if(sede==='GALV'){
        return 3
      }else if(sede==='ESTE'){
        return 4
      }
    }


    const traerPgenerico=nombre=>{
        
        if(nombre==='Anual'){
            return 1
        }else if(nombre==='1er Cuatrimestre'){
            return 2
        }else if(nombre==='2do Cuatrimestre'){
            return 3
        }else if(nombre==='1er Bimestre'){
            return 10
        }else if(nombre==='2do Bimestre'){
            return 11
        }else if(nombre==='3er Bimestre'){
            return 12
        }else if(nombre==='4to Bimestre'){
            return 13
        }
    
    }
   
    const mostrarComisiones =(sede,nombre)=>{
        
        let ubi=traerubicacion(sede)
        let pgen = traerPgenerico(nombre)
        const comisionesFiltro = comisionesAnio.filter((comision)=>comision.ubicacion===ubi && comision.periodo_generico===pgen) 
        setComisionesAnioSel(comisionesFiltro)
    }
    
    
    //if(loading) return <p>Cargando datos .....</p>
    //if(error) return <p>Error de Carga</p>
    //console.log(comisionesAnio)

    return (
    <Container>

        <Grid container>
            
            <Grid item xs={12} md={12} lg={12}>
            <Typography variant='h5' textAlign={'center'} color={'white'} backgroundColor={'#444444'} 
                    sx={{m:2}}
                    >Información comisiones de Cursada  Año Lectivo :{anio}</Typography>

            </Grid>

            <Grid item xs={12} md={5} lg={5} component={Paper}>
                <TableContainer sx={{height:'600px'}}>
                    <Table>
                        <TableHead>
         
                            <TableRow>
                                <TableCell>Sede</TableCell>
                                <TableCell>Periodo</TableCell>
                                <TableCell>Nro.Comisiones</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                        {sedeComisionesPLM?
                        sedeComisionesPLM.map((item, index)=>(
                        <TableRow key={index}>
                              <TableCell>{item.sede}</TableCell>
                              <TableCell>{item.nombre}</TableCell>
                              <TableCell>{item.count}</TableCell>
                              <TableCell><Button onClick={()=>mostrarComisiones(item.sede,item.nombre)}>M</Button></TableCell>
                        </TableRow>
                        )):null}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} md={1} lg={1}>
             </Grid>               
            <Grid item xs={12} md={6} lg={6} component={Paper} >
            <TableContainer sx={{height:'600px'}}>
                    <Table>
                        <TableHead>
         
                            <TableRow>
                                <TableCell>Comision</TableCell>
                                <TableCell>Cod.Materia</TableCell>
                                <TableCell>Materia</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                        {comisionesAnioSel?
                        comisionesAnioSel.map((item, index)=>(
                        <TableRow key={index}>
                              <TableCell>{item.codigo}</TableCell>
                              <TableCell>{item.nmat}</TableCell>
                              <TableCell>{item.mater}</TableCell>
                             
                        </TableRow>
                        )):null}
                        </TableBody>

                    </Table>
                </TableContainer>


            </Grid>
        </Grid>
    </Container>
  )
}

export default InfoCursadasAnio