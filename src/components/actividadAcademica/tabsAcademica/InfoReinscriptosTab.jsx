import React, { useMemo } from "react";

// Función genérica para agrupar
function agruparPorCampos(data, campos) { 
  //console.log(campos);
  //  console.log(data);
  return data.reduce((acc, item) => {
    const key = campos.map(c => item[c]).join("|");
   

    if (!acc[key]) {
      acc[key] = {
        ...campos.reduce((o, c) => ({ ...o, [c]: item[c] }), {}),
        total: 0,
      };
    }

    acc[key].total += Number(parseInt(item.count));
    return acc;
  }, {});
}

// Tabla genérica
function TablaDistribucion({ titulo, data, campos }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{titulo}</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              {campos.map((c) => (
                <th key={c} className="px-4 py-2 border-b border-gray-200">
                  {c}
                </th>
              ))}
              <th className="px-4 py-2 border-b border-gray-200">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((fila, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {campos.map((c) => (
                  <td key={c} className="px-4 py-2 border-b border-gray-200">
                    {fila[c]}
                  </td>
                ))}
                <td className="px-4 py-2 border-b border-gray-200 font-bold">
                  {fila.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function InfoReinscriptosTab({ alumnosactivos }) {
  // Distribuciones
  const distribucionPropuestaPlan = useMemo(
    () => Object.values(agruparPorCampos(alumnosactivos, ["propuesta", "plan"])),
    [alumnosactivos]
  );

  const distribucionPropuestaPlanSede = useMemo(
    () => Object.values(agruparPorCampos(alumnosactivos, ["propuesta", "plan", "sede"])),
    [alumnosactivos]
  );

  const distribucionSedeSexo = useMemo(
    () => Object.values(agruparPorCampos(alumnosactivos, ["sede", "sexo"])),
    [alumnosactivos]
  );

  return (
    <div className="p-6">
      <TablaDistribucion
        titulo="Distribución Propuesta - Plan"
        data={distribucionPropuestaPlan}
        campos={["propuesta", "plan"]}
      />

      <TablaDistribucion
        titulo="Distribución Propuesta - Plan - Sede"
        data={distribucionPropuestaPlanSede}
        campos={["propuesta", "plan", "sede"]}
      />

      <TablaDistribucion
        titulo="Distribución Sede - Sexo"
        data={distribucionSedeSexo}
        campos={["sede", "sexo"]}
      />
    </div>
  );
}
