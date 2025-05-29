import React, { useEffect, useState } from 'react'
//import { traerAprobadasAnioReport } from '../../services/servicesUtils'
import { Alert, Box, Button, Card, CardContent, Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import jsPDF from 'jspdf'
import logo from '../../assets/images/logo-economicas.png'
import { blue } from '@mui/material/colors'
import { CSVLink } from 'react-csv'
import html2canvas from 'html2canvas';

const ReporteAprobadasIngresantes = ({datos, sede,anio,fecha}) => {

    
    const [datosA, setDatosA]= useState(null)
    

    //totales

    const [totalICPAA, setTotalICPAA]=useState(0)
    const [totalILAAA, setTotalILAAA]=useState(0)
    const [totalILEAA, setTotalILEAA]=useState(0)
    const [totalILLOAA, setTotalILLOAA]=useState(0)

    const [promocionCPAA, setPromocionCPAA ]=useState(0)
    const [promocionLAAA, setPromocionLAAA]=useState(0)
    const [promocionLEAA, setPromocionLEAA]=useState(0)
    const [promocionLLOAA, setPromocionLLOAA]=useState(0)
 
    const [completoCPAA, setCompletoCPAA] =useState(0)
    const [completoLAAA, setCompletoLAAA]=useState(0)
    const [completoLEAA, setCompletoLEAA]=useState(0)
    const [completoLLOAA, setCompletoLLOAA]=useState(0)



    const [totalICP, setTotalICP ]=useState(0)
    const [totalILA, setTotalILA]=useState(0)
    const [totalILE, setTotalILE]=useState(0)
    const [totalILLO, setTotalILLO]=useState(0)

    const [promocionCP, setPromocionCP ]=useState(0)
    const [promocionLA, setPromocionLA]=useState(0)
    const [promocionLE, setPromocionLE]=useState(0)
    const [promocionLLO, setPromocionLLO]=useState(0)
   

    const [completoCP, setCompletoCP] =useState(0)
    const [completoLA, setCompletoLA]=useState(0)
    const [completoLE, setCompletoLE]=useState(0)
    const [completoLLO, setCompletoLLO]=useState(0)
   

    //
    //datos variacion o diferencia % de promovidos a 2do y curso completo
    const [vpromocionCP, setvPromocionCP ]=useState(0)
    const [vpromocionLA, setvPromocionLA]=useState(0)
    const [vpromocionLE, setvPromocionLE]=useState(0)
    const [vpromocionLLO, setvPromocionLLO]=useState(0)
    const [vpromocionI, setvPromocionI]=useState(0)

    const [vcompletoCP, setvCompletoCP]=useState(0)
    const [vcompletoLA, setvCompletoLA]=useState(0)
    const [vcompletoLE, setvCompletoLE]=useState(0)
    const [vcompletoLLO, setvCompletoLLO]=useState(0)
    const [vcompletoI, setvCompletoI]=useState(0)

   
    


 
    useEffect(()=>{

     
      if(datos){
        setDatosA(datos)
      }
      
   }, [datos])
   
   
   
   
   
   useEffect(()=>{
      
      const calcularDatos= ()=>{

        setTotalICPAA(datosA[0].totali)
        setTotalILAAA(datosA[2].totali)
        setTotalILEAA(datosA[3].totali)
        setTotalILLOAA(datosA[1].totali)
      
        setPromocionCPAA(propmuebenseg(datosA[0]))
        setPromocionLAAA(propmuebenseg(datosA[2]))
        setPromocionLEAA(propmuebenseg(datosA[3]))
        setPromocionLLOAA(propmuebenseg(datosA[1]))
        
        setCompletoCPAA(cursocompleto(datosA[0]))
        setCompletoLAAA(cursocompleto(datosA[2]))
        setCompletoLEAA(cursocompleto(datosA[3]))
        setCompletoLLOAA(cursocompletoLLO(datosA[1]))
        
        
        
        setTotalICP(datosA[4].totali)
        setTotalILA(datosA[6].totali)
        setTotalILE(datosA[7].totali)
        setTotalILLO(datosA[5].totali)
        
        setPromocionCP(propmuebenseg(datosA[4]))
        setPromocionLA(propmuebenseg(datosA[6]))
        setPromocionLE(propmuebenseg(datosA[7]))
        setPromocionLLO(propmuebenseg(datosA[5]))
        
        setCompletoCP(cursocompleto(datosA[4]))
        setCompletoLA(cursocompleto(datosA[6]))
        setCompletoLE(cursocompleto(datosA[7]))
        setCompletoLLO(cursocompletoLLO(datosA[5]))

          
        
      
        
        }
      if(datosA){
        calcularDatos()
      }
   },[datosA])


   useEffect(()=>{
    setvPromocionCP( ((promocionCP/totalICP - promocionCPAA/totalICPAA)* 100).toFixed(2))
    setvPromocionLA( ((promocionLA/totalILA - promocionLAAA/totalILAAA)* 100).toFixed(2))
    setvPromocionLE( ((promocionLE/totalILE - promocionLEAA/totalILEAA)* 100).toFixed(2))
    setvPromocionLLO(((promocionLLO/totalILLO - promocionLLOAA/totalILLOAA)* 100).toFixed(2))


    setvCompletoCP(  ((completoCP/totalICP - completoCPAA/totalICPAA) * 100).toFixed(2))
    setvCompletoLA(  ((completoLA/totalILA - completoLAAA/totalILAAA) * 100).toFixed(2))
    setvCompletoLE(  ((completoLE/totalILE - completoLEAA/totalILEAA) * 100).toFixed(2))
    setvCompletoLLO(  ((completoLLO/totalILLO - completoLLOAA/totalILLOAA) * 100).toFixed(2))
     setvPromocionI((((totalProm(1)/ totalIngre(1)) - (totalProm(2)/ totalIngre(2))) * 100).toFixed(2))
    setvCompletoI((((totalCompl(1)/ totalIngre(1)) - (totalCompl(2)/ totalIngre(2))) * 100).toFixed(2))
  }, [promocionCP,promocionLLO,completoLLOAA,completoCPAA])
   
  useEffect(()=>{
  
  },[vcompletoI,vpromocionI])
  
  const generarPdf = () => {
    const input = document.getElementById('pdfContent')
    let data = fecha === '0' ? 'Ciclo Completo' : fecha

    html2canvas(input, { scrollY: -window.scrollY, backgroundColor: "#ffffff"  }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      const titulo = "Reporte de Aprobadas  Ingresantes"; // Cambia este texto por el que necesites
      pdf.setFontSize(18);
      pdf.text(titulo, pdfWidth / 2, 10, { align: 'center' });
      pdf.setFontSize(14);
      pdf.text('Referencia: ' + data, 50, 20, { align: 'center' });
      // Posición en Y para la imagen, dejando espacio para el título
      const imageY = 30;  
      
      
      pdf.addImage(imgData, 'PNG', 0, imageY, pdfWidth, pdfHeight)
      pdf.save(`reporte_aprobadas_${anio}.pdf`)
    })
  }
 
 
//calcular promocionados
 const propmuebenseg=(vector)=>{
      return vector.cuatro + vector.cinco + vector.seis + vector.siete + vector.ocho + vector.nueve
 }

 const cursocompleto =(vector)=>{
  
  return vector.nueve
 }

 const cursocompletoLLO =(vector)=>{
  
  return vector.ocho + vector.nueve
 }


 const totalIngre=(an)=>{
   if(an===1){
      return totalICP + totalILA +totalILE + totalILLO
    }else if(an===2){
      return  totalICPAA + totalILAAA +totalILEAA + totalILLOAA
    }
 }


 const totalProm =(an)=>{
  if(an===1){
    return promocionCP + promocionLA + promocionLE +promocionLLO
  }else if(an===2){
    return promocionCPAA + promocionLAAA + promocionLEAA +promocionLLOAA
  }
 }


 const totalCompl=(an)=>{
  
  if(an===1){
    
     return completoCP + completoLA +completoLE +completoLLO
   }else if(an===2){
     return completoCPAA + completoLAAA +completoLEAA +completoLLOAA
   }
}



  return (
    <Container sx={{marginInline:2}}>
        
     <Grid container>
     
      <Grid item xs={12} md={12}>
         {!datosA ? <Box sx={{marginInline:5, marginTop:2,borderColor:blue}}><Alert severity='info'><Typography variant='h6'>...Procesando Datos</Typography></Alert></Box>:null}
          <Typography variant='h5'>Año de Ingreso: {anio}</Typography> <Typography variant='h5'>Fecha Referencia: {fecha==='0'?'Ciclo Lectivo Completo(31/03)':fecha}</Typography>
          {datosA ? <>
           
            <Button variant='outlined' onClick={generarPdf}>Generar Pdf</Button>
           <hr/>
       <div id="pdfContent"  sx={{backgroundColor: '#ffffff'}}>
           <Card sx={{marginBottom:4}}>
          <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Año {anio}
                </Typography>

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Propuesta</TableCell>
                      <TableCell align="right">Inscriptos</TableCell>
                      <TableCell align="right">Promovidos a 2do (valor/porc.)</TableCell>
                      <TableCell align="right">Curso Completo (valor/porc.)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                    <TableCell>CP</TableCell>
                      <TableCell align="right">{totalICP}</TableCell>
                      <TableCell align="right">{promocionCP} ({(promocionCP/totalICP *100).toFixed(2)}%) </TableCell>
                      <TableCell align="right">{completoCP } ( {(((completoCP/totalICP)) * 100).toFixed(2)} %) </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>LA</TableCell>
                      <TableCell align="right">{totalILA}</TableCell>
                      <TableCell align="right">{promocionLA} ({(promocionLA/totalILA *100).toFixed(2)}%)  </TableCell>
                      <TableCell align="right">{completoLA} ( {(((completoLA/totalILA)) * 100).toFixed(2)} %) </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>LE</TableCell>
                      <TableCell align="right">{totalILE}</TableCell>
                      <TableCell align="right">{promocionLE} ( {(((promocionLE/totalILE)) * 100).toFixed(2)} %) </TableCell>
                      <TableCell align="right">{completoLE} ( {(((completoLE/totalILE)) * 100).toFixed(2)} %)  </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>LLO</TableCell>
                      <TableCell align="right">{totalILLO}</TableCell>
                      <TableCell align="right">{promocionLLO} ( {(((promocionLLO/totalILLO)) * 100).toFixed(2)} %) </TableCell>
                      <TableCell align="right">{completoLLO} ( {(((completoLLO/totalILLO)) * 100).toFixed(2)} %)  </TableCell>
                    </TableRow>
                    <TableRow>

                    <TableCell>Total</TableCell>
                      <TableCell align="right">{totalIngre(1)}  </TableCell>
                      <TableCell align="right">{totalProm(1) } ( {(((totalProm(1)/totalIngre(1))) * 100).toFixed(2)} %) </TableCell>
                      <TableCell align="right">{totalCompl(1) } ( {(((totalCompl(1)/ totalIngre(1))) * 100).toFixed(2)} %) </TableCell>
                    </TableRow>
                  </TableBody>
                  </Table>
                  </CardContent>
           </Card>
        
          <Card>
          <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Año {anio -1} 
                </Typography>
                

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Propuesta</TableCell>
                      <TableCell align="right">Inscriptos</TableCell>
                      <TableCell align="right">Promovidos a 2do (valor/porc.)</TableCell>
                      <TableCell align="right">Curso Completo (valor/porc.)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                    <TableCell>CP</TableCell>
                      <TableCell align="right">{totalICPAA}</TableCell>
                      <TableCell align="right">{promocionCPAA} ({(promocionCPAA/totalICPAA *100).toFixed(2)}%) </TableCell>
                      <TableCell align="right">{completoCPAA } ( {(((completoCPAA/totalICPAA)) * 100).toFixed(2)} %) </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>LA</TableCell>
                      <TableCell align="right">{totalILAAA}</TableCell>
                      <TableCell align="right">{promocionLAAA} ({(promocionLAAA/totalILAAA *100).toFixed(2)}%)  </TableCell>
                      <TableCell align="right">{completoLAAA} ( {(((completoLAAA/totalILAAA)) * 100).toFixed(2)} %) </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>LE</TableCell>
                      <TableCell align="right">{totalILEAA}</TableCell>
                      <TableCell align="right">{promocionLEAA} ( {(((promocionLEAA/totalILEAA)) * 100).toFixed(2)} %) </TableCell>
                      <TableCell align="right">{completoLEAA} ( {(((completoLEAA/totalILEAA)) * 100).toFixed(2)} %)  </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>LLO</TableCell>
                      <TableCell align="right">{totalILLOAA}</TableCell>
                      <TableCell align="right">{promocionLLOAA} ( {(((promocionLLOAA/totalILLOAA)) * 100).toFixed(2)} %) </TableCell>
                      <TableCell align="right">{completoLLOAA} ( {(((completoLLOAA/totalILLOAA)) * 100).toFixed(2)} %)  </TableCell>
                    </TableRow>
                    <TableRow>

                    <TableCell>Total</TableCell>
                      <TableCell align="right">{totalIngre(2)}  </TableCell>
                      <TableCell align="right">{totalProm(2) } ( {(((totalProm(2)/totalIngre(2))) * 100).toFixed(2)} %) </TableCell>
                      <TableCell align="right">{totalCompl(2) } ( {(((totalCompl(2)/ totalIngre(2))) * 100).toFixed(2)} %) </TableCell>
                    </TableRow>
                  </TableBody>
                  </Table>


                
                  </CardContent>
           </Card>

           <Card sx={{marginTop:4, background:'#ffffff'}}>
           <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Analisis comparativo {anio}, respecto al {anio-1} 
                </Typography>

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Propuesta</TableCell>
                      <TableCell align="right"> % Diferencia Promocion a 2do</TableCell>
                      <TableCell align="right"> % Diferencia Curso Completo</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                     <TableRow>
                      <TableCell>CP</TableCell>
                      <TableCell align="right">{vpromocionCP < 0 ? <Typography variant='h6' color='red'>{vpromocionCP}</Typography>:<Typography variant='h6'>{vpromocionCP}</Typography>}</TableCell>
                      <TableCell align="right">{vcompletoCP < 0 ? <Typography variant='h6' color='red'>{vcompletoCP}</Typography>:<Typography variant='h6'>{vcompletoCP}</Typography>}</TableCell>
                     </TableRow>

                     <TableRow>
                     <TableCell>LA</TableCell>
                      <TableCell align="right">{vpromocionLA < 0 ? <Typography variant='h6' color='red'>{vpromocionLA}</Typography>:<Typography variant='h6'>{vpromocionLA}</Typography>}</TableCell>
                      <TableCell align="right">{vcompletoLA < 0 ? <Typography variant='h6' color='red'>{vcompletoLA}</Typography>:<Typography variant='h6'>{vcompletoLA}</Typography>}</TableCell>
                     </TableRow>

                     <TableRow>
                     <TableCell>LE</TableCell>
                      <TableCell align="right">{vpromocionLE < 0 ? <Typography variant='h6' color='red'>{vpromocionLE}</Typography>:<Typography variant='h6'>{vpromocionLE}</Typography>}</TableCell>
                      <TableCell align="right">{vcompletoLE < 0 ? <Typography variant='h6' color='red'>{vcompletoLE}</Typography>:<Typography variant='h6'>{vcompletoLE}</Typography>}</TableCell>
                     </TableRow>

                     <TableRow>
                     <TableCell>LLO</TableCell>
                      <TableCell align="right">{vpromocionLLO < 0 ? <Typography variant='h6' color='red'>{vpromocionLLO}</Typography>:<Typography variant='h6'>{vpromocionLLO}</Typography>}</TableCell>
                      <TableCell align="right">{vcompletoLLO < 0 ? <Typography variant='h6' color='red'>{vcompletoLLO}</Typography>:<Typography variant='h6'>{vcompletoLLO}</Typography>}</TableCell>
                     </TableRow>

                     <TableRow>
                     <TableCell>Total</TableCell>
                      <TableCell align="right">{vpromocionI < 0 ? <Typography variant='h6' color='red'>{vpromocionI}</Typography>:<Typography variant='h6'>{vpromocionI}</Typography>}</TableCell>
                      <TableCell align="right">{vcompletoI < 0 ? <Typography variant='h6' color='red'>{vcompletoI}</Typography>:<Typography variant='h6'>{vcompletoI}</Typography>}</TableCell>
                     </TableRow>

                     

                  </TableBody>
                  </Table>
                </CardContent>

           </Card>
           </div>
          </>:null}
        

        </Grid>  

      <Grid item xs={12} md={12}>  
        {datosA ?
        <>
      
      <Card sx={{marginTop:4}}>
           <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                 Tabla de Valores desde 0 a 9 materias aprobadas años {anio-1} y {anio} CP sede Mza y SR, LA, LE, LLO sede Mza y Este 
                </Typography>
          <Table>
            <TableHead>
              <TableRow>
                

              </TableRow>
            </TableHead>

            <TableBody>
             
              
              <TableRow>
              <TableCell>Año Academico</TableCell>   <TableCell>{datosA[0].anio}</TableCell><TableCell>{datosA[1].anio}</TableCell><TableCell>{datosA[2].anio}</TableCell><TableCell>{datosA[3].anio}</TableCell><TableCell>{datosA[4].anio}</TableCell><TableCell>{datosA[5].anio}</TableCell><TableCell>{datosA[6].anio}</TableCell><TableCell>{datosA[7].anio}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Propuesta</TableCell>
              <TableCell>{datosA[0].propuesta}</TableCell><TableCell>{datosA[1].propuesta}</TableCell><TableCell>{datosA[2].propuesta}</TableCell><TableCell>{datosA[3].propuesta}</TableCell><TableCell>{datosA[4].propuesta}</TableCell><TableCell>{datosA[5].propuesta}</TableCell><TableCell>{datosA[6].propuesta}</TableCell><TableCell>{datosA[7].propuesta}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Cero</TableCell>
              <TableCell>{datosA[0].cero}</TableCell><TableCell>{datosA[1].cero}</TableCell><TableCell>{datosA[2].cero}</TableCell><TableCell>{datosA[3].cero}</TableCell><TableCell>{datosA[4].cero}</TableCell><TableCell>{datosA[5].cero}</TableCell><TableCell>{datosA[6].cero}</TableCell><TableCell>{datosA[7].cero}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell>Una</TableCell>  
                  <TableCell>{datosA[0].una}</TableCell><TableCell>{datosA[1].una}</TableCell><TableCell>{datosA[2].una}</TableCell><TableCell>{datosA[3].una}</TableCell><TableCell>{datosA[4].una}</TableCell><TableCell>{datosA[5].una}</TableCell><TableCell>{datosA[6].una}</TableCell><TableCell>{datosA[7].una}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Dos</TableCell>
                  <TableCell>{datosA[0].dos}</TableCell><TableCell>{datosA[1].dos}</TableCell><TableCell>{datosA[2].dos}</TableCell><TableCell>{datosA[3].dos}</TableCell><TableCell>{datosA[4].dos}</TableCell><TableCell>{datosA[5].dos}</TableCell><TableCell>{datosA[6].dos}</TableCell><TableCell>{datosA[7].dos}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Tres</TableCell>
                  <TableCell>{datosA[0].tres}</TableCell><TableCell>{datosA[1].tres}</TableCell><TableCell>{datosA[2].tres}</TableCell><TableCell>{datosA[3].tres}</TableCell><TableCell>{datosA[4].tres}</TableCell><TableCell>{datosA[5].tres}</TableCell><TableCell>{datosA[6].tres}</TableCell><TableCell>{datosA[7].tres}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Cuatro</TableCell>
                  <TableCell>{datosA[0].cuatro}</TableCell><TableCell>{datosA[1].cuatro}</TableCell><TableCell>{datosA[2].cuatro}</TableCell><TableCell>{datosA[3].cuatro}</TableCell><TableCell>{datosA[4].cuatro}</TableCell><TableCell>{datosA[5].cuatro}</TableCell><TableCell>{datosA[6].cuatro}</TableCell><TableCell>{datosA[7].cuatro}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Cinco</TableCell> 
                  <TableCell>{datosA[0].cinco}</TableCell><TableCell>{datosA[1].cinco}</TableCell><TableCell>{datosA[2].cinco}</TableCell><TableCell>{datosA[3].cinco}</TableCell><TableCell>{datosA[4].cinco}</TableCell><TableCell>{datosA[5].cinco}</TableCell><TableCell>{datosA[6].cinco}</TableCell><TableCell>{datosA[7].cinco}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Seis</TableCell>
                  <TableCell>{datosA[0].seis}</TableCell><TableCell>{datosA[1].seis}</TableCell><TableCell>{datosA[2].seis}</TableCell><TableCell>{datosA[3].seis}</TableCell><TableCell>{datosA[4].seis}</TableCell><TableCell>{datosA[5].seis}</TableCell><TableCell>{datosA[6].seis}</TableCell><TableCell>{datosA[7].seis}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Siete</TableCell>
                  <TableCell>{datosA[0].siete}</TableCell><TableCell>{datosA[1].siete}</TableCell><TableCell>{datosA[2].siete}</TableCell><TableCell>{datosA[3].siete}</TableCell><TableCell>{datosA[4].siete}</TableCell><TableCell>{datosA[5].siete}</TableCell><TableCell>{datosA[6].siete}</TableCell><TableCell>{datosA[7].siete}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Ocho</TableCell>
                  <TableCell>{datosA[0].ocho}</TableCell><TableCell>{datosA[1].ocho}</TableCell><TableCell>{datosA[2].ocho}</TableCell><TableCell>{datosA[3].ocho}</TableCell><TableCell>{datosA[4].ocho}</TableCell><TableCell>{datosA[5].ocho}</TableCell><TableCell>{datosA[6].ocho}</TableCell><TableCell>{datosA[7].ocho}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Nueve</TableCell>
                  <TableCell>{datosA[0].nueve}</TableCell><TableCell>{datosA[1].nueve}</TableCell><TableCell>{datosA[2].nueve}</TableCell><TableCell>{datosA[3].nueve}</TableCell><TableCell>{datosA[4].nueve}</TableCell><TableCell>{datosA[5].nueve}</TableCell><TableCell>{datosA[6].nueve}</TableCell><TableCell>{datosA[7].nueve}</TableCell>
              </TableRow>
            
            
            </TableBody>

          </Table>
          </CardContent>
          </Card> 
          <CSVLink data={datosA} separator=";" filename={`datosActividades_${sede}.csv`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Exportar Datos Primarios a CSV
          </Button>
        </CSVLink>
           </>:null  }
          </Grid>
        </Grid>
       
    </Container>
  )
}

export default ReporteAprobadasIngresantes