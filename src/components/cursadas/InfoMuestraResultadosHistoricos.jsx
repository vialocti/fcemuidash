import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { CSVLink } from "react-csv";
import React, { useEffect, useState } from "react";


const InfoMuestraResultadosHistoricos = ({ sede,resultados,materia}) => {

  const [sedeN, setSedeN]=useState(' Mendoza')
  const [actividad, setActividad]=useState('')
  const [muestra, setMuestra] = useState(null)
 
  
  
  const localizedTextsMap = {
    columnMenuUnsort: "No Orden",
    columnMenuSortAsc: "Orden Asc",
    columnMenuSortDesc: "Orden Desc",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Ocultar",
    columnMenuManageColumns: "Admin Columnas"
    
  };

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
    setActividad(materia)
    setMuestra(resultados)
 
  },[resultados])

  
  const columns = [
    {
      field: "recursado",
      headerName: "T.comi",
      type: "String",
      width: 80,
      editable: false,
    },
    {
      field: "anio_academico",
      headerName: "Año",
      type: "number",
      width: 80,
      editable: false,
    },
    {
      field: "actividad_nombre",
      headerName: "Actividad",
      type: "String",
      width: 300,
      editable: false,
    },
    {
      field: "total_inscriptos",
      headerName: "Inscrip.",
      type: "Number",
      width: 100,
      editable: false,
    },
    
    {
      field: "regulares",
      headerName: "Regul.",
      type: "Number",
      width: 120,
      editable: false,
    },
    {
      field: "reprobados",
      headerName: "Libr.",
      type: "Number",
      width: 120,
      editable: false,
    },

    {
      field: "ausentes",
      headerName: "Libr.*",
      type: "Number",
      width: 120,
      editable: false,
    },
    {
      field: "promocionados",
      headerName: "Prom.",
      type: "Number",
      width: 120,
      editable: false,
    },
    {
      field: "aprobadase1",
      headerName: "Apr.CC",
      type: "Number",
      width: 120,
      editable: false,
    },
    {
      field: "aprobadase2",
      headerName: "Apr.CL.",
      type: "Number",
      width: 120,
      editable: false,
    },
    {
      field: "indice_cursada",
      headerName: "I.Cur.",
      type: "Number",
      width: 120,
      editable: false,
    },

    {
      field: "indice_e1",
      headerName: "I.CCort.",
      type: "Number",
      width: 120,
      editable: false,
    },

    {
      field: "indice_e2",
      headerName: "I.CLarg.",
      type: "Number",
      width: 120,
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
              localeText={localizedTextsMap}
              getRowId={(row) => row.id}
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
      <CSVLink data={resultados} separator={";"} filename={`datosActividades_${sede}.csv`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Exportar Datos Primarios a CSV
          </Button>
        </CSVLink>
    </Container>
  );
};

export default InfoMuestraResultadosHistoricos;
