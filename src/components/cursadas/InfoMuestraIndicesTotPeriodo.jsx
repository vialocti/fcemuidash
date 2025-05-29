import { Box, Container, Grid, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
//import LineChartMultIndicesTot from '../../utils/graphics/LinesChartMultIndicesTot'
//import BarChartMultIndicesTot from '../../utils/graphics/BarChartMultIndicesTot'
//import BarChartMultIndicesTotICL from '../../utils/graphics/BarChartMultIndicesTotICL'

import BarChartMultIndicesPACLP from '../../utils/graphics/BarChartMultIndicesPACLP'
import BarChartMultIndicesPACLC from '../../utils/graphics/BarChartMultIndicesPACLC'
import BarChartMultIndicesPACLL from '../../utils/graphics/BarChartMultIndicesPACLLP'
import LineChartIndice from '../../utils/graphics/indices/LineChartIndice'
//import LineChartTotales from '../../utils/graphics/indices/LineChartTotales'
import BarChartTotales from '../../utils/graphics/indices/BarCharTotales'

const InfoMuestraIndicesTotPeriodo = ({datosI}) => {
     const [tabIndex, setTabIndex] = useState(0);
      
    
      const handleChange = (event, newValue) => setTabIndex(newValue);
    
    console.log(datosI)
    return (
    <Container maxWidth='xl'>
            <Grid container spacing={6} sx={{ justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        
            
        <Table>
              <TableHead>
                <TableRow>
                    <TableCell>AÑO</TableCell>
                    <TableCell>INSCRIPC. </TableCell>
                    <TableCell>REGULARES </TableCell>
                    <TableCell>LIBRES </TableCell>
                    <TableCell>LIBRES* </TableCell>
                    <TableCell>PROMOCIONAN</TableCell>
                    <TableCell>APR.CC </TableCell>
                    <TableCell>APR.CL </TableCell>
                    <TableCell>IND.CURSADA </TableCell>
                    <TableCell>IND.CCORTO</TableCell>
                    <TableCell>IND.CLARGO</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {datosI.map((element,index)=>(
                    <TableRow key={index}>
                       <TableCell>{element.anio_academico}</TableCell>
                        <TableCell><Typography variant='h6'>{element.totalInscriptos}</Typography></TableCell>
                        <TableCell><Typography variant='h6'>{element.totalRegulares}({(element.totalRegulares/element.totalInscriptos).toFixed(2)}%)</Typography></TableCell>
                        <TableCell><Typography variant='h6'>{element.totalDesaprobados}({(element.totalDesaprobados/element.totalInscriptos).toFixed(2)}%)</Typography></TableCell>
                        <TableCell><Typography variant='h6'>{element.totalAusentes}({(element.totalAusentes/element.totalInscriptos).toFixed(2)}%)</Typography></TableCell>
                        <TableCell><Typography variant='h6'>{element.totalPromocionados}({(element.totalPromocionados/element.totalInscriptos).toFixed(2)}%)</Typography></TableCell>
                        <TableCell><Typography variant='h6'>{element.totalaprobadascc}({(element.totalaprobadascc/element.totalInscriptos).toFixed(2)}%)</Typography></TableCell>
                        <TableCell><Typography variant='h6'>{element.totalaprobadascl}({(element.totalaprobadascl/element.totalInscriptos).toFixed(2)}%)</Typography></TableCell>
                        <TableCell><Typography variant='h6'>{element.promedioindicecursada}</Typography></TableCell>
                        <TableCell><Typography variant='h6'>{element.promedioindicecorto}</Typography></TableCell>
                        <TableCell><Typography variant='h6'>{element.promedioindicelargo}</Typography></TableCell>
                    </TableRow>
                ))

                }
            </TableBody>

        </Table>
        
        
        
        <Grid item xs={12} md={12} sx={{ height: '450px', width: '80%' }}>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="Tabs de visualización">
          <Tab label="Datos Cursadas" />
          <Tab label="Datos Indices" />
          <Tab label="Datos Aprobadas" />
        </Tabs>
      </Box>

      <Box hidden={tabIndex !== 0} sx={{ height: '450px', width: '50%' }}>
      <Typography variant='h6'>Inscripciones, Regulares, Libres, Libres* y Promocinados</Typography>
        
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      
  <Box sx={{ flex: 1, minWidth: 300 }}>
    <BarChartTotales datos={datosI} tipo="inscriptos" />
  </Box>
  <Box sx={{ flex: 1, minWidth: 300 }}>
    <BarChartTotales datos={datosI} tipo="regulares" />
  </Box>
  <Box sx={{ flex: 1, minWidth: 300 }}>
    <BarChartTotales datos={datosI} tipo="libres" />
  </Box>
  <Box sx={{ flex: 1, minWidth: 300 }}>
    <BarChartTotales datos={datosI} tipo="libresA" />
  </Box>
  <Box sx={{ flex: 1, minWidth: 300 }}>
    <BarChartTotales datos={datosI} tipo="promocionados" />
  </Box>
</Box>

      </Box>
 
<Box hidden={tabIndex !== 1} sx={{ height: '450px', width: '100%' }}>
  <Typography variant='h6' mb={2}>
    Indices de Cursada, Ciclo Corto, Ciclo Largo
  </Typography>

 
 <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
  
  <Box sx={{ flex: 1 }}>
    <LineChartIndice datos={datosI} tipo="cursada" />
  </Box>
  <Box sx={{ flex: 1 }}>
    <LineChartIndice datos={datosI} tipo="corto" />
  </Box>
  <Box sx={{ flex: 1 }}>
    <LineChartIndice datos={datosI} tipo="largo" />
  </Box>

</Box>
</Box>
<Box hidden={tabIndex !== 2} sx={{ height: '450px', width: '100%' }}>
  <Typography variant='h6' mb={2}>
    Promocionados. AprobC.Corto, AprobC.Largo
  </Typography>

  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
    <Box sx={{ flex: 1 }}>
      <BarChartMultIndicesPACLP datos={datosI} />
    </Box>
    <Box sx={{ flex: 1 }}>
      <BarChartMultIndicesPACLC datos={datosI} />
    </Box>
    <Box sx={{ flex: 1 }}>
      <BarChartMultIndicesPACLL datos={datosI} />
    </Box>
  </Box>
</Box>



      
      </Grid>
        </Grid>
        
{/** 
        <Grid container spacing={6} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} md={5} sx={{ height: '450px', width: '50%' }}>
                <Typography variant='h6'>Inscrip, Regulares, Libres, Libres*, Prom.</Typography>
                <BarChartMultIndicesTot datos={datosI} />
            </Grid>

            <Grid item xs={12} md={5} sx={{ height: '450px', width: '50%' }}>
            <Typography variant='h6'>Indice Cursada, Ciclo Corto, Ciclo largo</Typography>
                <BarChartMultIndicesTotICL datos={datosI} />
            </Grid>
        </Grid>*/}
    </Container>
  )
}

export default InfoMuestraIndicesTotPeriodo