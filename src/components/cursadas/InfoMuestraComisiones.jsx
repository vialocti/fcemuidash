import {
  Box,
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

const InfoMuestraComisiones = ({ anio, materia }) => {
  const [comisiones, setComisiones] = useState(null);
  const [comisionesnro, setComisionesnro] = useState("");
  const [detalleComisiones, setDetalleComisiones] = useState(null);
  const [muestraResu, setMuestraResu] = useState(null)
  



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
      setDetalleComisiones(await traerDetalleComisiones(anio, materia));
    };

 if (materia && anio) {
      getDetalleComisiones();
    }
  }, [anio, materia]);

  //formatear detalles

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
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box component="Paper" sx={{ p: 3 }}>
            <Typography variant="h4">Materia:{materia}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Box component="Paper" sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Promocionados</TableCell>
                    <TableCell>Regulares</TableCell>
                    <TableCell>Reprobados</TableCell>
                    <TableCell>Ausentes</TableCell>
                    <TableCell>Total Insc.</TableCell>
                    <TableCell>Regul.Relacion</TableCell>
                    <TableCell>Promoc.Relacion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {muestraResu
                    ? muestraResu.map((dato, index) => (
                        <TableRow key={index}>
                          <TableCell>{dato.comision_name}</TableCell>
                          <TableCell>{dato.promocionados}</TableCell>
                          <TableCell>{dato.aprobados}</TableCell>
                          <TableCell>{dato.reprobados}</TableCell>
                          <TableCell>{dato.ausentes}</TableCell>
                          <TableCell>{dato.total}</TableCell>
                          <TableCell>{dato.porcentajeR.toFixed(2)}</TableCell>
                          <TableCell>{dato.porcentajeP.toFixed(2)}</TableCell>
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
