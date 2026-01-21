import { Grid, Card, CardContent, Typography } from '@mui/material';


export default function ResumenMetricas({ data, promedios }) {
    const stats = [
        { label: 'Total Inscriptos', value: data.reduce((a, b) => a + b.total_inscriptos, 0), color: '#1976d2' },
        { label: 'Relacion Regulares', value: `${promedios.relacion_regular}`, color: '#2e7d32' },
        { label: 'Relacion Promoción', value: `${promedios.relacion_promocion}`, color: '#ed6c02' },
        { label: 'Indice Cursada', value: promedios.indice_cursada, color: '#9c27b0' },
        { label: 'Indice Ciclo Corto', value: promedios.indice_e1, color: '#9c27b0' },
        { label: 'Indice Ciclo Largo', value: promedios.indice_e2, color: '#9c27b0' },
    ];

    return (
        <Grid container spacing={2} sx={{ mb: 3 }}>
            {stats.map((s, i) => (
                <Grid item xs={12} sm={2} key={i}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography color="textSecondary" variant="caption" gutterBottom>{s.label}</Typography>
                            <Typography variant="h5" sx={{ color: s.color, fontWeight: 'bold' }}>{s.value}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

        </Grid>
    );
}