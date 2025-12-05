import DashboardCard from './DashboardCard';
// components/cards/ActiveStudentsCard.jsx
import React from 'react';
// Si usaras una librería, importarías aquí el componente de gráfico


const EstudiantesActivos = () => {
    return (
        <DashboardCard
            title={'Estudiantes'}
            total={4000}
            change={-7}
            subtitle={'nada'}
        >
          
           
        </DashboardCard>
    );
};

export default EstudiantesActivos;
