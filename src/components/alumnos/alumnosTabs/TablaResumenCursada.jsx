import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TablaResumenCursada = ({ aniosCursada }) => {
  if (!aniosCursada) return null;

  return (
    <>
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
    </>
  );
};

export default TablaResumenCursada;
