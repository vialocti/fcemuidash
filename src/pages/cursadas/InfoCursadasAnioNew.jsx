import React, { useEffect, useState } from 'react'
import {
  Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Select, MenuItem, FormControl, InputLabel
} from '@mui/material'
import { traerComisionesPerLect, traerListadoAlumnosComision, traerListadoComisiones } from '../../services/servicesCursadas.js'
import { CSVLink } from "react-csv"

const InfoCursadasAnio = () => {
  const [comisionesAnio, setComisionesAnio] = useState(null)
  const [comisionesAnioSel, setComisionesAnioSel] = useState(null)
  const [sedeComisionesPLM, setSedeComisionesPLM] = useState(null)
  const [listadoComision, setListadoComision] = useState(null)
  const [comisionNombre, setComisionNombre] = useState('')

  const [periodo, setPeriodo] = useState('')
  const [comision, setComision] = useState('')
  const [anio, setAnio] = useState(0)

  const [sedeSel, setSedeSel] = useState('')
  const [periodosPorSede, setPeriodosPorSede] = useState([])

  useEffect(() => {
    let fecha = new Date().toISOString()
    let fechacompa = fecha.substring(0, 4) + '-04-01'
    setAnio(Number(fecha.substring(0, 4)) - (fecha < fechacompa ? 1 : 0))
  }, [])

  useEffect(() => {
    const cargar = async () => {
      setComisionesAnio(await traerListadoComisiones(anio))
      setSedeComisionesPLM(await traerComisionesPerLect(anio))
    }
    cargar()
  }, [anio])

  const traerubicacion = sede => ({ MZA: 1, SRF: 2, ESTE: 4 }[sede] || null)

  const traerPgenerico = nombre => ({
    'Anual': 1, '1er Cuatrimestre': 2, '2do Cuatrimestre': 3,
    '1er Bimestre': 10, '2do Bimestre': 11,
    '3er Bimestre': 12, '4to Bimestre': 13
  }[nombre] || null)

  const fxNameProp = propuesta => ({
    1: 'CPN', 2: 'LA', 3: 'LE', 7: 'LLO', 8: 'CP'
  }[propuesta] || '')

  const obtenerPeriodosPorSede = (sede) => {
    const periodos = sedeComisionesPLM
      ?.filter(item => item.sede === sede)
      .map(item => item.nombre)
    const periodosUnicos = [...new Set(periodos)]
    setPeriodosPorSede(periodosUnicos)
  }

  const mostrarComisiones = (sede, nombre) => {
    let ubi = traerubicacion(sede)
    let pgen = traerPgenerico(nombre)
    setPeriodo(nombre)
    const comisionesFiltro = comisionesAnio
      .filter((comision) => comision.ubicacion === ubi && comision.periodo_generico === pgen)
      .sort((a, b) => a.mater.localeCompare(b.mater))
    setComisionesAnioSel(comisionesFiltro)
    setComision('')
    setListadoComision(null)
  }

  const mostrarListadoComi = async (comision) => {
    setListadoComision(await traerListadoAlumnosComision(comision))
    setComision(comision)
    let nombreComi = comisionesAnioSel.find(item => item.comision === comision)
    setComisionNombre(`(${nombreComi.nmat}) ${nombreComi.mater}`)
  }

  return (
    <Container>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5" textAlign="center" color="white" backgroundColor="#444444" sx={{ borderRadius: 1 }}>
            Listado de Alumnos por Comisión
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="select-sede-label">Sede</InputLabel>
            <Select
              labelId="select-sede-label"
              value={sedeSel}
              label="Sede"
              onChange={(e) => {
                setSedeSel(e.target.value)
                setPeriodo('')
                obtenerPeriodosPorSede(e.target.value)
                setComisionesAnioSel(null)
              }}
            >
             {[...new Set(sedeComisionesPLM?.map(item => item.sede))]
              .filter(sede => sede !== 'GALV')
              .map((sede, index) => (
                <MenuItem key={index} value={sede}>{sede}</MenuItem>
            ))}

            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth disabled={!sedeSel}>
            <InputLabel id="select-periodo-label">Periodo Lectivo</InputLabel>
            <Select
              labelId="select-periodo-label"
              value={periodo}
              label="Periodo Lectivo"
              onChange={(e) => {
                const nombre = e.target.value
                setPeriodo(nombre)
                mostrarComisiones(sedeSel, nombre)
              }}
            >
              {periodosPorSede?.map((nombre, index) => (
                <MenuItem key={index} value={nombre}>
                  {sedeSel} - {nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth disabled={!comisionesAnioSel}>
            <InputLabel id="select-comision-label">Comisión</InputLabel>
            <Select
              labelId="select-comision-label"
              value={comision}
              label="Comisión"
              onChange={(e) => mostrarListadoComi(e.target.value)}
            >
              {comisionesAnioSel?.map((item, index) => (
                <MenuItem key={index} value={item.comision}>
                  ({item.nmat}) {item.mater}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={2}>
          <Button variant="contained" color="primary" sx={{ width: '100%' }}>
            {listadoComision ?
              <CSVLink data={listadoComision} filename={`List_${comisionNombre}.csv`} style={{ textDecoration: 'none', color: 'white' }}>
                Exportar
              </CSVLink> :
              "Not export"}
          </Button>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h6" textAlign="center" color="white" backgroundColor="#444444" sx={{ borderRadius: 1 }}>
            {comisionNombre}
          </Typography>
        </Grid>
        <Grid item xs={12} md={1}>
          {listadoComision && <p>Inscrip: <strong>{listadoComision.length}</strong></p>}
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ height: '600px', mt: 2 }}>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              <TableCell>NroOrden</TableCell>
              <TableCell>Legajo</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Carrera</TableCell>
              <TableCell>%Carrera</TableCell>
              <TableCell>Año Cursada</TableCell>
              <TableCell>coefTiempo</TableCell>
              <TableCell>PerdiasRe</TableCell>
              <TableCell>Año Ult.PeReg</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listadoComision?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.nro_orden}</TableCell>
                <TableCell>{item.legajo}</TableCell>
                <TableCell>{item.apellido}</TableCell>
                <TableCell>{item.nombres}</TableCell>
                <TableCell>{fxNameProp(item.propuesta)}</TableCell>
                <TableCell>{item.completado}</TableCell>
                <TableCell>{item.aniocursada}</TableCell>
                <TableCell>{item.coef_tcarrera}</TableCell>
                <TableCell>{item.perdidasreg}</TableCell>
                <TableCell>{item.ultimaperdireg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default InfoCursadasAnio
