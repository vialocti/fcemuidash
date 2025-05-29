import React, { useEffect, useState } from 'react'
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@mui/material'
import { traerListadoAlumnosComision } from '../../services/servicesCursadas.js'

const ListadoComision = ({ comision, fxNameProp }) => {
  const [listado, setListado] = useState(null)

  useEffect(() => {
    const cargarListado = async () => {
      if (comision) {
        const data = await traerListadoAlumnosComision(comision)
        setListado(data)
      }
    }
    cargarListado()
  }, [comision])

  return (
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
          {listado?.map((item, index) => (
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
  )
}

export default ListadoComision
