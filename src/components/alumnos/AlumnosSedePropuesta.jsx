import { Card, CardContent, CardHeader, Container , TableContainer, Grid, Paper,Table, TableHead, TableCell, TableRow, TableBody, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
//import {useInscripcionesAnio} from '../../hooks/useInscripcionesAnio'

const AlumnosSedePropuesta = ({cantiAluSedePropuesta, planesact}) => {


  const [cantiCPNmza, setCantiCPNmza]=useState(0)
  const [cantiLA98, setCantiLA98]=useState(0)
  const [cantiLE98, setCantiLE98]=useState(0)
  const [cantiLLOmza, setCantiLLOmza]=useState(0)
  const [cantiLA19, setCantiLA19]=useState(0)
  const [cantiCPmza, setCantiCPmza]=useState(0)
  const [cantiLE19, setCantiLE19]=useState(0)
  
  const [cantiCPNsr, setCantiCPNsr]=useState(0)
  const [cantiCPsr, setCantiCPsr]=useState(0)
  
  const [cantiLLOeste, setCantiLLOeste]=useState(0)
  const [cantiLNRGeste, setCantiLNRGeste]=useState(0)

  const [cantiLNRGgval, setCantiLNRGgval]=useState(0)
  //console.log(anio)  


  //totales
  const [cantiCP, setCantiCP]=useState(0) //solo plan 19
  const [cantiCPN, setCantiCPN]=useState(0) //solo plan 98
  const [cantiLLO, setCantiLLO] = useState(0)
  const [cantiLNRG, setCantiLNRG]=useState(0) 
  

  useEffect(() => {
    
    //console.log(cantiAluSedePropuesta)
    const cargarcantiplanes =() => {
      let mzaCPN=null
      let srCPN = null
      let mzaCP=null
      let srCP = null
      let mzaLA98=null
      let mzaLE98 = null
      let mzaLA19=null
      let mzaLE19 = null
      let mzaLLO = null
      let esteLLO=null
      let esteLNRG=null
      let galvLNRG = null

      mzaCPN = cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='CPN98')
      srCPN = cantiAluSedePropuesta.filter(ele=>ele.sede==='SRF' && ele.codigo==='CPN98')
      mzaCP =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='CP19')
      srCP =cantiAluSedePropuesta.filter(ele=>ele.sede==='SRF' && ele.codigo ==='CP19')      
      
      mzaLA98 =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA98')
      mzaLE98 =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE98')
      mzaLA19 =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA19')
      mzaLE19 =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE19')
      mzaLLO =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LLO')

      esteLLO =cantiAluSedePropuesta.filter(ele=>ele.sede==='ESTE' && ele.codigo ==='LLO')
      esteLNRG =cantiAluSedePropuesta.filter(ele=>ele.sede==='ESTE' && ele.codigo ==='GNR12')
      galvLNRG =cantiAluSedePropuesta.filter(ele=>ele.sede==='GALV' && ele.codigo ==='GNR12')
      
      
      

      
      if(mzaCPN.length===1){
          setCantiCPNmza(mzaCPN[0].count)
      }else{
        setCantiCPNmza(mzaCPN.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

      }
      
      if(srCPN.length===1){
        setCantiCPNsr(srCPN[0].count)
      }else{
        setCantiCPNsr(srCPN.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0))
      }
      
      setCantiCPN(cantiCPNmza + cantiCPNsr) //total cpn
      


      if(mzaLA98.length===1){
        setCantiLA98(mzaLA98[0].count)
       }else{
        setCantiLA98(mzaLA98.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0))
      }
      
      if(mzaLE98.length===1){
        setCantiLE98(mzaLE98[0].count)
      }else{
        setCantiLE98(mzaLE98.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0))

      }
      
      
      //cp mza
       if(mzaCP.length===1){
        setCantiCPmza(mzaCP[0].count)
       }else{
       setCantiCPmza(mzaCP.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

       }
      //cp sr
       if(srCP.length===1){
        setCantiCPsr(srCP[0].count)
       }else{
       setCantiCPsr(srCP.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

       }

       setCantiCP(cantiCPmza + cantiCPsr)//total CP

       if(mzaLA19.length===1){
        setCantiLA19(mzaLA19[0].count)
       }else{
       setCantiLA19(mzaLA19.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

       }

       if(mzaLE19.length===1){
        setCantiLE19(mzaLE19[0].count)
       }else{
       setCantiLE19(mzaLE19.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))


       }


       if(mzaLLO.length===1){
        setCantiLLOmza(mzaLLO[0].count)
       }else{
       setCantiLLOmza(mzaLLO.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

       }
       //logistica este
       if(esteLLO.length===1){
        setCantiLLOeste(esteLLO[0].count)
       }else{
       setCantiLLOeste(esteLLO.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))
       }
       
       setCantiLLO(cantiLLOmza + cantiLLOeste) //total LLO


       if(esteLNRG.length===1){
        setCantiLNRGeste(esteLNRG[0].count)
       }else{
        setCantiLNRGeste(esteLNRG.map(item =>item.count).reduce((prev,curr)=>prev + Number(curr), 0))
       }

       if(galvLNRG.length===1){
        setCantiLNRGgval(galvLNRG[0].count)
       }else{
        setCantiLNRGgval(galvLNRG.map(item =>item.count).reduce((prev,curr)=>prev + Number(curr), 0))
       }

       setCantiLNRG(cantiLNRGgval + cantiLNRGeste)        
     /*
      if(galvLNRG.length===1){
      setCantiLNRGgval(galvLNRG[0].count)
      }
*/
    }

    if(cantiAluSedePropuesta){
        cargarcantiplanes()
    }
  }, [cantiAluSedePropuesta])
  
  
  
   return (
    <Container>
     
     <Grid container>

        

     <Grid item xs={12} md={12} sx={{p:2}}>

     <Typography variant='h6'>DISCRIMINADOS POR PLAN</Typography>    
     <TableContainer component={Paper}>
 

              <Table size="small" aria-label="a dense table">
               
                    
                  
                <TableHead>
               
                  <TableRow>
                      
                  <TableCell>PLAN</TableCell>
                    <TableCell>CP</TableCell>
                    <TableCell>LA</TableCell>
                    <TableCell>LE</TableCell>
                    <TableCell>LLO</TableCell>
                    <TableCell>LNRG</TableCell>
                    <TableCell>CPN</TableCell>
                  </TableRow>
                </TableHead>
              
                <TableBody>
                  
                <TableRow>
                    <TableCell>PLAN19</TableCell>
                    <TableCell>{cantiCP}</TableCell>
                    <TableCell>{cantiLA19}</TableCell>
                    <TableCell>{cantiLE19}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell> 
                  </TableRow>
                  <TableRow>
                    <TableCell>PLAN98/1</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{cantiLA98}</TableCell>
                    <TableCell>{cantiLE98}</TableCell>
                    <TableCell>{cantiLLO}</TableCell>
                    <TableCell>{cantiLNRG}</TableCell>
                    <TableCell>{cantiCPN}</TableCell> 
                  </TableRow>
                 
                  <TableRow>
                  <TableCell>TOTAL</TableCell>
                    <TableCell><strong>{cantiCP}</strong></TableCell>
                    <TableCell><strong>{cantiLA98 + cantiLA19}</strong></TableCell>
                    <TableCell><strong>{cantiLE98+ cantiLE19}</strong></TableCell>
                    <TableCell><strong>{cantiLLO}</strong></TableCell>
                    <TableCell><strong>{cantiLNRG}</strong></TableCell>
                    <TableCell><strong>{cantiCPN}</strong></TableCell> 
                  
                    
                  </TableRow>

                                
                </TableBody>
              
              </Table>
        </TableContainer>



        </Grid>
     
     <br />

    <Grid item xs={12} md={12} sx={{p:2}}>
  <Typography variant='h6'>DISCRIMINADOS POR SEDE</Typography>
  
    <TableContainer component={Paper}>


             <Table size="small" aria-label="a dense table">
               <TableHead>
                 
                  
                 <TableRow>
                     
                 <TableCell>SEDE</TableCell>
                   <TableCell>CP</TableCell>
                   <TableCell>LA</TableCell>
                   <TableCell>LE</TableCell>
                   <TableCell>LLO</TableCell>
                   <TableCell>LNRG</TableCell>
                   <TableCell>CPN</TableCell>
                   <TableCell>TOTAL</TableCell>
                 </TableRow>
               </TableHead>
             
               <TableBody>
                 
               <TableRow>
                   <TableCell>MENDOZA</TableCell>
                   <TableCell>{cantiCPmza}</TableCell>
                   <TableCell>{cantiLA19 + cantiLA98}</TableCell>
                   <TableCell>{cantiLE19 + cantiLE98}</TableCell>
                   <TableCell>{cantiLLOmza}</TableCell>
                   <TableCell></TableCell>
                   <TableCell>{cantiCPNmza}</TableCell> 
                   <TableCell><strong>{cantiCPmza + cantiCPNmza + cantiLA19 + cantiLA98 + cantiLE19 + cantiLE98 + cantiLLOmza}</strong></TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell>SAN RAFAEL</TableCell>
                   <TableCell>{cantiCPsr}</TableCell>
                   <TableCell></TableCell>
                   <TableCell></TableCell>
                   <TableCell></TableCell>
                   <TableCell></TableCell>
                   <TableCell>{cantiCPNsr}</TableCell> 
                   <TableCell><strong>{cantiCPsr + cantiCPNsr}</strong></TableCell>
                 </TableRow>
                
                 <TableRow>
                 <TableCell>GRAL.ALVEAR</TableCell>
                   <TableCell></TableCell>
                   <TableCell></TableCell>
                   <TableCell></TableCell>
                   <TableCell></TableCell>
                   <TableCell>{cantiLNRGgval}</TableCell>
                   <TableCell></TableCell> 
                   <TableCell><strong>{cantiLNRGgval}</strong></TableCell>
                 
                   
                 </TableRow>


                 <TableRow>
                 <TableCell>ESTE</TableCell>
                   <TableCell></TableCell>
                   <TableCell></TableCell>
                   <TableCell></TableCell>
                   <TableCell>{cantiLLOeste}</TableCell>
                   <TableCell>{cantiLNRGeste}</TableCell>
                   <TableCell></TableCell> 
                   <TableCell><strong>{cantiLLOeste + cantiLNRGeste}</strong></TableCell>
                 
                   
                 </TableRow>


                               
               </TableBody>
             
             </Table>
       </TableContainer>



       </Grid>
  
   
      </Grid>
    </Container>
  )
}

export default AlumnosSedePropuesta