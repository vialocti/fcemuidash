export const styles = {
    // Estilos del contenedor principal
    container: {
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        padding: '20px',
        backgroundColor: '#f4f7fa',
        minHeight: '100vh',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '25px',
    },
    // Estilos de la tarjeta genérica
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '300px',
    },
    cardTitle: {
        fontSize: '1.6em',
        fontWeight: '600',
        color: '#333',
        marginBottom: '10px',
    },
    cardMetric: {
        fontSize: '2.8em',
        fontWeight: 'bold',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    },
    cardMetricValue: {
        marginRight: '10px',
    },
    cardSubtitle: {
        fontSize: '0.9em',
        color: '#666',
        marginBottom: '20px',
    },
    chartPlaceholder: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '15px',
        marginTop: '15px',
        position: 'relative',
        minHeight: '150px',
    },
    chartText: {
        color: '#999',
        fontSize: '1.1em',
        position: 'absolute',
        top: '10px',
        left: '10px',
    },
    // Estilos para los indicadores de cambio
    changeIndicator: (isIncrease) => ({
        color: isIncrease ? '#28a745' : '#dc3545',
        marginLeft: '5px'
    })
};
