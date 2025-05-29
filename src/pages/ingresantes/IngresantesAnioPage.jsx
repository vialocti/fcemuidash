import { Container, Grid, Typography } from '@mui/material'
import React from 'react'

const IngresantesAnioPage = () => {
  return (
    <Container maxWidth='false' sx={{width:'90%', paddingInline:10}}>
        <Grid container>
            <Grid item xs={12} md={12}>
                <Typography variant='h5'>

                </Typography>

            </Grid>

            <Grid item xs={12} md={1}>
            <InputLabel id="aniof">Año</InputLabel>
                  
                  <TextField
                    variant='standard' 
                    type="text"
                    id="aniof"
                    name="aniof"
                    onChange={onHandleChange}
                    value={aniof}
                  
                  />
            </Grid>
            <Grid item xs={12} md={2}>
                <InputLabel id='carrera'>Carrera</InputLabel>
                <Select 
                 variant='standard'
                 name="carrera"
                 id='carrera' 
                 value={carrera}
                 onChange={onHandleChange}>
                    <MenuItem value="T">Todas</MenuItem>
                    <MenuItem value="3">CPN</MenuItem>
                    <MenuItem value="4">LA</MenuItem>
                    <MenuItem value="5">LE</MenuItem>
                    <MenuItem value="6">LNRG</MenuItem>
                    <MenuItem value="7">LLO</MenuItem>
                    <MenuItem value="8">CP</MenuItem>
                </Select>
        
    
            </Grid>

            <Grid item xs={12} md={2}>
                <InputLabel id='ciclo'>Periodo Listado</InputLabel>
                <Select 
                    variant='standard'
                    name="carrera"
                    id='carrera' 
                    value={ciclo}
                    onChange={onHandleChange}>
                        <MenuItem value="L">Año Lectivo</MenuItem>
                        <MenuItem value="C">Año Calendario</MenuItem>
                </Select>
        
    
            </Grid>
            
            <Grid item xs={12} md={5}>
                
            </Grid>

       </Grid> 
    </Container>
  )
}

export default IngresantesAnioPage