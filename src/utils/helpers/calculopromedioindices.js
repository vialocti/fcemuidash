/// --- Totales ---
const calcularTotales = (data) => {
    return data.reduce(
      (acc, item) => {
        acc.total_inscriptos += item.total_inscriptos || 0;
        acc.regular += item.regular || 0;
        acc.reprobados += item.reprobados || 0;
        acc.ausentes += item.ausentes || 0;
        acc.promocionados += item.promocionados || 0;
        return acc;
      },
      {
        total_inscriptos: 0,
        regular: 0,
        reprobados: 0,
        ausentes: 0,
        promocionados: 0,
      }
    );
  };
  
  // --- Promedios ---
  const calcularPromedios = (data) => {
    const total = data.length;
    if (total === 0) {
      return { indice_cursada: 0, indice_e1: 0, indice_e2: 0 };
    }
    const suma = data.reduce(
      (acc, item) => {
        acc.indice_cursada += parseFloat(item.indice_cursada) || 0;
        acc.indice_e1 += parseFloat(item.indice_e1) || 0;
        acc.indice_e2 += parseFloat(item.indice_e2) || 0;
        return acc;
      },
      { indice_cursada: 0, indice_e1: 0, indice_e2: 0 }
    );
    return {
      indice_cursada: parseFloat((suma.indice_cursada / total).toFixed(2)),
      indice_e1: parseFloat((suma.indice_e1 / total).toFixed(2)),
      indice_e2: parseFloat((suma.indice_e2 / total).toFixed(2)),
    };
  };
  
  // --- Totales + Promedios juntos ---
  const calcularResumen = (data) => {
    return {
      ...calcularTotales(data),
      ...calcularPromedios(data),
    };
  };
  
  // --- Agrupado por campo (carrera, sede, periodo) ---
  const agruparYCalcularResumen = (data, key) => {
    const grupos = data.reduce((acc, item) => {
      const valor = item[key];
      if (!acc[valor]) acc[valor] = [];
      acc[valor].push(item);
      return acc;
    }, {});
    return Object.keys(grupos).map((grupo) => ({
      nombre: grupo,
      ...calcularResumen(grupos[grupo]),
    }));
  };
  
  export { calcularResumen, agruparYCalcularResumen };
  