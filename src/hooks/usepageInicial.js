import { useState, useEffect } from "react";
import axios from "axios";
import { URI_ALU, URI_ALUI, URI_CUR, URI_EGR, URI_INS, URI_PER } from "../utils/constantes.js";

const uri_bio = URI_PER;
const uri_e = URI_EGR;
const uri_i = URI_INS;
const uri_a = URI_ALU;
const uri_c = URI_CUR;
const uri_alui=URI_ALUI

export const usePageInicial = (anio) => {
  const [anioC, setAnioC] = useState(0);
  const [cantidadSedeEgr, setCantidadEgr] = useState(null);
  const [cantidadAlu, setCantidadAlu] = useState(null);
  const [cantidadInsc, setCantidadInsc] = useState(null);
  const [cantidadAluPro, setCantidadAluPro] = useState(null);
  const [cantidadProvisorios, setCantidadProvisorios] = useState(null);
  const [cantidadInscriptosCursada, setCantidadInscriptosCursada] = useState(null);
  const [datosAsistencia, setDatosAsistencia] = useState(null);
  const [cantidadInscPeriodo, setCantidadInscPeriodo] = useState(null);
  const [reinscriptos, setReinscriptos]= useState(null)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        traerInscriptosSede(),
        traerCantidadPorSede(),
        traerAlumnosActivosSede(),
        traerAlumnosCarrera(),
        traerAsistencia(),
        traerCantidadPorPeriodos(),
        traerAlumnosProvisorios(),
        traerInscritosCursadaSede(),
        traerReinscriptos()
      ]);
    } catch (err) {
      setError(err);
      console.error("Error al cargar los datos:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [anioC]);

  useEffect(() => {
    const fecha = new Date();
    const anioActual = fecha.getFullYear();
    setAnioC(fecha < new Date(`${anioActual}-04-01`) ? anioActual - 1 : anioActual);


  }, [anio]);

  // Funciones de obtención de datos

  const traerCantidadPorSede = async () => {
    //console.log(anioC)
    const { data } = await axios.get(`${uri_e}/egresadosanio/${anioC}/L`)
    setCantidadEgr(data)
  }
  const traerInscriptosSede = async () => {
    const { data } = await axios.get(`${uri_i}/inscriptosSedeanio/${anioC + 1}`);
    setCantidadInsc(data);
  };

  const traerCantidadPorPeriodos = async () => {
    const { data } = await axios.get(`${uri_i}/inscriptosperiodo/${anioC + 1}`);
    setCantidadInscPeriodo(data);
  };

  const traerAlumnosActivosSede = async () => {
 
    const { data } = await axios.get(`${uri_a}/alumnosSede`);  
    //console.log(data)
    setCantidadAlu(data);
  };

  const traerAlumnosCarrera = async () => {

    const { data } = await axios.get(`${uri_a}/alumsactpro`);
    //console.log(data)
    setCantidadAluPro(data);
  };

  const traerAlumnosProvisorios = async () => {
    const fecha = new Date();
    const anioActual = fecha.getFullYear();
    //console.log(anioActual)
    let anioP = fecha > new Date(`${anioActual}-03-11`) ? anioActual : anioActual - 1
    //console.log(anioP)
    const { data } = await axios.get(`${uri_a}/aluprovisoriosSede/${anioP}`);  
//console.log(data)
    setCantidadProvisorios(data);
  };

  const traerAsistencia = async () => {
    const fecha = new Date().toISOString().split("T")[0];
    const { data } = await axios.get(`${uri_bio}/asistenciahoy/${fecha}`);
    setDatosAsistencia(data);
  };

  const traerInscritosCursadaSede = async () => {
    // const anioFull = new Date().getFullYear();
    const { data } = await axios.get(`${uri_c}/traerinscriptostotsede/${anioC}`);
    setCantidadInscriptosCursada(data);
  };

  const traerReinscriptos = async ()=>{
    const fecha= new Date() 
    const anioActual = fecha.getFullYear();

    
    const {data} = await axios.get(`${uri_alui}/traerReinscriptos/${anioActual}`)
    //console.log(data)
    setReinscriptos(data)
  }

  return {
    loading,
    error,
    cantidadSedeEgr,
    cantidadInsc,
    cantidadAlu,
    cantidadAluPro,
    datosAsistencia,
    cantidadInscPeriodo,
    cantidadProvisorios,
    cantidadInscriptosCursada,
    reinscriptos,
    refreshData: fetchData
  };

}