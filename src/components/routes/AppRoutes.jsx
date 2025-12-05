//import React,{useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ActividadAcademicaPage from "../../pages/actividadAcademica/ActividadAcademicaPage";
import AlumnosCohorteDesgrana from "../../pages/alumnos/AlumnosCohorteDesgrana";
import AlumnosInfoUno from "../../pages/rendimiento/AlumnosInfoUno";
import AlumnosPage from "../../pages/alumnos/AlumnosPage";
import AprobadasAnioResultado from "../../pages/cursadas/AprobadasAnioResultado";
import AprobadasAñoIngresantes from "../../pages/reportes/AprobadasAñoIngresantes"; //aprobadas primer año nuevo report
import AprobadasHistoricosprimer from "../../pages/historicosAp/AprobadasHistoricosprimer";
import ComisionesCursadasAnioResultado from "../../pages/cursadas/ComisionesCursadasAnioResultado";
import ComisionesInscripcionesActividad from "../../pages/cursadas/ComisionesInscripcionesActividad";
import ComisionesResultadosHistoricos from "../../pages/historicosAp/ComisionesResultadosHistoricos";
import CompararaAspiIngresoLapso from "../../pages/inscriptos/CompararaAspiIngresoLapso";
import ComparativaTurnosExamen from "../../pages/examenes/ComparativaTurnosExamen";
import ComparativasInscripcionesActividad from "../../pages/cursadas/ComparativaInscripcionesActividad";
import ConsuOpenAI from "../../pages/alumnos/ConsuOpenAI";
import Dashboard from "../../pages/common/Dashboard";
import DatosActividadesIngresantes from "../../pages/reportes/DatosActividadesIngresantes";
import EgresadosAnioListado from "../../pages/egresados/EgresadosAnioListado";
import EgresadosEntreAnios from "../../pages/egresados/EgresadosEntreAnios";
import EgresadosEntreAniosCarrera from "../../pages/egresados/EgresadosEntreAniosCarrera";
import HomePage from "../../pages/common/HomePage";
import IndicesTotalPeriodo from "../../pages/historicosAp/IndicesTotalPeriodo";
import InfoCursadasAnio from "../../pages/cursadas/InfoCursadasAnio";
import IngresantesAspirantes from "../../pages/ingresantes/IngresantesAspirantes";
//import IngresantesPage from "../../pages/ingresantes/IngresantesPage";
import IngresantesPageEntreAnios from "../../pages/ingresantes/IngresantesPageEntreAnios";
import InscriptosPage from "../../pages/inscriptos/InscriptosPage";
import InscriptosPageEntreAnios from "../../pages/inscriptos/InscritosPageEntreAnios";
import ListadoAluInfoCompleto from "../../pages/reportes/ListadoAluInfoCompleto";
import NavigationBar from "../navbar/NavigationBar";
import PageNotFound from "../../pages/common/PageNotFound";
import PersonalMesHoras from "../../pages/personal/PersonalMesHoras";
import ReporteComisionesContacto from "../../pages/reportes/ReporteComisionesContacto";
import ReporteExamenEpocas from "../../pages/reportes/ReporteExamenEpocas";
import ReporteGeneral from "../../pages/reportes/ReporteGeneral";
import TurnosMesasComponent from "../../pages/examenes/TurnosMesasComponent";

//cursadas

//rendimiento

const AppRoutes = ({onLogout, user}) => {

  const esAdmin = user?.email === "staff_dash@fce.uncu.edu.ar"
  return (
    <BrowserRouter>
     
      
      <NavigationBar onLogout={onLogout} user={user}  />

      <Routes>

        <Route exact path="/" element={<HomePage />} />
        
        {esAdmin && <> 
        <Route exact path="/ingresantes" element={<IngresantesAspirantes />} /> {/** aspirantes ingresantes */}
        <Route
          exact
         // path="/ingresantesanios"
          element={<IngresantesPageEntreAnios />}
        />

        <Route exact path="/inscriptos" element={<InscriptosPage />} />
        <Route
          exact
         // path="/inscriptosanios"
          element={<InscriptosPageEntreAnios />}
        />
        <Route
          exact
         // path="/compaaspingre"
          element={<CompararaAspiIngresoLapso />}
        />

        <Route exact path="/info-ciclo-lectivo" element={<ActividadAcademicaPage />}/>{/**actividad academica año lectivo */}

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

        <Route exact path="/estudiantes-activos" element={<AlumnosPage />} />

        <Route
          exact
          path="/cohorte-evolucion"
          element={<AlumnosCohorteDesgrana />}
        />



       

        <Route
          exact
          path="/comisiones-cursadas-anio"
          element={<ComisionesCursadasAnioResultado />}
        />
      
      <Route
          exact
          path="/consuopenai"
          element={<ConsuOpenAI />}
        />  
      
      
      
      
        <Route
          exact
          path="/comparativaInsc"
          element={<ComparativasInscripcionesActividad />}
        />

          <Route
            exact
            path="/aprobadas-carrera-1er-anio"
            element={<AprobadasAnioResultado />}
          
          />

          <Route  
            exact
            path='/aprobadas-primer-anio-reporte'
            element={<AprobadasAñoIngresantes />}
          />

          <Route 
            exact
            path='/listadoaluinfo'
            element={<ListadoAluInfoCompleto />}

          />
           
           <Route  
            exact
            path='/datosactividadreport'
            element={<DatosActividadesIngresantes />}
          />

          <Route

            exact
            path="/historicosAprobadas"
            element={<AprobadasHistoricosprimer />}
            />


          <Route
          exact
          path="/historicoresuActividad"
          element={< ComisionesResultadosHistoricos />}
          //path="/infocursadasanio"
          //element={<InfoCursadasAnio />}
        />
        
        <Route
          exact
          path="/inscripcionesComi"
          element={<ComisionesInscripcionesActividad />}
        />

        <Route
          exact
          path="/indicetotperiodo"
          element={<IndicesTotalPeriodo />}
          />

        <Route exact path="/alumnos-coeficiente" element={<AlumnosInfoUno />} /> {/** alumnos coeficiente de tiempo*/}

        <Route exact path="/meshoras" element={<PersonalMesHoras />} />

       
        <Route exact path= '/reporteexamenescp' element = {< ComparativaTurnosExamen />} />
        
        <Route exact path= '/reporteexamenes' element = {<TurnosMesasComponent />} />

        <Route exact path= '/reportecomicontacto' element = {<ReporteComisionesContacto />} />

        <Route exact path='/reporteepocasexamen' element ={<  ReporteExamenEpocas/>} />

        <Route exact path= '/dashboard' element = {<Dashboard />} />

        <Route exact path= '/reportegeneral' element = {<ReporteGeneral />} />


        </>}

        <Route
          exact
          path="/infocursadalistado"
         element={<InfoCursadasAnio />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
