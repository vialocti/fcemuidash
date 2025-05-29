import {Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
//import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect'
import React, { useEffect, useState } from 'react'
//import {useInscripcionesAnio} from '../../hooks/useInscripcionesAnio'

const AlumnosSedePropuesta = ({alumnosSede, alumnoscursada}) => {


const [aniosCursada, setAnioCursada]= useState(null)


const tratamientoDatos=(DatosCurFilter, ubicacion,propuesta,plan)=>{
  let dato={
    sede:ubicacion,
    propuesta:propuesta,
    plan:plan,
    anio1:0,
    anio2:0,
    anio3:0,
    anio4:0,
    anio5:0,
    tot:0
  }
  
  DatosCurFilter.forEach((elemento)=>{
      if(elemento.aniocursada===1){
        dato.anio1 = elemento.count
      }else if(elemento.aniocursada===2){
        dato.anio2 = elemento.count
      }else if(elemento.aniocursada===3){
        dato.anio3 = elemento.count
      }else if(elemento.aniocursada===4){
        dato.anio4 = elemento.count
      }else if(elemento.aniocursada===5){
        dato.anio5 = elemento.count
      }
      
  })
  dato.tot= parseInt(dato.anio1) + parseInt(dato.anio2)+ parseInt(dato.anio3) + parseInt(dato.anio4) + parseInt(dato.anio5)
  return dato
}

const generarResumen=(datosSedes)=>{
  let sumatoria={
    sede:'',
    propuesta:'',
    plan:'',
    anio1:0,
    anio2:0,
    anio3:0,
    anio4:0,
    anio5:0,
    tot:0
  }
  datosSedes.forEach(item => {
    sumatoria.anio1 += parseInt(item.anio1);
    sumatoria.anio2 += parseInt(item.anio2);
    sumatoria.anio3 += parseInt(item.anio3);
    sumatoria.anio4 += parseInt(item.anio4);
    sumatoria.anio5 += parseInt(item.anio5);
    sumatoria.tot += item.tot;
  });
  
  // Agregamos la sumatoria al final del array
  datosSedes.push(sumatoria);

  return datosSedes



}
console.log(alumnoscursada)
useEffect(()=>{

const crearTablaDatos =()=>{  
let datosSedes=[]
let CPM =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='CP' && element.planl==='19'), 'MZA','CP', '19')
datosSedes.push(CPM)
let CPN98 =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='CPN' && element.planl==='98'), 'MZA','CPN', '98')
datosSedes.push(CPN98)
let LAM =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LA' && element.planl==='19'), 'MZA','LA', '19')
datosSedes.push(LAM)
let LEM =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LE' && element.planl==='19'), 'MZA','LE', '19')
datosSedes.push(LEM)
let LAM98 =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LA' && element.planl==='98'), 'MZA','LA', '98')
datosSedes.push(LAM98)
let LEM98 =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LE' && element.planl==='98'), 'MZA','LE', '98')
datosSedes.push(LEM98)
let LLOM =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LLO' && element.planl==='1'), 'MZA','LLO', '1')
datosSedes.push(LLOM)
let LLOM2 =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LLO' && element.planl==='2'), 'MZA','LLO_2', '2')
datosSedes.push(LLOM2)


let CPS =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===2 && element.carerra==='CP' && element.planl==='19'), 'SRF','CP', '19')
datosSedes.push(CPS)
let CPNS98 =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===2 && element.carerra==='CPN' && element.planl==='98'), 'SRF','CPN', '98')
datosSedes.push(CPNS98)

let LNRGA =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===3 && element.carerra==='LNRG' && element.planl==='1'), 'GAV','LNRG', '1')
datosSedes.push(LNRGA)

let LNRGE =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===4 && element.carerra==='LNRG' && element.planl==='1'), 'EST','LNRG', '1')
datosSedes.push(LNRGE)
let LLOE =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===4 && element.carerra==='LLO' && element.planl==='1'), 'EST','LLO', '1')
datosSedes.push(LLOE)
let LLOE2 =   tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===4 && element.carerra==='LLO' && element.planl==='2'), 'EST','LLO_2', '2')
datosSedes.push(LLOE2)

let result = generarResumen(datosSedes)
//console.log(result)

