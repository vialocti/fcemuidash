import React from 'react';
import { styles } from '../styles/styles.js'

const renderChangeIndicator = (value) => {
    const isIncrease = value >= 0;
    const arrow = isIncrease ? '↑' : '↓';
    return (
        <span style={styles.changeIndicator(isIncrease)}>
            {arrow} {Math.abs(value)}% {isIncrease ? 'increase' : 'decrease'}
        </span>
    );
};

const DashboardCard = ({ title, total, change, subtitle, children }) => {
    return (
        <div style={styles.card}>
            <h2 style={styles.cardTitle}>{title}</h2>
            <div style={styles.cardMetric}>
                <span style={styles.cardMetricValue}>{total.toLocaleString()}</span>
                {renderChangeIndicator(change)}
            </div>
            {subtitle && <p style={styles.cardSubtitle}>{subtitle}</p>}
            <div style={styles.chartPlaceholder}>
                {children}
            </div>
        </div>
    );
};

export default DashboardCard