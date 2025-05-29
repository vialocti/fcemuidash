import {
  Box,
  CircularProgress,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
/*
import {
  datosHistoricosResultados,
  traerDetalleComisiones,
  traerNumerosComisiones,
} from "../../services/servicesCursadas";

*/import { CSVLink } from "react-csv";

const InfoMuestraComisiones = ({ resumenM, datosComi, materia,anio}) => {
  //const [totalInsc, setTotalInsc] = useState(0);
  //const [totalRegulares, setTotalRegulares] = useState(0);
  const [detalleComisiones, setDetalleComisiones] = useState(0);
  /*
  const [totalReprobados, setTotalReprobados] = useState(0)
  const [totalAusentes, setTotalAusentes] = useState(0)
  const [totalPromocionados, setTotalPromocionados]= useState(0)
  const [totalAprobadosE1, setTotalAprobadosE1] = useState(0)
  const [totalAprobadosE2, setTotalAprobadosE2] = useState(0)
  const [indiceT, setIndiceT]=useState(0)
   const [indiceR, setIndiceR] = useState(0)
   const [indiceP, setIndiceP] = useState(0)  
   const [indiceE1, setIndiceE1]=useState(0)
   const [indiceTE1, setIndiceTE1] = useState(0)
   const [indiceE2, setIndiceE2]=useState(0)
   const [indiceTE2, setIndiceTE2] = useState(0)
   //const[datosHistoricos, setDatosHistoricos]=useState(null)
  
  useEffect(()=>{
    if(datosHistoricos){
    //console.log(datosHistoricos[0].total_inscriptos)
    }
  },[datosHistoricos])
*/
  useEffect(() => {
  
  const getDetalleComisiones = async () => {
      setDetalleComisiones(datosComi);
    
     // console.log(sede,sedeh)
     // setDatosHistoricos(await datosHistoricosResultados(anio-1, anio-1,sede, materia))
    };

 if (datosComi ) {
      getDetalleComisiones();
    }
  }, [datosComi]);
/*
  useEffect(()=>{
    if(detalleComisiones){
    let cantiRegular = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.regular)}, 0)
    let cantiReprobado = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.reprobado)}, 0)
    let cantiAusente = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.ausente)}, 0)
    let cantiPromo = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.promocionado)}, 0)
    let cantiAprobE1 = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.examenuno)},0)
    let cantiAprobE2 = detalleComisiones.reduce((total, valorActual)=>{return total + parseInt(valorActual.examendos)},0)
    let cantiTotal = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.total)}, 0)
    
   setTotalInsc(cantiTotal)
   setTotalRegulares(cantiRegular)
   setTotalReprobados(cantiReprobado)
   setTotalAusentes(cantiAusente)
   setTotalPromocionados(cantiPromo)
   setTotalAprobadosE1(cantiAprobE1)
   setTotalAprobadosE2(cantiAprobE2)

    let indicereg= cantiRegular/cantiTotal 
    let indicepro=cantiPromo/cantiTotal
    let indicee1 = cantiAprobE1 / cantiTotal
    let indicee2 = cantiAprobE2 / cantiTotal

    setIndiceR(indicereg)
    setIndiceP(indicepro)
    setIndiceE1(indicee1)
    setIndiceE2(indicee2)
    setIndiceT(indicereg * 0.7 + indicepro * 0.3)
    setIndiceTE1(indicereg * 0.7 + (indicepro + indicee1)* 0.3)
    setIndiceTE2(indicereg * 0.7 + (indicepro + indicee2) * 0.3)
   // console.log(cantiRegular,cantiPromo,cantiTotal, cantiReprobado, cantiAusente, indicereg, indicepro )
    }
  },[detalleComisiones])
*/
  
console.log('H')
console.log(datosComi)
  return (
    <Container maxWidth='false'>
      <Grid container>
        <Grid item xs={12} sm={10} md={10}>
          <Box component="Paper" sx={{ p: 3 }}>
            <Typography variant="h5">Materia: {materia} - {anio} </Typography>
            {resumenM.indiceT>0?
            <TableContainer>
              <Table>
                <TableHead>
                    <TableCell>Inscriptos</TableCell>
                    <TableCell>Regulares</TableCell>
                    <TableCell>Libres</TableCell>
                    <TableCell>Libres*</TableCell>
                    <TableCell>Promocionados</TableCell>
                    <TableCell>Aprob.E1</TableCell>
                    <TableCell>Aprob.E2</TableCell>
                    <TableCell>%Regulares</TableCell>
                    <TableCell>%Promocion</TableCell>
                    <TableCell>%Aprob.E1</TableCell>
                    <TableCell>%Aprob.E2</TableCell>
                    <TableCell>Indice Cursada</TableCell>
                    <TableCell>Indice CC</TableCell>
                    <TableCell>Indice CL</TableCell>
                    
                </TableHead>
                <TableBody>
                  <TableCell>{resumenM.totalInsc}</TableCell>
                    <TableCell>{resumenM.totalRegulares}</TableCell>
                    <TableCell>{resumenM.totalReprobados}</TableCell>
                    <TableCell>{resumenM.totalAusentes}</TableCell>
                    <TableCell>{resumenM.totalPromocionados}</TableCell>
                    <TableCell>{resumenM.totalAprobadosE1}</TableCell>
                    <TableCell>{resumenM.totalAprobadosE2}</TableCell>
                    <TableCell>{resumenM.indiceR}</TableCell>
                    <TableCell>{resumenM.indiceP}</TableCell>
                    <TableCell>{resumenM.indiceE1}</TableCell>
                    <TableCell>{resumenM.indiceE2}</TableCell>
                    <TableCell><strong>{resumenM.indiceT}</strong></TableCell>
                    <TableCell><strong>{resumenM.indiceTE1}</strong></TableCell>
                    <TableCell><strong>{resumenM.indiceTE2}</strong></TableCell>
                    
                </TableBody>
              </Table>
            </TableContainer>
            :null}
{/*
{datosHistoricos && datosHistoricos.length > 0 ?<>
             <h4>AÑO ANTERIOR - {anio-1}</h4>
            <TableContainer>
              <Table>
                <TableHead>
                    <TableCell>Inscriptos</TableCell>
                    <TableCell>Regulares</TableCell>
                    <TableCell>Libres</TableCell>
                    <TableCell>Libres*</TableCell>
                    <TableCell>Promocionados</TableCell>
                    <TableCell>Aprob.E1</TableCell>
                    <TableCell>Aprob.E2</TableCell>
                    <TableCell>%Regulares</TableCell>
                    <TableCell>%Promocion</TableCell>
                    <TableCell>%Aprob.E1</TableCell>
                    <TableCell>%Aprob.E2</TableCell>
                    <TableCell>Indice Cur.</TableCell>
                    <TableCell>Indice CC</TableCell>
                    <TableCell>Indice CL</TableCell>
                    
                </TableHead>
                <TableBody>
                  <TableCell>{datosHistoricos[0].total_inscriptos}</TableCell>
                    <TableCell>{datosHistoricos[0].regulares}</TableCell>
                    <TableCell>{datosHistoricos[0].reprobados}</TableCell>
                    <TableCell>{datosHistoricos[0].ausentes}</TableCell>
                    <TableCell>{datosHistoricos[0].promocionados}</TableCell>
                    <TableCell>{datosHistoricos[0].aprobadase1}</TableCell>
                    <TableCell>{datosHistoricos[0].aprobadase2}</TableCell>
                    <TableCell>{datosHistoricos[0].relacion_regular}</TableCell>
                    <TableCell>{datosHistoricos[0].relacion_promocion}</TableCell>
                    <TableCell>{datosHistoricos[0].relacion_e1}</TableCell>
                    <TableCell>{datosHistoricos[0].relacion_e2}</TableCell>
                    <TableCell><strong>{datosHistoricos[0].indice_cursada}</strong></TableCell>
                    <TableCell><strong>{datosHistoricos[0].indice_e1}</strong></TableCell>
                    <TableCell><strong>{datosHistoricos[0].indice_e2}</strong></TableCell>
                    
                </TableBody>
              </Table>
            </TableContainer>
            </>:null}
            */}
          </Box>
        </Grid>
        <Grid item xs={12} md={2} sx={{mt:2}}>
             
               {detalleComisiones ?
                        <Button variant='outlined'>
                        
                        <CSVLink data={detalleComisiones} separator={";"} filename={materia +"Resultado" +  ".csv"}>Exportar</CSVLink>
                       
                        </Button> : 
                                <Box sx={{ display: 'flex' }}>
                
                                 <CircularProgress  />
                       </Box>
      
                  }              

          </Grid>

        <Grid item xs={12} sm={12} md={12}>
        <h4>DETALLE COMISIONES</h4>
          <Box component="Paper" sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Periodo</TableCell>
                    <TableCell>Nombre</TableCell> 
                    <TableCell>Tot.Insc.</TableCell>
                    <TableCell>Reg.</TableCell>
                    <TableCell>Libres</TableCell>
                    <TableCell>Libres*</TableCell>
                   <TableCell>Prom.</TableCell>
                   <TableCell>AprobE1</TableCell>
                   <TableCell>AprobE2</TableCell>
                    <TableCell>%Reg.</TableCell>
                    <TableCell>%Prom.</TableCell>
                    <TableCell>%Aprob.E1</TableCell>
                    <TableCell>%Aprob.E2</TableCell>
                    <TableCell>Ind.C</TableCell>
                    <TableCell>Ind.CC</TableCell>
                    <TableCell>Ind.CL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detalleComisiones
                    ? detalleComisiones.map((dato, index) => (
                        <TableRow key={index}>
                          <TableCell>{dato.periodo}</TableCell>
                          <TableCell>{dato.nombre}</TableCell> 
                          <TableCell>{dato.total}</TableCell>
                          <TableCell>{dato.regular}</TableCell>
                          <TableCell>{dato.reprobado}</TableCell>
                          <TableCell>{dato.ausente}</TableCell>
                         <TableCell>{dato.promocionado}</TableCell>
                         <TableCell>{dato.examenuno}</TableCell>
                         <TableCell>{dato.examendos}</TableCell>
                          <TableCell>{dato.porccentajeR.toFixed(2)}</TableCell>
                          <TableCell>{dato.porccentajeP.toFixed(2)}</TableCell>
                          <TableCell>{dato.porcentaje1E.toFixed(2)}</TableCell>
                          <TableCell>{(dato.examendos/dato.total).toFixed(2)}</TableCell>
                          <TableCell><strong>{(dato.porccentajeR.toFixed(2) * 0.7 + dato.porccentajeP.toFixed(2)*0.3).toFixed(2)}</strong></TableCell>
                          <TableCell><strong>{(dato.porccentajeR.toFixed(2) * 0.7 + (dato.porcentaje1E + dato.porccentajeP)*0.3).toFixed(2)}</strong></TableCell>
                          <TableCell><strong>{(dato.porccentajeR.toFixed(2) * 0.7 + ((dato.examendos/dato.total) + dato.porccentajeP)*0.3).toFixed(2)}</strong></TableCell>

                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InfoMuestraComisiones;
