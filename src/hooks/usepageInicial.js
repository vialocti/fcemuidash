import { useState, useEffect } from "react";
import axios from "axios";
import { URI_ALU, URI_CUR, URI_EGR, URI_INS, URI_PER } from "../utils/constantes.js";

const uri_bio = URI_PER;
const uri_e = URI_EGR;
const uri_i = URI_INS;
const uri_a = URI_ALU;
const uri_c = URI_CUR;

export const usePageInicial = (anio) => {
  const [anioC, setAnioC] = useState(anio);
  const [cantidadSedeEgr, setCantidadEgr] = useState(null);
  const [cantidadAlu, setCantidadAlu] = useState(null);
  const [cantidadInsc, setCantidadInsc] = useState(null);
  const [cantidadAluPro, setCantidadAluPro] = useState(null);
  const [cantidadProvisorios, setCantidadProvisorios] = useState(null);
  const [cantidadInscriptosCursada, setCantidadInscriptosCursada] = useState(null);
  const [datosAsistencia, setDatosAsistencia] = useState(null);
  const [cantidadInscPeriodo, setCantidadInscPeriodo] = useState(null);

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
        traerInscritosCursadaSede()
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
    const { data } = await axios.get(`${uri_e}/egresadosanio/${anioC}/L`);
    setCantidadEgr(data);
  };

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
    setCantidadAlu(data);
  };

  const traerAlumnosCarrera = async () => {

    const { data } = await axios.get(`${uri_a}/alumsactpro`);
    setCantidadAluPro(data);
  };

  const traerAlumnosProvisorios = async () => {
    const fecha = new Date();
    const anioActual = fecha.getFullYear();
    let anioP=fecha > new Date(`${anioActual}-03-05`) ? anioActual  : anioActual-1
    const { data } = await axios.get(`${uri_a}/aluprovisoriosSede/${anioP}`);
    setCantidadProvisorios(data);
  };

  const traerAsistencia = async () => {
    const fecha = new Date().toISOString().split("T")[0];
    const { data } = await axios.get(`${uri_bio}/asistenciahoy/${fecha}`);
    setDatosAsistencia(data);
  };

  const traerInscritosCursadaSede = async () => {
    const anioFull = new Date().getFullYear();
    const { data } = await axios.get(`${uri_c}/traerinscriptostotsede/${anioFull}`);
    setCantidadInscriptosCursada(data);
  };

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
    refreshData: fetchData
  };
};