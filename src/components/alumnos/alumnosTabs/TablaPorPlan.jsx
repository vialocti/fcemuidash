import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const TablaPorPlan = ({ alumnosSede }) => {
  return (
    <>
      <Typography variant='h6'>DISCRIMINADOS POR PLAN (solo alumnos con legajo)</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>PLAN</TableCell>
              <TableCell align="right">CP</TableCell>
              <TableCell align="right">LA</TableCell>
              <TableCell align="right">LE</TableCell>
              <TableCell align="right">LLO</TableCell>
              <TableCell align="right">LNRG</TableCell>
              <TableCell align="right">CPN</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>PLAN19/2</TableCell>
              <TableCell align="right">{alumnosSede.cantiCP}</TableCell>
              <TableCell align="right">{alumnosSede.cantiLA19}</TableCell>
              <TableCell align="right">{alumnosSede.cantiLE19}</TableCell>
              <TableCell align="right">{alumnosSede.cantiLLO2}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell align="right">
                <strong>{alumnosSede.cantiCP + alumnosSede.cantiLA19 + alumnosSede.cantiLE19 + alumnosSede.cantiLLO2}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PLAN98/1</TableCell>
              <TableCell />
              <TableCell align="right">{alumnosSede.cantiLA98}</TableCell>
              <TableCell align="right">{alumnosSede.cantiLE98}</TableCell>
              <TableCell align="right">{alumnosSede.cantiLLO}</TableCell>
              <TableCell align="right">{alumnosSede.cantiLNRG}</TableCell>
              <TableCell align="right">{alumnosSede.cantiCPN}</TableCell>
              <TableCell align="right">
                <strong>{alumnosSede.cantiLA98 + alumnosSede.cantiLE98 + alumnosSede.cantiLLO + alumnosSede.cantiLNRG + alumnosSede.cantiCPN}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TOTAL</TableCell>
              <TableCell align="right"><strong>{alumnosSede.cantiCP}</strong></TableCell>
              <TableCell align="right"><strong>{alumnosSede.cantiLA98 + alumnosSede.cantiLA19}</strong></TableCell>
              <TableCell align="right"><strong>{alumnosSede.cantiLE98 + alumnosSede.cantiLE19}</strong></TableCell>
              <TableCell align="right"><strong>{alumnosSede.cantiLLO + alumnosSede.cantiLLO2}</strong></TableCell>
              <TableCell align="right"><strong>{alumnosSede.cantiLNRG}</strong></TableCell>
              <TableCell align="right"><strong>{alumnosSede.cantiCPN}</strong></TableCell>
              <TableCell align="right">
                <strong>{
                  alumnosSede.cantiLA98 + alumnosSede.cantiLA19 + alumnosSede.cantiLE98 + alumnosSede.cantiLE19 + alumnosSede.cantiCP + alumnosSede.cantiLLO + alumnosSede.cantiLLO2 + alumnosSede.cantiLNRG + alumnosSede.cantiCPN
                }</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TablaPorPlan;
