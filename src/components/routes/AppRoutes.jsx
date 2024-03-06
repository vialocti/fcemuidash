import React,{useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/common/HomePage";
import PageNotFound from "../../pages/common/PageNotFound";
import NavigationBar from "../navbar/NavigationBar";
import IngresantesPage from "../../pages/ingresantes/IngresantesPage";
import InscriptosPage from "../../pages/inscriptos/InscriptosPage";
import EgresadosEntreAnios from "../../pages/egresados/EgresadosEntreAnios";
import EgresadosEntreAniosCarrera from "../../pages/egresados/EgresadosEntreAniosCarrera";
import AlumnosPage from "../../pages/alumnos/AlumnosPage";
import AlumnosCohorteDesgrana from "../../pages/alumnos/AlumnosCohorteDesgrana";
import IngresantesPageEntreAnios from "../../pages/ingresantes/IngresantesPageEntreAnios";
import InscriptosPageEntreAnios from "../../pages/inscriptos/InscritosPageEntreAnios";
import CompararaAspiIngresoLapso from "../../pages/inscriptos/CompararaAspiIngresoLapso";
import PersonalMesHoras from "../../pages/personal/PersonalMesHoras";
import EgresadosAnioListado from "../../pages/egresados/EgresadosAnioListado";
import AlumnosInfoUno from "../../pages/rendimiento/AlumnosInfoUno";
import ComisionesCursadasAnio from "../../pages/cursadas/ComisionesCursadasAnio";
import InfoCursadasAnio from "../../pages/cursadas/InfoCursadasAnio";
import ComisionesInscripcionesActividad from "../../pages/cursadas/ComisionesInscripcionesActividad";
import ComparativasInscripcionesActividad from "../../pages/cursadas/ComparativaInscripcionesActividad";
//cursadas

//rendimiento

const AppRoutes = () => {

 
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/ingresantes" element={<IngresantesPage />} />
        <Route
          exact
          path="/ingresantesanios"
          element={<IngresantesPageEntreAnios />}
        />

        <Route exact path="/inscriptos" element={<InscriptosPage />} />
        <Route
          exact
          path="/inscriptosanios"
          element={<InscriptosPageEntreAnios />}
        />
        <Route
          exact
          path="/compaaspingre"
          element={<CompararaAspiIngresoLapso />}
        />

        <Route
          exact
          path="/egreaniocarrera"
          element={<EgresadosAnioListado />}
        />
        <Route exact path="/egreanios" element={<EgresadosEntreAnios />} />
        <Route
          exact
          path="/egreanioscar"
          element={<EgresadosEntreAniosCarrera />}
        />

        <Route exact path="/alumnos" element={<AlumnosPage />} />
        <Route
          exact
          path="/cohortedesme"
          element={<AlumnosCohorteDesgrana />}
        />

        <Route
          exact
          path="/comisionescursadaanio"
          element={<ComisionesCursadasAnio />}
        />
        <Route
          exact
          path="/comparativaInsc"
          element={<ComparativasInscripcionesActividad />}
        />

          <Route
          exact
          path="/infocursadasanio"
          element={<InfoCursadasAnio />}
        />

        <Route
          exact
          path="/inscripcionesComi"
          element={<ComisionesInscripcionesActividad />}
        />

        <Route exact path="/aluinfouno" element={<AlumnosInfoUno />} />

        <Route exact path="/meshoras" element={<PersonalMesHoras />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
