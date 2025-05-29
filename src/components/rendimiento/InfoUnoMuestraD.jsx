import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

const InfoUnoMuestraD = ({ infoalu }) => {

  const [mostrar, setMostrar]= useState(true)
  //const [rows, setRows] = useState([]);
  const [porcentaje, setPorcentaje] = useState([]);
  const [intervalos, setIntervalos] = useState(null);
  const [minimo, setMinimo] = useState(0);
  const [maximo, setMaximo] = useState(0);
  const [media, setMedia] = useState(0.0);
  const [varianza, setVarianza]=useState(0.0)
  const [desvEstandar, setDesvEstandar] = useState(0.0);
  //datos de coef de tcarrera
  const [porcentajeT, setPorcentajeT] = useState([]);
  const [intervalosT, setIntervalosT] = useState(null);
  const [minimoT, setMinimoT] = useState(0);
  const [maximoT, setMaximoT] = useState(0);
  const [mediaT, setMediaT] = useState(0.0);
  const [varianzaT, setVarianzaT]=useState(0.0)
  const [desvEstandarT, setDesvEstandarT] = useState(0.0);
 
  const localizedTextsMap = {
    columnMenuUnsort: "No Orden",
    columnMenuSortAsc: "Orden Asc",
    columnMenuSortDesc: "Orden Desc",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Ocultar",
    columnMenuManageColumns: "Admin Columnas"
    
  };

  //llena dos array con valores de %carrera y 
  const convertir = (infoalu) => {
    let completo = [];
    let completoT = [];
    console.log(infoalu)
    for (const alumno of infoalu) {
    
      completo.push(Number(alumno.completado))
      completoT.push(Number(alumno.coef_tcarrera))
      
    }
    setPorcentaje(completo);
    setPorcentajeT(completoT);
  };

  //////fin carga array

  useEffect(() => {
    const getTratamiento = () => {
      convertir(infoalu);
    };
    getTratamiento();
  }, [infoalu]);

  /*
 
*/

  useEffect(() => {
    //pararevisar luego y optimiza
    const calculoVariancia = (media) => {
      let variacumula = 0;

      for (let i = 0; i < porcentaje.length; i++) {
        let rango;

        rango = Math.pow(porcentaje[i] - media, 2);
        variacumula = variacumula + rango;
      }
      setVarianza(variacumula);
      setDesvEstandar(Math.sqrt(variacumula / porcentaje.length));
    };

    const calculoIntervalos = () => {
      let ArrayI = [];
      let interOb = {};
      let intervalo = "";
      let total = 0;

      let valores = [];
      for (let i = 10; i <= 100; i = i + 10) {
        if (i === 10) {
          valores = porcentaje.filter((valor) => valor <= i);
          intervalo = "0 a 10";
        
        } else {
          valores = porcentaje.filter((valor) => valor <= i && valor >= i-9);
          intervalo = String(i - 9) + " a " + String(i);
          console.log(valores)
        }
        total = valores.length;
        interOb = {
          intervalo,
          total,
        };
        //console.log(interOb);
        ArrayI.push(interOb);
      }
      
      setIntervalos(ArrayI);
     // console.log(ArrayI)
    };

    /////tiempo luego fucionar
    const calculoVarianciaT = (mediaT) => {
      let variacumula = 0;

      for (let i = 0; i < porcentajeT.length; i++) {
        let rango;

        rango = Math.pow(porcentajeT[i] - media, 2);
        variacumula = variacumula + rango;
      }
      setVarianzaT(variacumula);
      setDesvEstandarT(Math.sqrt(variacumula / porcentajeT.length));
    };

    const calculoIntervalosT = () => {
      let ArrayI = [];
      let interOb = {};
      let intervalo = "";
      let total = 0;

      let valores = [];
      for (let i = 2; i < 13; i = i + 2) {
        if (i === 2) {
          valores = porcentajeT.filter((valor) => valor <= i);
          intervalo = "0 a 2";

        }else if(i===12){
          valores = porcentajeT.filter((valor) => valor > i-2);
          intervalo = ">10";
          
        } else {
          valores = porcentajeT.filter((valor) => valor <= i && valor > i - 2);
          intervalo = String(i - 2) + " a " + String(i);
        }
        total = valores.length;
        interOb = {
          intervalo,
          total,
        };
       // console.log(interOb);
        ArrayI.push(interOb);
      }
      //console.log(ArrayI)
      setIntervalosT(ArrayI);
    };

    //tiempos coeficiente
    if (porcentajeT.length > 0) {
      let suma = porcentajeT.reduce(
        (valori, acumulador) => (acumulador += valori)
      );
      let mediaT = suma / porcentajeT.length;
      setMediaT(mediaT);
      setMinimoT(Math.min(...porcentajeT));
      setMaximoT(Math.max(...porcentajeT));
      
      calculoVarianciaT(mediaT);
      calculoIntervalosT();
    
    }

    if (porcentaje.length > 0) {
      let suma = porcentaje.reduce(
        (valori, acumulador) => (acumulador += valori)
      );
      let media = suma / porcentaje.length;
      setMedia(media);
      setMinimo(Math.min(...porcentaje));
      setMaximo(Math.max(...porcentaje));
      calculoVariancia(media);
      calculoIntervalos();
    }
  }, [porcentaje, porcentajeT]);



  const columns = [
    {
      field: "legajo",
      headerName: "Lejajo",
      type: "string",
      width: 100,
      editable: false,
    },
    {
      field: "estudiante",
      headerName: "Estudiante",
      type: "string",
      width: 250,
      editable: false,
    },
    {
      field: "aprobadas",
      headerName: "Aprob.",
      type: "number",
      width: 100,
      editable: false,
    },
    {
      field: "reprobadas",
      type: "number",
      headerName: "Aplaz",
      width: 100,
      editable: false,
    },
    {
      field: "regularesap",
      type: "number",
      headerName: "Reg.Ap",
      width: 100,
      editable: false,
    },
    {
      field: "promedioca",
      type: "number",
      headerName: "Promedio",
      width: 100,
      editable: false,
    },
    {
      field: "completado",
      type: "number",
      headerName: "%Carrera",
      width: 100,
      editable: false,
    },
   /* {
      field: "por_relativo",
      type: "number",
      headerName: "Comp_Fecha",
      width: 100,
      editable: false,
    },*/
    {
      field: "coef_tcarrera",
      type: "number",
      headerName: "coefTiempo",
      width: 100,
      editable: false,
    },
  ];


  const cambiardatos=()=>{
    setMostrar(true)
  }

  const cambiardatosP=()=>{
    setMostrar(false)
  }
  return (
    <Container>
      <Grid container>
        
        <Grid item xs={12} md={12} lg={12} sx={{ml:2,mt:1}}>
          <Button variant='contained'onClick={cambiardatos} sx={{marginRight:'50px'}}>Coeficiente de Tiempo</Button> 
          <Button variant='contained'onClick={cambiardatosP}>Porcentaje Avance</Button>
          <hr />
          {mostrar?<Typography variant="h5">Coeficiente de Tiempo - Propuesta</Typography>:  <Typography variant="h5">Porcentaje de Avance - Propuesta</Typography>}
          <hr />
          </Grid>
        {mostrar?<Box>
        
        <Grid item xs={12} md={12} lg={12} sx={{ p: 2 }}>
          <TableContainer component={Paper}>
               <Typography variant="h5">Valores Estadisticos</Typography>
            <Table>
             
              <TableHead>
                
                <TableRow>
                  <TableCell>Muestra</TableCell>
                  <TableCell>Media</TableCell>
                  <TableCell>Maximo</TableCell>
                  <TableCell>Minimo</TableCell>
                  <TableCell>Desv.Estandar</TableCell>
                  <TableCell>Coef.Variación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{infoalu.length}</TableCell>
                  <TableCell>{mediaT.toFixed(2)}</TableCell>
                  <TableCell>{maximoT}</TableCell>
                  <TableCell>{minimoT}</TableCell>
                  <TableCell>{desvEstandarT.toFixed(2)}</TableCell>
                  <TableCell>{(desvEstandarT / mediaT).toFixed(3)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{ p: 2 }}>
          <TableContainer component={Paper}>
          <Typography variant="h5">Distribución de la Muestra</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>0-2</TableCell>
                  <TableCell>2-4</TableCell>
                  <TableCell>4-6</TableCell>
                  <TableCell>6-8</TableCell>
                  <TableCell>8-10</TableCell>
                  <TableCell>+10</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {intervalos ? (
                  <TableRow>
                    <TableCell align="left">{intervalosT[0].total}</TableCell>
                    <TableCell align="left">{intervalosT[1].total}</TableCell>
                    <TableCell align="left">{intervalosT[2].total}</TableCell>
                    <TableCell align="left">{intervalosT[3].total}</TableCell>
                    <TableCell align="left">{intervalosT[4].total}</TableCell>
                    <TableCell align="left">{intervalosT[5].total}</TableCell>
                    
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
       
        </Box>
        :<Box>
      
        <Grid item xs={12} md={12} lg={12} sx={{ p: 2 }}>
          <TableContainer component={Paper}>
          <Typography variant="h5">Valores Estadisticos</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Muestra</TableCell>
                  <TableCell>Media</TableCell>
                  <TableCell>Maximo</TableCell>
                  <TableCell>Minimo</TableCell>
                  <TableCell>Desv.Estandar</TableCell>
                  <TableCell>Coef.Variación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{infoalu.length}</TableCell>
                  <TableCell>{media.toFixed(2)}</TableCell>
                  <TableCell>{maximo}</TableCell>
                  <TableCell>{minimo}</TableCell>
                  <TableCell>{desvEstandar.toFixed(2)}</TableCell>
                  <TableCell>{(desvEstandar / media).toFixed(3)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{ p: 2 }}>
          <TableContainer component={Paper}>
          <Typography variant="h5">Distribución de la Muestra</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>0-10</TableCell>
                  <TableCell>11-20</TableCell>
                  <TableCell>21-30</TableCell>
                  <TableCell>31-40</TableCell>
                  <TableCell>41-50</TableCell>
                  <TableCell>51-60</TableCell>
                  <TableCell>61-70</TableCell>
                  <TableCell>71-80</TableCell>
                  <TableCell>81-90</TableCell>
                  <TableCell>91-100</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {intervalos ? (
                  <TableRow>
                    <TableCell align="left">{intervalos[0].total}</TableCell>
                    <TableCell align="left">{intervalos[1].total}</TableCell>
                    <TableCell align="left">{intervalos[2].total}</TableCell>
                    <TableCell align="left">{intervalos[3].total}</TableCell>
                    <TableCell align="left">{intervalos[4].total}</TableCell>
                    <TableCell align="left">{intervalos[5].total}</TableCell>
                    <TableCell align="left">{intervalos[6].total}</TableCell>
                    <TableCell align="left">{intervalos[7].total}</TableCell>
                    <TableCell align="left">{intervalos[8].total}</TableCell>
                    <TableCell align="left">{intervalos[9].total}</TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        </Box>
      }
      


        <Grid item xs={12} md={12} sx={{ p: 2 }}>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={infoalu}
              columns={columns}
              getRowId={(row) => row.alumno}
              localeText={localizedTextsMap}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InfoUnoMuestraD;
//{!--- <Typography>Varianza: {varianza.toFixed(2)}</Typography>--}
