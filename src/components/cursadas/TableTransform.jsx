import React from "react";

// Componente que transforma y muestra los datos en una tabla
// Props:
//   data: Array de objetos con la estructura original.
//   referenceYear: Año de referencia (por defecto 2024).
const TableTransform = ({ data, referenceYear = 2024 }) => {
  // Filtramos las propiedades que corresponden a los años anteriores.
  // Asumimos que las columnas para años anteriores tienen el formato "total1", "total2", etc.
  const prevYearColumns = Object.keys(data[0]).filter(
    (key) => key.startsWith("total") && key !== "total"
  );

  return (
    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Materia</th>
          <th>Inscriptos {referenceYear}</th>
          {prevYearColumns.map((col, index) => {
            // Extraemos el número del sufijo, por ejemplo, de "total1" obtenemos "1"
            const suffix = col.replace("total", "");
            // Calculamos el año correspondiente: año de referencia menos el sufijo
            const year = referenceYear - parseInt(suffix, 10);
            return (
              <th key={index}>% Aceptados {year}</th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>{row.materia}</td>
            <td>{row.total}</td>
            {prevYearColumns.map((col, index) => {
              // Para cada columna, se usa el mismo sufijo para encontrar los datos rechazados:
              // "totaR" + sufijo.
              const suffix = col.replace("total", "");
              const accepted = parseInt(row[col], 10) || 0;
              const rejected = parseInt(row[`totaR${suffix}`], 10) || 0;
              const sum = accepted + rejected;
              const percentage = sum > 0 ? ((accepted / sum) * 100).toFixed(2) : "N/A";
              return <td key={index}>{percentage}%</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTransform;
