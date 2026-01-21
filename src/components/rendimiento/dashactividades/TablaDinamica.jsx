import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function TablaDinamica({ rows, columnas, fieldComparator, avgValue }) {

    const getRowColor = (valor, promedio) => {
        if (!fieldComparator || promedio === undefined) return 'inherit';

        const v = Number(valor);
        const p = Number(promedio);

        if (v === 0) return '#ffcdd2'; // Rojo intenso (0)
        if (v >= p * 1.19) return '#c8e6c9'; // Verde (+20% del promedio)
        if (v >= p) return '#e3f2fd'; // Celeste (>= promedio)
        return '#ffebee'; // Rojo claro (< promedio)
    };

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: 2 }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        {columnas.map(col => (
                            <TableCell key={col.id} sx={{ fontWeight: 'bold', bgcolor: '#f8f9fa' }}>
                                {col.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                backgroundColor: getRowColor(row[fieldComparator], avgValue),
                                transition: 'background-color 0.3s ease',
                                '&:hover': { filter: 'brightness(0.95)' } // Efecto hover sutil
                            }}
                        >
                            {columnas.map(col => (
                                <TableCell key={col.id}>
                                    {/* Formateo simple para números decimales si existen */}
                                    {typeof row[col.id] === 'number' && !Number.isInteger(row[col.id])
                                        ? row[col.id].toFixed(2)
                                        : row[col.id]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}