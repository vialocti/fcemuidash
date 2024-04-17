import {
  Box,
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
import {
  traerDetalleComisiones,
  traerNumerosComisiones,
} from "../../services/servicesCursadas";
import { CSVLink } from "react-csv";

const InfoMuestraComisiones = ({ anio, materia, sede }) => {
  const [totalInsc, setTotalInsc] = useState(0);
  const [totalRegulares, setTotalRegulares] = useState(0);
  const [detalleComisiones, setDetalleComisiones] = useState(0);
  const [totalReprobados, setTotalReprobados] = useState(null)
  const [totalAusentes, setTotalAusentes] = useState(null)
  const [totalPromocionados, setTotalPromocionados]= useState(0)
   const [indiceT, setIndiceT]=useState(0)
   const [indiceR, setIndiceR] = useState(0)
   const [indiceP, setIndiceP] = useState(0)  

  //console.log(anio, materia)
  
/*

  const tratarRegulares =(arrayD)=>{
     
    //const arraydatos=[]
      const dato={
        
        comision_name:'',
        aprobados:'0',
        reprobados:'0',
        ausentes:'0',
        promocionados:'0',
        total:0,
        porcentajeP:0.0,
        porcentajeR:0.0
      
      }

      for(const elemento of arrayD){
         //console.log(elemento.comision)
         
         dato.comision_name=elemento.nombre
         
         if(elemento.origen==='R'){
         if(elemento.resultado==='A'){
            dato.aprobados=elemento.count
         }

         if(elemento.resultado==='R'){
          dato.reprobados=elemento.count
         }

         if(elemento.resultado==='U'){
          dato.ausentes=elemento.count
         }
        }
        if(elemento.origen==='P' && elemento.resultado==='A')
          dato.promocionados=elemento.count

      }
      dato.total=Number(dato.ausentes) + Number(dato.reprobados)+ Number(dato.aprobados)
      dato.porcentajeP=Number(dato.promocionados)/dato.total
      dato.porcentajeR=Number(dato.aprobados)/dato.total
      return dato

  }

*/

  /*
  useEffect(() => {
    
    const getComisiones = async () => {
      setComisiones(await traerNumerosComisiones(anio, materia));
    };

    if (materia && anio) {
      getComisiones();
    }
    if(comisiones){
      let comisionesN = "";
      for (const elemento of comisiones) {
        //console.log(elemento);
        comisionesN += elemento.comision + ",";
      }
      comisionesN = comisionesN.substring(0, comisionesN.length - 1);
      setComisionesnro(comisionesN);

    }
  }, [materia, anio]);
*/
  /*
  if (comisiones) {
    console.log(comisiones);
  }
  */
/*
  useEffect(() => {
    const tratarnumeros = () => {
      let comisionesN = "";
      for (const elemento of comisiones) {
        //console.log(elemento);
        comisionesN += elemento.comision + ",";
      }
      comisionesN = comisionesN.substring(0, comisionesN.length - 1);
      setComisionesnro(comisionesN);
    };
 
    if (comisiones) {
      tratarnumeros();
    }
  }, [comisiones]);
*/


  useEffect(() => {
  
  const getDetalleComisiones = async () => {
      setDetalleComisiones(await traerDetalleComisiones(anio, materia, sede));
    };

 if (materia && anio && sede ) {
      getDetalleComisiones();
    }
  }, [anio, materia, sede]);

  useEffect(()=>{
    if(detalleComisiones){
    let cantiRegular = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.regular)}, 0)
    let cantiReprobado = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.reprobado)}, 0)
    let cantiAusente = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.ausente)}, 0)
    let cantiPromo = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.promocionado)}, 0)
    let cantiTotal = detalleComisiones.reduce((total,valorActual)=>{return total + parseInt(valorActual.total)}, 0)
    
   setTotalInsc(cantiTotal)
   setTotalRegulares(cantiRegular)
   setTotalReprobados(cantiReprobado)
   setTotalAusentes(cantiAusente)
   setTotalPromocionados(cantiPromo)
    let indicereg= cantiRegular/cantiTotal 
    let indicepro=cantiPromo/cantiTotal
    setIndiceR(indicereg)
    setIndiceP(indicepro)
    setIndiceT(indicereg * 0.7 + indicepro * 0.3)

   // console.log(cantiRegular,cantiPromo,cantiTotal, cantiReprobado, cantiAusente, indicereg, indicepro )
    }
  },[detalleComisiones])

  //formatear detalles
