import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '@mui/material';

const BarChartSimple = ({ data, color }) => {
    const theme = useTheme();

    // Convertimos el objeto de datos {mza: 10, sr: 5...} al formato que Recharts entiende
    const chartData = Object.entries(data || {}).map(([key, value]) => ({
        name: key.toUpperCase(),
        value: value
    }));

    // Lógica de color segura: 
    // Si 'color' es un hex (#...), lo usamos. 
    // Si no, intentamos buscarlo en el tema. 
    // Si falla, usamos el primario por defecto.
    const getBarColor = () => {
        if (color?.startsWith('#')) return color;
        return theme.palette[color]?.main || theme.palette.primary.main;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    style={{ fontSize: '12px', fontWeight: 600 }}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    style={{ fontSize: '12px' }}
                />
                <Tooltip 
                    cursor={{ fill: '#f5f5f5' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor()} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartSimple;