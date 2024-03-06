import {
  Box,
  Container,
  Grid,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, gridColumnFieldsSelector, gridRowGroupingNameSelector, gridRowsLoadingSelector} from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";


const InfoMuestraInscriptosAniosSede = ({ sede, materias }) => {

  const [sedeN, setSedeN]=useState(' Mendoza')
  const [actividad, setActividad]=useState('')
  const [muestra, setMuestra] = useState(null)

  useEffect(()=>{
    if(sede==='1'){
      setSedeN(' Mendoza')
    }else if(sede==='2'){
      setSedeN(' San Rafael')
      
    }else if(sede==='3'){
      setSedeN(' Gral.Alvear')
    }else if(sede==='4'){
      setSedeN(' Este')
    }
    setActividad('')
    setMuestra(materias)
  },[materias])

  
  const columns = [
    {
      field: "materia",
      headerName: "Actividad",
      type: "string",
      width: 230,
      editable: false,
    },
    {
      field: "total",
      headerName: "IAño",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "total1",
      headerName: "IAño-1",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "total2",
      headerName: "IAño-2",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "total3",
      headerName: "IAño-3",
      type: "Number",
      width: 80,
      editable: false,
    },

    {
      field: "total4",
      headerName: "IAño-4",
      type: "Number",
      width: 80,
      editable: false,
    },

    {
      field: "totaR",
      headerName: "ByRAño",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "totaR1",
      headerName: "ByRAño-1",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "totaR2",
      headerName: "ByRAño-2",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "totaR3",
      headerName: "ByRAño-3",
      type: "Number",
      width: 80,
      editable: false,
    },

    {
      field: "totaR4",
      headerName: "RyBAño-4",
      type: "Number",
      width: 80,
      editable: false,
    },

  ];

  const onSelectionChanged = (e) => {
    

    console.log(e);
   // setSelectedRowNotes(data && data.Notes);
   // setSelectedRowPicture(data && data.Picture);
  };
  
  return (
      

    <Container maxWidth='false'> 
      <Grid Container>
        <Grid item xs={12} sm={12} md={6}>
          <Box component="Paper" sx={{ p: 3 }}>
            <Typography variant="h4">Sede:{sedeN}</Typography>
          </Box>
        </Grid>
        {muestra ?
        <Grid item xs={12} md={12} sx={{ p: 2 }}>
          <div style={{ height: 610, width: "100%" }}>
            <DataGrid
              rows={muestra}
              columns={columns}
              getRowId={(row) => row.materia}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              
              
              
            />
          </div>
        </Grid>:null}

      
      </Grid>
    </Container>
  );
};

export default InfoMuestraInscriptosAniosSede;

/*
  <Grid item xs={12} sm={12} md={12}>
          <Box component="Paper" sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    
                    <TableCell>Nombre Actividad</TableCell>
                    <TableCell>Insc</TableCell>
                    <TableCell>InscA-1</TableCell>
                    <TableCell>InscA-2</TableCell>
                    <TableCell>InscA-3</TableCell>
                    <TableCell>InscA-4</TableCell>
                    <TableCell>ByR</TableCell>
                    <TableCell>ByR-1</TableCell>
                    <TableCell>ByR-2</TableCell>
                    <TableCell>ByR-3</TableCell>
                    <TableCell>ByR-4</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {muestra
                    ? muestra.map((dato, index) => (
                        <TableRow key={index}>
                          
                          <TableCell>{dato.materia}</TableCell>
                          <TableCell>{dato.total}</TableCell>
                          <TableCell>{dato.total1}</TableCell>
                          <TableCell>{dato.total2}</TableCell>
                          <TableCell>{dato.total3}</TableCell>
                          <TableCell>{dato.total4}</TableCell>
                          <TableCell>{dato.totaR}</TableCell>
                          <TableCell>{dato.totaR1}</TableCell>
                          <TableCell>{dato.totaR2}</TableCell>
                          <TableCell>{dato.totaR3}</TableCell>
                          <TableCell>{dato.totaR4}</TableCell>
                          
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        */
