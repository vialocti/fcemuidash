import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import React from 'react';

//const parse = (value) => Number(value) || 0;

const TablaPorSede = ({ alumnosSede }) => (
  <>
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
                      <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCPmza + alumnosSede.cantiCP26mza}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLA19 + alumnosSede.cantiLA98 + alumnosSede.cantiLA26}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLE19 + alumnosSede.cantiLE98 + alumnosSede.cantiLE26}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiLLOmza + alumnosSede.cantiLLO2mza}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}></TableCell>
                      <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCPNmza}</TableCell> 
                      <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiCP26mza + alumnosSede.cantiLA26  + alumnosSede.cantiLE26 + alumnosSede.cantiCPmza + alumnosSede.cantiCPNmza + alumnosSede.cantiLA19 + alumnosSede.cantiLA98 + alumnosSede.cantiLE19 + alumnosSede.cantiLE98 + alumnosSede.cantiLLOmza + alumnosSede.cantiLLO2mza}</strong></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SAN RAFAEL</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCPsr + alumnosSede.cantiCP26sr}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}></TableCell>
                      <TableCell style={{ textAlign: 'right' }}></TableCell>
                      <TableCell style={{ textAlign: 'right' }}></TableCell>
                      <TableCell style={{ textAlign: 'right' }}></TableCell>
                      <TableCell style={{ textAlign: 'right' }}>{alumnosSede.cantiCPNsr}</TableCell> 
                      <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiCPsr  + alumnosSede.cantiCP26sr + alumnosSede.cantiCPNsr}</strong></TableCell>
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
                      <TableCell style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLLOeste + alumnosSede.cantiLLO2este + alumnosSede.cantiLNRGeste}</strong></TableCell>
                      </TableRow>
                    <TableRow>
                      <TableCell>TOTAL</TableCell>
                      <TableCell  style={{ textAlign: 'right' }} ><strong>{alumnosSede.cantiCPmza + alumnosSede.cantiCPsr + alumnosSede.cantiCP26mza + alumnosSede.cantiCP26sr}</strong></TableCell>
                      <TableCell  style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLA19 + alumnosSede.cantiLA98 + alumnosSede.cantiLA26}</strong></TableCell>
                      <TableCell  style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLE19 + alumnosSede.cantiLE98 + alumnosSede.cantiLE26}</strong></TableCell>
                      <TableCell  style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiLLOmza + alumnosSede.cantiLLO2mza + alumnosSede.cantiLLOeste + alumnosSede.cantiLLO2este}</strong></TableCell>
                      <TableCell  style={{ textAlign: 'right' }}><strong>{parseInt(alumnosSede.cantiLNRGgval) + parseInt(alumnosSede.cantiLNRGeste)}</strong></TableCell>
                      <TableCell  style={{ textAlign: 'right' }}><strong>{alumnosSede.cantiCPNmza + alumnosSede.cantiCPNsr}</strong></TableCell>
                      <TableCell  style={{ textAlign: 'right' }}><strong>{ alumnosSede.cantiCP26mza + alumnosSede.cantiCP26sr + alumnosSede.cantiLA26 + alumnosSede.cantiLE26 +  alumnosSede.cantiLA98 + alumnosSede.cantiLA19 + alumnosSede.cantiLE98 + alumnosSede.cantiLE19 + alumnosSede.cantiCP + alumnosSede.cantiLLO + alumnosSede.cantiLLO2 + alumnosSede.cantiLNRG + alumnosSede.cantiCPN}</strong></TableCell>
   
                    </TableRow>
   
   
                                  
                  </TableBody>
                
                </Table>
          </TableContainer>
  </>
);

export default TablaPorSede;
