import React, { useEffect ,useState} from 'react'
import { traerdatosComisionesIngresantes } from '../../services/servicesUtils'
import { Alert, Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Typography } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";
import TableComponent from '../aprobadasanio/TableComponent';
import jsPDF from 'jspdf'
import {autoTable} from 'jspdf-autotable'

import logo from '../../assets/images/logo-economicas.png'
import { sendDataForAnalysis } from '../../services/servicesChatGpt';


const ReporteDatosActividades = ({anio,fecha}) => {
    
    const [datos, setDatos]=useState(null)
    const propuestas =[2,3,8]
    const [actividades, setActividades]= useState(null)
    const [datosProcesados, setDatosProcesados]=useState(null)
    const [diferenciaPorcentual, setDiferenciaPorcentual]=useState(null)
    const [concluciones, setConcluciones]= useState('')
    const [datoR, setDatoR]=useState(null)
    //const [actividadCPanio, setActividadCPanio]=useState(null)

    //const [actividadLAanioA, setActividadLAanioA]=useState(null)
    //const [totalIAA, setTotalAA]=useState(0)
    //const [totalIA, setTotalA]=useState(0)
  
    
    const localizedTextsMap = {
        columnMenuUnsort: "No Orden",
        columnMenuSortAsc: "Orden Asc",
        columnMenuSortDesc: "Orden Desc",
        columnMenuFilter: "Filtro",
        columnMenuHideColumn: "Ocultar",
        columnMenuManageColumns: "Admin Columnas"
        
      };
    
    const columns = [
        {
          field: "anio",
          headerName: "Año",
          type: "number",
          width: 80,
          editable: false,
        },
        {
          field: "codigomat",
          headerName: "Cod.Activ.",
          type: "string",
          width: 80,
          editable: false,
        },
        {
          field: "nombremat",
          headerName: "Actividad",
          type: "string",
          width: 300,
          editable: false,
        },
        {
          field: "propuesta",
          type: "number",
          headerName: "Propuesta",
          width: 100,
          editable: false,
        },
        {
          field: "aprobadas",
          type: "number",
          headerName: "Aprobadas",
          width: 100,
          editable: false,
        },
        {
          field: "relap",
          type: "number",
          headerName: "Rel.Ap.",
          width: 100,
          editable: false,
        },
        {
          field: "libres",
          type: "number",
          headerName: "Libres",
          width: 100,
          editable: false,
        },
        {
          field: "rellibres",
          type: "number",
          headerName: "Rel.Lib",
          width: 100,
          editable: false,
        },
        {
          field: "regulares",
          type: "number",
          headerName: "Regulares",
          width: 100,
          editable: false,
        },
        {
          field: "relreg",
          type: "number",
          headerName: "Rel.Reg.",
          width: 100,
          editable: false,
        },
      ];
    
    
    
    useEffect(()=>{

        const traerDatos =async ()=>{
          //console.log(anio,fecha)
          const resu =await traerdatosComisionesIngresantes(anio, fecha) 
          const filteredRows = resu.filter((row) => row.aniocursada === 1);
          setDatos(filteredRows)
        }   
        traerDatos()
     }, [anio, fecha])
     
    useEffect(()=>{
       
      
          if(datos){
            
            propuestas.forEach(prop =>{
                //console.log(prop)
                const nombresUnicos = [...new Set(datos.map(materia => materia.nombremat))];

                setActividades(nombresUnicos);
                const datosAgrupados = datos.reduce((acumulador, actual) => {
                  const clave = `${actual.anio}_${actual.nombremat}`;
                  
                  if (!acumulador[clave]) {
                      acumulador[clave] = {
                          anio: actual.anio,
                          nombreact: actual.nombremat,
                          aprobadas: 0,
                          libres:0,
                          regulares:0
                      };
                  }
                  
                  acumulador[clave].aprobadas += parseInt(actual.aprobadas, 10);
                  acumulador[clave].libres += parseInt(actual.libres, 10);
                  acumulador[clave].regulares += parseInt(actual.regulares, 10);
                  return acumulador;
              }, {});
               
                const resultadoFinal = Object.values(datosAgrupados);
                console.log(resultadoFinal)
                function transformarDatos(data) {
                  const resultado = {};
              
                  data.forEach(({ anio, nombreact, aprobadas, libres, regulares }) => {
                      if (!resultado[nombreact]) {
                          resultado[nombreact] = { nombreact };
                      }
                      
                      resultado[nombreact][`aprobadas${anio}`] = aprobadas;
                      resultado[nombreact][`libres${anio}`] = libres;
                      resultado[nombreact][`regulares${anio}`] = regulares;
                  });
              
                  return Object.values(resultado);
              }
              const resultado =transformarDatos(resultadoFinal)
              
              function calcularPorcentajes(data, anio, anioA) {
                return data.map((materia) => {
                  [anioA, anio].forEach((anio) => {
                    let total =
                      (materia[`aprobadas${anio}`] || 0) +
                      (materia[`libres${anio}`] || 0) +
                      (materia[`regulares${anio}`] || 0);
              
                    if (total > 0) {
                      materia[`aprobadas${anio}_%`] = ((materia[`aprobadas${anio}`] || 0) / total * 100).toFixed(2) + "%";
                      materia[`libres${anio}_%`] = ((materia[`libres${anio}`] || 0) / total * 100).toFixed(2) + "%";
                      materia[`regulares${anio}_%`] = ((materia[`regulares${anio}`] || 0) / total * 100).toFixed(2) + "%";
                    } else {
                      materia[`aprobadas${anio}_%`] = "0%";
                      materia[`libres${anio}_%`] = "0%";
                      materia[`regulares${anio}_%`] = "0%";
                    }
                  });
              
                  return materia;
                });
              }
              
              const resultadoDEF=calcularPorcentajes(resultado, anio, anio-1)
              setDatosProcesados(resultadoDEF)


              function calcularDiferenciaPorcentajes(data, anio, anioA) {
                return data.map((materia) => {
                  let aprKey1 = `aprobadas${anioA}_%`;
                  let libKey1 = `libres${anioA}_%`;
                  let regkey1 = `regulares${anioA}_%`;
                  let aprKey2 = `aprobadas${anio}_%`;
                  let libKey2 = `libres${anio}_%`;
                  let regkey2 = `regulares${anio}_%`;

                  let diferenciaAprobadas = (
                    parseFloat(materia[aprKey2]) - parseFloat(materia[aprKey1])
                  ).toFixed(2);
              
                  let diferenciaLibres = (
                    parseFloat(materia[libKey2]) - parseFloat(materia[libKey1])
                  ).toFixed(2);

                  let diferenciaRegulares = (
                    parseFloat(materia[regkey2]) - parseFloat(materia[regkey1 ])
                  ).toFixed(2);
              
                  return {
                    nombreact: materia.nombreact,
                    diferenciaAprobadas: diferenciaAprobadas + "%",
                    diferenciaLibres: diferenciaLibres + "%",
                    diferenciaRegulares:diferenciaRegulares + "%",
                  };
                });
              }
              const diferenciaporcentaje=calcularDiferenciaPorcentajes(resultadoDEF, anio, anio-1)
              setDiferenciaPorcentual(diferenciaporcentaje)
            })
            
                    
            // Convertir a array real y mapear
          
       
        }
       
    }, [datos])
    
    useEffect(()=>{

      const enviarMessage=async()=>{
        setDatoR(await sendDataForAnalysis(diferenciaPorcentual) )
      }

      if(diferenciaPorcentual){
        enviarMessage()
      }
    }, [diferenciaPorcentual])
    
      useEffect(()=>{

        if(datoR){
          setConcluciones(concluciones.concat(datoR))
        }
      },[datoR])




     function formatearFecha(fechaStr) {
        // Array con los nombres de los meses
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
      
        // Convertir el string de fecha a un objeto Date
        let fecha = new Date(fechaStr + "T00:00:00");
        // console.log(fechaStr,'-' ,fecha)
        // Obtener el mes y el día
        let mes = meses[fecha.getMonth()]; // getMonth() devuelve un índice de 0 a 11
        let dia = fecha.getDate(); // getDate() devuelve el día del mes
      
        // Devolver la cadena formateada
        return `Mes: ${mes}, Día: ${dia}`;
      }

    //
    ///
    ////
    const generateColumns = (data, baseKeys = ["aprobadas", "libres", "regulares"]) => {
      // Extraer los años a partir de las claves de los datos
      const yearsSet = new Set();
      data.forEach(row => {
        Object.keys(row).forEach(key => {
          // Verificamos para cada baseKey si la clave empieza con ella y NO es de porcentaje
          baseKeys.forEach(base => {
            if (key.startsWith(base) && !key.includes("_%")) {
              // Extraer la parte numérica (ej. de "aprobadas2022" extrae "2022")
              const yearPart = key.substring(base.length);
              if (yearPart && !isNaN(parseInt(yearPart))) {
                yearsSet.add(parseInt(yearPart)); // guardamos como número
              }
            }
          });
        });
      });
      
      // Convertir el conjunto a un array y ordenar numéricamente (ascendente o descendente según convenga)
      const sortedYears = Array.from(yearsSet).sort((a, b) => a - b);
      
      // Construir las columnas: siempre incluimos la columna fija "Materia"
      const columns = [{ header: "Materia", dataKey: "nombreact" }];
      
      // Opcional: agregar una columna para "Total" si existe
      if (data[0]?.total !== undefined) {
        columns.push({ header: "Ingresantes", dataKey: "total" });
      }
      
      // Para cada año, agregar las columnas dinámicas
      sortedYears.forEach(year => {
        columns.push({ header: `Aprobadas ${year}`, dataKey: `aprobadas${year}` });
        columns.push({ header: `Libres ${year}`, dataKey: `libres${year}` });
        columns.push({ header: `Regulares ${year}`, dataKey: `regulares${year}` });
        columns.push({ header: `Aprobadas ${year} %`, dataKey: `aprobadas${year}_%` });
        columns.push({ header: `Libres ${year} %`, dataKey: `libres${year}_%` });
        columns.push({ header: `Regulares ${year} %`, dataKey: `regulares${year}_%` });
      });
      
      return columns;
    };
    

    /////
    
    
    
      
        const generarPdf = () => {
          // Crear el documento en orientación vertical y usando 'px' como unidad.
          const doc = new jsPDF('l', 'px');
          console.log(datosProcesados)
          // Definir márgenes y dimensiones
          const marginLeft = 20;
          const marginTop = 20;
          const pageWidth = doc.internal.pageSize.width;
          const pageHeight = doc.internal.pageSize.height;
          const maxWidth = pageWidth - marginLeft * 2;
          
          // Agregar logo si existe (ajusta la posición y dimensiones según necesites)
          if (logo) {
            doc.addImage(logo, "PNG", 5, 5, 50, 15);
          }
          
          // Encabezado: Título y detalles
          doc.setFontSize(16);
          doc.text('Reporte Actividades Ingresantes', 100, marginTop + 5);
          
          doc.setFontSize(12);
          doc.text(
            `Año Ingreso: ${anio}  Fecha Referencia: ${fecha === '0' ? 'Ciclo Lectivo' : fecha}`,
            marginLeft,
            marginTop + 30
          );
          doc.text('Datos', marginLeft, marginTop + 50);
          const columns = generateColumns(datosProcesados)
        
          // Usar autoTable para insertar la tabla a partir de los datos
          doc.autoTable({
            startY: 60,
            head: [columns.map(col => col.header)],
            body: datosProcesados.map(row => columns.map(col => row[col.dataKey])),
            styles: { fontSize: 8, cellPadding: 4 },
            theme: 'grid',
            margin: { left: 20, right: 20 }
          });
          
          // Obtener la posición actual luego de la tabla.
          let currentY = doc.lastAutoTable.finalY + 20;          
          // Agregar bloque de texto para las conclusiones.
          doc.setFontSize(12);
          doc.text('Conclusiones de IA ChatGPT', marginLeft, currentY);
          currentY += 20;
          
          // Preparar el texto de conclusiones para que se ajuste al ancho máximo.
          const wrappedText = doc.splitTextToSize(concluciones, maxWidth);
          doc.setFontSize(10);
          
          // Imprimir línea a línea controlando el salto de página.
          wrappedText.forEach((line) => {
            // Si se supera el borde inferior de la página, se agrega una nueva página y se reinicia currentY.
            if (currentY + 12 > pageHeight - marginTop) {
              doc.addPage();
              currentY = marginTop;
            }
            doc.text(line, marginLeft, currentY);
            currentY += 12;
          });
          
          // Finalmente, guardar el PDF.
          doc.save('datos.pdf');
        };
      

    
    



   // console.log(datos)
    return (
        
        <Container maxWidth='fluid'>
            <Grid container>
            <Grid item xs={12} md={12}>
                {!datos ?
                    <Box sx={{marginInline:5, marginTop:2}}><Alert severity='info'><Typography variant='h6'>...Procesando Datos</Typography></Alert></Box>:null}
                    <Typography variant='h5'>Año de Ingreso: {anio}</Typography> <Typography variant='h5'>Fecha Referencia: {fecha==='0'?'Ciclo Lectivo Completo(31/03)':formatearFecha(fecha)}</Typography>
                    
          
                {datos ? <>
           
                  



                <hr/>

                {datosProcesados ?
                <div>
                <Typography variant='h4' component='h2'>Estadísticas Actividades</Typography>
                <TableComponent data={datosProcesados} />
                </div>
                :null}
                 <hr />


      
      {diferenciaPorcentual? 

      <div>
       {concluciones===''?
      
      <Box sx={{marginInline:5, marginTop:2}}><Alert severity='warning'><Typography variant='h6'>Por favor espere un momento...</Typography></Alert></Box>
        
        :<>
        <Box>
            <Typography>Analisis de los datos por ChatGpt AI</Typography>
       
            <TextareaAutosize
                minRows={5}
                value={concluciones} // Usa value en lugar de children
                readOnly
                style={{ width: "100%", marginTop: "10px", padding: "10px" }}
            />
        </Box>
        
          <Button variant='outlined' onClick={generarPdf}>Generar Pdf</Button>
          </>
        }
        <hr />

         <Typography variant='h4' component='h2'>Estadísticas Actividades - Diferencia Absoluta de Porcentuales </Typography>        
      <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell><strong>Actividad</strong></TableCell>
            <TableCell align="center"><strong>Diferencia Aprobadas</strong></TableCell>
            <TableCell align="center"><strong>Diferencia Libres</strong></TableCell>
            <TableCell align="center"><strong>Diferencia Regulares</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diferenciaPorcentual.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.nombreact}</TableCell>
              <TableCell align="center">{row.diferenciaAprobadas}</TableCell>
              <TableCell align="center">{row.diferenciaLibres}</TableCell>
              <TableCell align="center">{row.diferenciaRegulares}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></div>:null}
          <hr />        
                <div style={{ height: 600, width: "80%" }}>
                 <Typography variant='h4' component='h2'>Estadísticas Actividades / Propuesta - Datos Primarios</Typography>

            <DataGrid
              rows={datos}
              columns={columns}
              getRowId={(row) => `${row.anio}-${row.propuesta}-${row.codigomat}`}
              localeText={localizedTextsMap}
              initialState={{
                sorting: {
                    sortModel: [
                       
                      { field: 'nombremat', sort: 'asc' },
                      { field: 'anio', sort: 'asc' },
                   
                    ],
                  },
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
                 </>
                :
                
                null }
            </Grid>


         
         </Grid>
        
        </Container>
  
)
}

export default ReporteDatosActividades