/*
  const formateardetalle = () => {
    let arrayR = null;
    let arrayPunto = [];

    //console.log(detalleComisiones);
    const  arrayNombres =[]
    for (const elemento of detalleComisiones) {
      arrayNombres.push(elemento.nombre)
    }
    let unicos = Array.from(new Set(arrayNombres))
    //console.log(unicos)
    //console.log(arrayNombres)
    
    for (let i=0;i<unicos.length;i++) {
    //console.log(unicos[i])  
    arrayR = detalleComisiones.filter((dato) => dato.nombre===unicos[i]);
    //arrayP = detalleComisiones.filter((dato) => dato.origen === "P");
  if(arrayR.length>0) { 
    //console.log(arrayR)
    arrayPunto.push(tratarRegulares(arrayR))
    
  }
  //console.log(muestraResu)
}
setMuestraResu(arrayPunto)
console.log(arrayPunto)
  
  };
 /*
  useEffect(() => {
    
    if(detalleComisiones){
    formateardetalle()
    }   
  }, [detalleComisiones])
  
/*
  if (detalleComisiones) {
    //console.log(detalleComisiones);
    formateardetalle();
  }
*/
console.log(detalleComisiones)
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={10} md={10}>
          <Box component="Paper" sx={{ p: 3 }}>
            <Typography variant="h5">Materia: {materia} </Typography>
            {indiceT>0?
            <TableContainer>
              <Table>
                <TableHead>
                    <TableCell>Inscriptos</TableCell>
                    <TableCell>Regulares</TableCell>
                    <TableCell>Repobados</TableCell>
                    <TableCell>Ausentes</TableCell>
                    <TableCell>Promocionados</TableCell>
                    <TableCell>Indice Regulares</TableCell>
                    <TableCell>Indice promocion</TableCell>
                    <TableCell>Indice Cursada</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableHead>
                <TableBody>
                  <TableCell>{totalInsc}</TableCell>
                    <TableCell>{totalRegulares}</TableCell>
                    <TableCell>{totalReprobados}</TableCell>
                    <TableCell>{totalAusentes}</TableCell>
                    <TableCell>{totalPromocionados}</TableCell>
                    <TableCell>{indiceR.toFixed(2)}</TableCell>
                    <TableCell>{indiceP.toFixed(2)}</TableCell>
                    <TableCell>{indiceT.toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableBody>
              </Table>
            </TableContainer>
            :null}
          </Box>
        </Grid>
        <Grid item xs={12} md={2} sx={{mt:2}}>
               {detalleComisiones ?
                        <Button variant='outlined'>
                        
                        <CSVLink data={detalleComisiones} filename={materia +"Resultado" +  ".csv"}>Exportar</CSVLink>
                       
                        </Button> :null 
                  }              

          </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Box component="Paper" sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Periodo</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Promocionados</TableCell>
                    <TableCell>Regulares</TableCell>
                    <TableCell>Reprobados</TableCell>
                    <TableCell>Ausentes</TableCell>
                    <TableCell>Total Insc.</TableCell>
                    <TableCell>Regul.Relacion</TableCell>
                    <TableCell>Promoc.Relacion</TableCell>
                    <TableCell>Indice</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detalleComisiones
                    ? detalleComisiones.map((dato, index) => (
                        <TableRow key={index}>
                          <TableCell>{dato.periodo}</TableCell>
                          <TableCell>{dato.nombre}</TableCell>
                          <TableCell>{dato.promocionado}</TableCell>
                          <TableCell>{dato.regular}</TableCell>
                          <TableCell>{dato.reprobado}</TableCell>
                          <TableCell>{dato.ausente}</TableCell>
                          <TableCell>{dato.total}</TableCell>
                          <TableCell>{dato.porccentajeR.toFixed(2)}</TableCell>
                          <TableCell>{dato.porccentajeP.toFixed(2)}</TableCell>
                          <TableCell>{(dato.porccentajeR.toFixed(2) * 0.7 + dato.porccentajeP.toFixed(2)*0.3).toFixed(2)}</TableCell>
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
