import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CSVLink } from "react-csv";



const ReporteComisiones = ({datosSimulados}) => {

  console.log(datosSimulados)
  const [datos, setDatos] = useState(datosSimulados);
  const [expandido, setExpandido] = useState(null);

  const manejarExpansion = (indice) => {
    setExpandido(expandido === indice ? null : indice);
  };
  
  return (
    <Container maxWidth="fluid">
      <Typography variant="h4" gutterBottom>
        Reporte de comisiones y contactos docentes
      </Typography>

      <TableContainer component={Paper}  style={{ maxHeight: 500 }}>
      
        <Table stickyHeader>
          <TableHead>
            <TableRow>
          
              <TableCell>CodAc</TableCell>
              <TableCell>Actividad</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Regul.</TableCell>
              <TableCell>Repr.</TableCell>
              <TableCell>Aus.</TableCell>
              <TableCell>Promo</TableCell>
              <TableCell>Apr.CC</TableCell>
              <TableCell>Apr.CL</TableCell>
              {/** 
              <TableCell>Rel.Reg</TableCell>
              <TableCell>Rel.Prom</TableCell>
              <TableCell>Rel.AprCC</TableCell>
              <TableCell>Rel.AprCL</TableCell>
              */}
              <TableCell>Ind.Cur</TableCell>
              <TableCell>Ind.CC</TableCell>
              <TableCell>Ind.CL</TableCell>
              <TableCell>+ Contacto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos? datos.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>{row.codmat}</TableCell>
                  <TableCell>{row.actividad}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.regulares}</TableCell>
                  <TableCell>{row.reprobados}</TableCell>
                  <TableCell>{row.ausentes}</TableCell>
                  <TableCell>{row.promocionados}</TableCell>
                  <TableCell>{row.aprobadose1}</TableCell>
                  <TableCell>{row.aprobadose2}</TableCell>
                  {/** 
                  <TableCell>{row.relreg}</TableCell>
                  <TableCell>{row.relpro}</TableCell>
                  <TableCell>{row.relape1}</TableCell>
                  <TableCell>{row.relape2}</TableCell> 
                  */}
                  <TableCell>{row.indicec}</TableCell>
                  <TableCell>{row.indicee1}</TableCell>
                  <TableCell>{row.indicee2}</TableCell>
                  
                  <TableCell>
                    <IconButton onClick={() => manejarExpansion(index)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {expandido === index && (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Accordion expanded>
                        <AccordionSummary>
                          <Typography variant="subtitle1">Docentes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{row.contacto}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                )}

                </React.Fragment>
            )):null}
          </TableBody>
        </Table>
      </TableContainer>
        {datos? <><CSVLink data={datos} separator=";" filename={`datoscomisiones_.csv`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Exportar Datos Primarios a CSV
          </Button>
        </CSVLink>
        </>
        :null}
    </Container>
  );
};

export default ReporteComisiones;
