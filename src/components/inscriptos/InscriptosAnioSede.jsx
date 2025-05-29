import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PieChartOne from '../../utils/graphics/PieChartOne'
import BarChartBasic from '../../utils/graphics/BarChartBasic'
//import {useInscripcionesAnio} from '../../hooks/useInscripcionesAnio'

const InscriptosAnioSede = ({cantidadSede,anioT}) => {

  console.log(anioT) 
  
  //const [cantidadSede, setCantidadSede]= useState(null)
  const [total, setTotal] = useState(0) //total ingreso
  const [totalM,setTotalM]=useState(0) //total masculino
  const [totalF,setTotalF]=useState(0)//total femenino
  const [totalI,setTotalI]=useState(0)//total ingresantes 1 y 3
  const [totalIE,setTotalIE]=useState(0)//total ingresantes 4,5,6

  
  //ingresantes por sede
  const [sedeMza,setsedeMza]=useState(null)
  const [sedeSr,setsedeSr]=useState(null)
  const [sedeGa,setsedeGa]=useState(null)
  const [sedeEs,setsedeEs]=useState(null)
  //total por sede
  const [totmza, setTotmza]=useState(0)
  const [totsrf, setTotsrf]=useState(0)
  const [totgalv, setTotgalv]=useState(0)
  const [toteste, setToteste]=useState(0)
  //total por carreras masculino y femenino
  const[cpnm,setCpnm]=useState(0)
  const[cpnf,setCpnf]=useState(0)
  const[cpm,setCpm]=useState(0)
  const[cpf,setCpf]=useState(0)
  const[lam,setLam]=useState(0)
  const[laf,setLaf]=useState(0)
  const[lem,setLem]=useState(0)
  const[lef,setLef]=useState(0)
  const[llom,setLlom]=useState(0)
  const[llof,setLlof]=useState(0)
  const[lnrgm,setLnrgm]=useState(0)
  const[lnrgf,setLnrgf]=useState(0)
 
  
  
  
  useEffect(() => {
    
    
   
     
    

    let sumall = cantidadSede.map(item => item.canti).reduce((prev, curr) => prev + Number(curr), 0);
    const mujeres = cantidadSede.filter(elef => elef.sexo==='F')
    const hombres = cantidadSede.filter(elem => elem.sexo==='M')
    const ingreI = cantidadSede.filter(elei => elei.tipo_ingreso===1 || elei.tipo_ingreso===3 || elei.tipo_ingreso===null )
    const ingreIE = cantidadSede.filter(ele => ele.tipo_ingreso===4 || ele.tipo_ingreso===5 || ele.tipo_ingreso===6)
    


    const cpF = cantidadSede.filter(elef => elef.carrera==='CP' && elef.sexo==='F')
    const cpM = cantidadSede.filter(elef => elef.carrera==='CP' && elef.sexo==='M')
    const laF = cantidadSede.filter(elef => elef.carrera==='LA' && elef.sexo==='F')
    const laM = cantidadSede.filter(elef => elef.carrera==='LA' && elef.sexo==='M')
    const leF = cantidadSede.filter(elef => elef.carrera==='LE' && elef.sexo==='F')
    const leM = cantidadSede.filter(elef => elef.carrera==='LE' && elef.sexo==='M')
    const lloF = cantidadSede.filter(elef => elef.carrera==='LLO' && elef.sexo==='F')
    const lloM = cantidadSede.filter(elef => elef.carrera==='LLO' && elef.sexo==='M')
    const lnrgF = cantidadSede.filter(elef => elef.carrera==='LNRG' && elef.sexo==='F')
    const lnrgM = cantidadSede.filter(elef => elef.carrera==='LNRG' && elef.sexo==='M')

    const cpnF = cantidadSede.filter(elef => elef.carrera==='CPN' && elef.sexo==='F')
    const cpnM = cantidadSede.filter(elef => elef.carrera==='CPN' && elef.sexo==='M')  
    setCpnf(cpnF.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setCpnm(cpnM.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))   
    
    
    setCpf(cpF.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setCpm(cpM.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setLaf(laF.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setLam(laM.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setLef(leF.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setLem(leM.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setLlof(lloF.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setLlom(lloM.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setLnrgf(lnrgF.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setLnrgm(lnrgM.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))

    setTotalI(ingreI.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setTotalIE(ingreIE.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setTotalF(mujeres.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    setTotalM(hombres.map(item=>item.canti).reduce((prev,curr)=>prev + Number(curr), 0))
    
    setTotal(sumall)
    setsedeMza(cantidadSede.filter(este=>este.sede==='MZA'))
    setsedeSr(cantidadSede.filter(este=>este.sede==='SRF'))
    setsedeGa(cantidadSede.filter(este=>este.sede==='GALV'))
    setsedeEs(cantidadSede.filter(este=>este.sede==='ESTE'))

    setTotmza(cantidadSede.filter(este=>este.sede==='MZA').map(item => item.canti).reduce((prev, curr) => prev + Number(curr), 0))
    setTotsrf(cantidadSede.filter(este=>este.sede==='SRF').map(item => item.canti).reduce((prev, curr) => prev + Number(curr), 0))
    setTotgalv(cantidadSede.filter(este=>este.sede==='GALV').map(item => item.canti).reduce((prev, curr) => prev + Number(curr), 0))
    setToteste(cantidadSede.filter(este=>este.sede==='ESTE').map(item => item.canti).reduce((prev, curr) => prev + Number(curr), 0))
  }, [cantidadSede])  
  
  
 //console.log(cpnm,cpnf,cpm,cpf,lam,laf,lem,lef,llom,llof,lnrgm,lnrgf)
  //console.log(sedeMza,sedeSr,sedeGa,sedeEs)
  //console.log(totmza,totsrf,totgalv,toteste)  
    //console.warn(totalM, totalF,totalI,totalIE)

  return (
    <Grid container>
     
        <Grid item xs={12} md={12} sx={{mb:2}}>
           <Paper sx={{m:1,p:1, backgroundColor:'aliceblue'}}>
            <Typography variant='h5' sx={{textAlign:'center'}}>
              Año de Inscripción: {anioT} - Total de Inscriptos:{anioT>2018?total-cpnm-cpnf:total}
              </Typography>
            </Paper>
        </Grid>
     
     <Grid item xs={12} sm={12} md={6}>
     <Box sx={{textAlign:'center',border:1,m:1}}> <Typography variant='h6'>Inscripción por Genero</Typography></Box>
        <Paper sx={{display:'flex',p:1,m:1}}>
            
        
         <Box sx={{width:'40%',height:'40%'}}>
            <PieChartOne datos={[totalF,totalM]} labels={['Mujer','Hombre']} label={'Por Genero'} />
          </Box>
          <Box>
              <div>
              <Typography component='p'>Mujeres: {totalF}</Typography>
              </div>
              <div>
              <Typography component='p'>Hombres: {totalM} </Typography>
              
              </div>
          </Box>
    </Paper> 
    </Grid> 
    
     <Grid item xs={12} sm={10} md={6}>
        <Box sx={{textAlign:'center',border:1,m:1}}> <Typography variant='h6'>Inscripción por Tipo Ingreso</Typography></Box>
        <Paper sx={{display:'flex',p:1,m:1}} > 
          
          <Box sx={{width:'40%', height:'40%'}}>
            <PieChartOne datos={[totalIE,totalI]} labels={['Equiv.','Tit.Sec']} label={'Por Tipo de Ingreso'}/>
          </Box>
      
          <Box>
          
          <div>
          <Typography component='p'>Camb.Carrera o Equiv: {totalIE}</Typography>
          </div>
          <div>  
          <Typography component='p'>Tit.Sec. o mayor 25: {totalI}</Typography>
          </div>
          </Box>

        </Paper>
     
     
     </Grid>

     <Grid item xs={12} sm={10} md={6}>
        <Box sx={{textAlign:'center',border:1,m:1}}> <Typography variant='h6'>Inscripción por Carrera</Typography></Box>
        <Paper sx={{display:'flex',p:1,m:1}} > 
          
          <Box sx={{width:'60%', height:'70%'}}>
            <BarChartBasic datos={[cpnf+cpnm,cpm+cpf,lam+laf,lem+lef,lnrgf+lnrgm,llom+llof]} etiquetas={['CPN.','CP','LA','LE','LNRG','LLO']} label={'Por Carrera'}/>
          </Box>

          <Box sx={{ml:4,mt:4}}>
          
          <div>
          <Typography component='p'>CPN: {cpnm+cpnf}</Typography>
          </div>
          <div>  
          <Typography component='p'>CP: {cpm+cpf}</Typography>
          </div>
          
          <div>
          <Typography component='p'>LA: {lam+laf}</Typography>
          </div>
          <div>  
          <Typography component='p'>LE: {lem+lef}</Typography>
          </div>

          <div>
          <Typography component='p'>LLO: {llom+llof}</Typography>
          </div>
          <div>  
          <Typography component='p'>LNRG: {lnrgm+lnrgf}</Typography>
          </div>

          </Box>
      
          

        </Paper>
     
     
     </Grid>
     
     <Grid item xs={12} sm={10} md={6}>
        <Box sx={{textAlign:'center',border:1,m:1}}> <Typography variant='h6'>Inscripción por Sede</Typography></Box>
        <Paper sx={{display:'flex',p:1,m:1}} > 
          
          <Box sx={{width:'60%', height:'70%'}}>
            <BarChartBasic datos={[totmza,totsrf,totgalv,toteste]} etiquetas={['MZA','SRF','GALV','ESTE',]} label={'Por sede'}/>
          </Box>

          <Box sx={{ml:4,mt:4}}>
          
          <div>
          <Typography component='p'>MZA: {totmza}</Typography>
          </div>
          <div>  
          <Typography component='p'>SRF: {totsrf}</Typography>
          </div>
          
          <div>
          <Typography component='p'>GALV: {totgalv}</Typography>
          </div>
          <div>  
          <Typography component='p'>ESTE: {toteste}</Typography>
          </div>

          

          </Box>
      
          

        </Paper>
     
     
     </Grid>


    <Grid item xs={12} md={12} sx={{display:'none'}}>
    <table className='table table-bordered table-striped'>
                <thead>
                  <tr>
                    <th>Sede</th>
                    <th>Carrera</th>
                    <th>Tipo Ingreso</th>
                    <th>Sexo</th>
                    <th>Cantidad</th>

                    
                  </tr>
                </thead>

                <tbody>
                {cantidadSede.length>0? cantidadSede.map((ele, index)=>
                <tr key={index}>
                  <td>{ele.sede}</td>
                  <td>{ele.carrera}</td>
                  <td>{ele.tipo_ingreso}</td>
                  <td>{ele.sexo}</td>
                  <td>{ele.canti}</td>
                  
                  
                </tr>
                ):null}
                </tbody>
                </table> 

    </Grid>
    
    
      
     
                
    </Grid>

  )
}

export default InscriptosAnioSede