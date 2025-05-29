import React, { useEffect, useState } from 'react'

import { analizarDatosAlumnos } from '../../services/servicesOpenAI';
import { traerDatosinformacionAlumnos } from '../../services/servicesAlumnos';

const AlumnosInfo = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conclusion, setConclusion] = useState("");
 const [habilitado, setHabilitado]=useState(false)
  const [propuestas, setPropuestas] = useState([]);
  //const [staticsAlu, setstaticAlu]= useState<any>(null)
  const [loadingConclusion, setLoadingConclusion] = useState(false);

  // Función para agrupar propuestas desde los alumnos
  function generarPropuestas(alumnosDat){
    const propuestasMap = new Map();
    console.log(alumnosDat)
    alumnosDat.forEach((alumno) => {
      const propuestaId = alumno.propuesta;

      if (propuestasMap.has(propuestaId)) {
        const propuestaExistente = propuestasMap.get(propuestaId);
        if (propuestaExistente) {
          propuestaExistente.totali += 1;
        }
      } else {
        propuestasMap.set(propuestaId, {
          propuesta: propuestaId.toString(),
          totali: 1,
        });
      }
    });

    return Array.from(propuestasMap.values());
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Primer useEffect: Trae los alumnos y genera propuestas
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await traerDatosinformacionAlumnos();
        const alumnosResp = response
              

        setAlumnos(response);
        const propuestasGeneradas = generarPropuestas(alumnosResp);
        setPropuestas(propuestasGeneradas);
      } catch (err) {
        console.error("Error al cargar los datos", err);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    setHabilitado(false)
    fetchData();
  }, []);

  // Segundo useEffect: Analiza las propuestas con el asistente
  useEffect(() => {
    const fetchConclusion = async (propuestas) => {
      setLoadingConclusion(true);
      try {
        const conclusion = await analizarDatosAlumnos(propuestas);
        setConclusion(conclusion);
    //    setstaticAlu(await enviarDatosParaAnalisis(propuestas, instrucciones))
      } catch (err) {
        console.error("Error al obtener la conclusión:", err);
        setConclusion("No se pudo obtener la conclusión.");
      } finally {
        setLoadingConclusion(false);
      }
    };

    if (propuestas.length > 0 && habilitado) {
      fetchConclusion(propuestas);
    }
  }, [propuestas]);

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">Información de Alumnos</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Tabla de Alumnos */}
          <div className="max-h-150 overflow-y-auto border rounded-lg shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 border">Legajo</th>
                  <th className="p-2 border">Tipo Doc</th>
                  <th className="p-2 border">Nro Doc</th>
                  <th className="p-2 border">Apellido</th>
                  <th className="p-2 border">Nombres</th>
                  <th className="p-2 border">Fecha Nac.</th>
                  <th className="p-2 border">Género</th>
                  <th className="p-2 border">Ubicación</th>
                  <th className="p-2 border">Propuesta</th>
                  <th className="p-2 border">Plan</th>
                  <th className="p-2 border">Versión Plan</th>
                  <th className="p-2 border">Calidad</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="p-2 border">{alumno.legajo}</td>
                    <td className="p-2 border">{alumno.tipo_documento}</td>
                    <td className="p-2 border">{alumno.nro_documento}</td>
                    <td className="p-2 border">{alumno.apellido}</td>
                    <td className="p-2 border">{alumno.nombres}</td>
                    <td className="p-2 border">{formatDate(alumno.fecha_nacimiento)}</td>
                    <td className="p-2 border">{alumno.genero}</td>
                    <td className="p-2 border">{alumno.ubicacion}</td>
                    <td className="p-2 border">{alumno.propuesta}</td>
                    <td className="p-2 border">{alumno.plan}</td>
                    <td className="p-2 border">{alumno.plan_version}</td>
                    <td className="p-2 border">{alumno.calidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumen de Propuestas */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Propuestas Totales</h3>
            {propuestas.length === 0 ? (
              <p>No hay propuestas disponibles.</p>
            ) : (
              <ul className="list-disc pl-5">
                {propuestas.map((prop) => (
                  <li key={prop.propuesta}>
                    Propuesta {prop.propuesta}: {prop.totali} alumnos
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Conclusión del Asistente */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Conclusión del Asistente</h3>
            {loadingConclusion ? (
              <p>Analizando propuestas...</p>
            ) : (
              
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={4}
                value={conclusion}
                readOnly
              />
          
            
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AlumnosInfo;