setAnioCursada(result)
}
if(alumnoscursada){
  crearTablaDatos()
}
}, [alumnoscursada])



   return (
    <Container>
     
     <Grid container>

        

     <Grid item xs={12} md={12} sx={{p:2}}>

     <Typography variant='h6'>DISCRIMINADOS POR PLAN(solo alumnos con legajo)</Typography>    
     <TableContainer component={Paper}>
 

              <Table size="small" aria-label="a dense table">
               
                    
                  
                <TableHead>
               
                  <TableRow>
                      
                  <TableCell>PLAN</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>CP</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>LA</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>LE</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>LLO</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>LNRG</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>CPN</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>Total</TableCell>
                  
                  </TableRow>
                </TableHead>
              
                <TableBody>
                  
                <TableRow>
                    <TableCell>PLAN19/2</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCP}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLA19}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLE19}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLLO2}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}></TableCell>
                    <TableCell style={{ textAlign: 'right' }}></TableCell>
                    <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLLO2 + alumnosSede.cantiLA19 + alumnosSede.cantiLE19 + alumnosSede.cantiCP}</strong></TableCell> 

                  </TableRow>
                  <TableRow>
                    <TableCell>PLAN98/1</TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLA98}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLE98}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLLO}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLNRG}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCPN}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLA98 + alumnosSede.cantiLE98 + alumnosSede.cantiLLO + alumnosSede.cantiLNRG + alumnosSede.cantiCPN}</strong></TableCell> 
                  </TableRow>
                 
                  <TableRow>
                  <TableCell>TOTAL</TableCell>
                    <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiCP}</strong></TableCell>
                    <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLA98 + alumnosSede.cantiLA19}</strong></TableCell>
                    <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLE98 + alumnosSede.cantiLE19}</strong></TableCell>
                    <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLLO + alumnosSede.cantiLLO2}</strong></TableCell>
                    <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLNRG}</strong></TableCell>
                    <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiCPN}</strong></TableCell> 
                    <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLA98 + alumnosSede.cantiLA19 + alumnosSede.cantiLE98 + alumnosSede.cantiLE19 + alumnosSede.cantiCP + alumnosSede.cantiLLO + alumnosSede.cantiLLO2 + alumnosSede.cantiLNRG + alumnosSede.cantiCPN}</strong></TableCell>
                  
                    
                  </TableRow>

                                
                </TableBody>
              
              </Table>
        </TableContainer>



        </Grid>
     
     <br />

    <Grid item xs={12} md={12} sx={{p:2}}>
  <Typography variant='h6'>DISCRIMINADOS POR SEDE(solo alumnos con legajo)</Typography>
  
    <TableContainer component={Paper}>


             <Table size="small" aria-label="a dense table">
               <TableHead>
                 
                  
                 <TableRow>
                     
                 <TableCell>SEDE</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>CP</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>LA</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>LE</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>LLO</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>LNRG</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>CPN</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>TOTAL</TableCell>
                 </TableRow>
               </TableHead>
             
               <TableBody>
                 
               <TableRow>
                   <TableCell>MENDOZA</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCPmza}</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLA19 + alumnosSede.cantiLA98}</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLE19 + alumnosSede.cantiLE98}</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLLOmza + alumnosSede.cantiLLO2mza}</TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCPNmza}</TableCell> 
                   <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiCPmza + alumnosSede.cantiCPNmza + alumnosSede.cantiLA19 + alumnosSede.cantiLA98 + alumnosSede.cantiLE19 + alumnosSede.cantiLE98 + alumnosSede.cantiLLOmza + alumnosSede.cantiLLO2mza}</strong></TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell>SAN RAFAEL</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCPsr}</TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCPNsr}</TableCell> 
                   <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiCPsr + alumnosSede.cantiCPNsr}</strong></TableCell>
                 </TableRow>
                
                 <TableRow>
                 <TableCell>GRAL.ALVEAR</TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLNRGgval}</TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell> 
                   <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLNRGgval}</strong></TableCell>
                 
                   
                 </TableRow>


                 <TableRow>
                 <TableCell>ESTE</TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLLOeste + alumnosSede.cantiLLO2este}</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLNRGeste}</TableCell>
                   <TableCell style={{ textAlign: 'right' }}></TableCell> 
                   <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLLOeste + alumnosSede.cantiLNRGeste}</strong></TableCell>
                   </TableRow>
                 <TableRow>
                   <TableCell>TOTAL</TableCell>
                   <TableCell  style={{ textAlign: 'right' }} ><strong>{alumnosSede.cantiCPmza + alumnosSede.cantiCPsr}</strong></TableCell>
                   <TableCell  style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLA19 + alumnosSede.cantiLA98}</strong></TableCell>
                   <TableCell  style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLE19 + alumnosSede.cantiLE98}</strong></TableCell>
                   <TableCell  style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLLOmza + alumnosSede.cantiLLO2mza + alumnosSede.cantiLLOeste + alumnosSede.cantiLLO2este}</strong></TableCell>
                   <TableCell  style={{ textAlign: 'right' }}><strong>{parseInt(alumnosSede.cantiLNRGgval) + parseInt(alumnosSede.cantiLNRGeste)}</strong></TableCell>
                   <TableCell  style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiCPNmza + alumnosSede.cantiCPNsr}</strong></TableCell>
                   <TableCell  style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLA98 + alumnosSede.cantiLA19 + alumnosSede.cantiLE98 + alumnosSede.cantiLE19 + alumnosSede.cantiCP + alumnosSede.cantiLLO + alumnosSede.cantiLLO2 + alumnosSede.cantiLNRG + alumnosSede.cantiCPN}</strong></TableCell>

                 </TableRow>


                               
               </TableBody>
             
             </Table>
       </TableContainer>



       </Grid>
  

       <Grid item xs={12} md={12} sx={{p:2}}>
        <hr />
  <Typography variant='h6'>DISCRIMINADOS POR SEDE, PROPUESTA Y AÑO DE CURSADA(Reinscriptos + Ingresantes sin Matricular)</Typography>
  <Typography variant='h6'>IMPORTANTE: en algunos periodos del ciclo lectivo pueden no coincidir los numeros totales con los alumnos activos</Typography>
    <TableContainer component={Paper}>


             <Table size="small" aria-label="a dense table">
               <TableHead>
                 
                  
                 <TableRow>
                     
                 <TableCell> SEDE</TableCell>
                   <TableCell>PROPUESTA</TableCell>
                   <TableCell >PLAN</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>1er AÑO</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>2do AÑO</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>3er AÑO</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>4to AÑO</TableCell>
                   <TableCell style={{ textAlign: 'right' }}>5to AÑO </TableCell>
                   <TableCell style={{ textAlign: 'right' }}>TOTAL</TableCell>
                 </TableRow>
               </TableHead>
             
               <TableBody>
                {aniosCursada? aniosCursada.map((elemento,index)=>(
                 <TableRow key={index}>
                 <TableCell>
                   {index === aniosCursada.length - 1 ? (
                     <strong>{elemento.sede}</strong>
                   ) : (
                     elemento.sede
                   )}
                 </TableCell>
                 
                 <TableCell>
                   {index === aniosCursada.length - 1 ? (
                     <strong>{elemento.propuesta}</strong>
                   ) : (
                     elemento.propuesta
                   )}
                 </TableCell>
             
                 <TableCell>
                   {index === aniosCursada.length - 1 ? (
                     <strong>{elemento.plan}</strong>
                   ) : (
                     elemento.plan
                   )}
                 </TableCell>
             
                 <TableCell style={{ textAlign: 'right' }}>
                   {index === aniosCursada.length - 1 ? (
                     <strong>{elemento.anio1}</strong>
                   ) : (
                     elemento.anio1
                   )}
                 </TableCell>
             
                 <TableCell style={{ textAlign: 'right' }}>
                   {index === aniosCursada.length - 1 ? (
                     <strong>{elemento.anio2}</strong>
                   ) : (
                     elemento.anio2
                   )}
                 </TableCell>
             
                 <TableCell style={{ textAlign: 'right' }}>
                   {index === aniosCursada.length - 1 ? (
                     <strong>{elemento.anio3}</strong>
                   ) : (
                     elemento.anio3
                   )}
                 </TableCell>
             
                 <TableCell style={{ textAlign: 'right' }}>
                   {index === aniosCursada.length - 1 ? (
                     <strong>{elemento.anio4}</strong>
                   ) : (
                     elemento.anio4
                   )}
                 </TableCell>
             
                 <TableCell style={{ textAlign: 'right' }}
                 onClick={() => alert(elemento.anio5)}
                 >
                   {index === aniosCursada.length - 1 ? (
                     <strong>{elemento.anio5}</strong>
                   ) : (
                     elemento.anio5
                   )}
                 </TableCell>
             
                 <TableCell style={{ textAlign: 'right' }}
                 
                 >
                   {index === aniosCursada.length - 1 ? (
                     <strong>{elemento.tot}</strong>
                   ) : (
                     <strong>{elemento.tot}</strong>
                   )}
                 </TableCell>
               </TableRow>
                ))
                 :null}

                               
               </TableBody>
             
             </Table>
       </TableContainer>



       </Grid>
   
      </Grid>
    </Container>
  )
}

export default AlumnosSedePropuesta