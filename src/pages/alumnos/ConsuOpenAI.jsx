import 'jspdf-autotable';

import { Box, Button, Checkbox, CircularProgress, Container, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { analizarDatosAlumnos, constructorSQL } from '../../services/servicesChatGpt';
import { useEffect, useState } from 'react';

import CpuLoaderMUI from '../common/CpuLoaderMUI';
import DynamicTable from '../../components/comunes/DynamicTable';
import jsPDF from 'jspdf';


const ConsuOpenAI = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("Espere luego de la consulta, un análisis de los datos...");
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [conclusion, setConclusion] = useState(false);
    const [animation, setAnimation]=useState(false)
    const handleAsk = async () => {
        setAnswer("Espere luego de la consulta, un análisis de los datos...");
        setDatos([]);
        setAnimation(true)
        try {
            const response = await constructorSQL(question + ", utiliza conversiones si es necesario ");
            if (response.data !== "error") {
                setDatos(response.data);
                setAnimation(false)
            }
        } catch (error) {
            setAnswer("Error en la conexión con el servidor");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const generarConsulta = async () => {
            try {
                let respuesta = await analizarDatosAlumnos(datos);
                setAnswer(respuesta);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (datos && datos.length < 70 && datos.length > 1 && conclusion) {
            setLoading(true);
            generarConsulta();
        }
    }, [datos, conclusion]);

    const generarPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Reporte de Consulta", 14, 20);

        doc.setFontSize(10);
        doc.text("Pregunta:", 14, 30);
        doc.text(question, 14, 35, { maxWidth: 180 });

        doc.text("Respuesta:", 14, 45);
        const respuestaTexto = doc.splitTextToSize(answer, 180);
        doc.text(respuestaTexto, 14, 50);

        doc.save("reporte_consulta_openai.pdf");
    };
    
    return (
        <Container maxWidth='false'>
         <Grid container>

         <Grid item xs={12} md={12} sx={{mr:1}}>
        
        <Typography variant='h5'>Consultas utilizando lenguaje Natural sobre Alumnos-tabla Alumnos_info </Typography>
        
     
       </Grid>

       <Grid item xs={12} md={4}>
            
            <Paper elevation={3} sx={{ mt:2, p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Pregunta sin miedo:
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Escribe tu pregunta..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleAsk}
                >
                    Preguntar
                </Button>
                <FormControlLabel
                    control={<Checkbox checked={conclusion} onChange={(e) => setConclusion(e.target.checked)} />}
                    label="Generar conclusión"
                    sx={{ mt: 2 }}
                />
              
            </Paper>
           </Grid>

           {animation?
                <Grid
                item
                xs={12}
                md={8}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '300px', // o usa height: '100vh' si quieres ocupar toda la pantalla
                }}
              >
                    <CpuLoaderMUI />
                 </Grid>
              
                : <Grid item xs={12} md={8}>
        
        {datos && datos.length > 0 ? (
  <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Tabla de Datos
    </Typography>
    <DynamicTable data={datos} />
  </Paper>
) :null}        

        </Grid>}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ mt:2, p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Conclusión
                </Typography>
                {loading ? (
                    <Box display="flex" alignItems="center">
                        <CircularProgress size={24} sx={{ mr: 2 }} />
                        <Typography>Generando conclusión...</Typography>
                    </Box>
                ) : (
                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>{answer}</Typography>
                )}
            </Paper>

            <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 4 }}
                onClick={generarPDF}
            >
                Generar Reporte PDF
            </Button>
            </Grid>

        </Grid>

        </Container>
    );
};

export default ConsuOpenAI;
