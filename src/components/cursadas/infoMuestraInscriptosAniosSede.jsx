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


const InfoMuestraInscriptosAniosSede = ({ sede, materias, anio }) => {

  const [sedeN, setSedeN]=useState(' Mendoza')
  const [actividad, setActividad]=useState('')
  const [muestra, setMuestra] = useState(null)
  console.log('anio' + anio)

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
      width: 450,
      editable: false,
    },
    {
      field: "total",
      headerName: String(anio)+"(IA)",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "total1",
      headerName: String(anio-1)+"(IA)",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "total2",
      headerName: String(anio-2)+"(IA)",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "total3",
      headerName: String(anio-3)+"(IA)",
      type: "Number",
      width: 80,
      editable: false,
    },

    {
      field: "total4",
      headerName: String(anio-4)+"(IA)",
      type: "Number",
      width: 80,
      editable: false,
    },

    {
      field: "totaR",
      headerName: String(anio)+"(IR)",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "totaR1",
      headerName: String(anio-1)+"(IR)",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "totaR2",
      headerName: String(anio-2)+"(IR)",
      type: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "totaR3",
      headerName: String(anio-3)+"(IR)",
      type: "Number",
      width: 80,
      editable: false,
    },

    {
      field: "totaR4",
      headerName: String(anio-4)+"(IR)",
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
