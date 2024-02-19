import React from 'react'


import AlumnosSedePropuesta from '../../components/alumnos/AlumnosSedePropuesta'
import { useAlumnosActivos } from '../../hooks/useAlumnosActivos'
import { Box, Grid, Typography , Step} from '@mui/material'

const AlumnosPage = () => {


  const {loading, error,cantidadA, cantidadAP,alumnosUbiSede, planesact} = useAlumnosActivos(2023)
  
  
  
  if(loading) return <p>Cargando datos .....</p>
  if(error) return <p>Error de Carga</p>
  
  return (
    
    <Grid container>
      
      <Grid item xs={12} sx={{backgroundColor:'blue', m:1, border:1}}>

          <Typography variant='h5' sx={{textAlign:'center' }}> Estudiantes Activos Ciclo Lectivo</Typography>
      </Grid>

      
        
        <Grid item xs={12} md={12} sx={{border:2,borderColor:'blue', borderRadius:4,mr:2}}>
          <Box sx={{m:2,display:'flex'}}>
            <Typography variant='h5'>Cantidad Estudiantes: </Typography>
            <Typography variant='h5' color={'blue'}>{cantidadA?cantidadA[0].canti:0}</Typography>
            </Box>
        </Grid>
      
      
      
      <Grid item xs={12} md={12}>
        {alumnosUbiSede
        ?<AlumnosSedePropuesta cantiAluSedePropuesta={alumnosUbiSede} planesact={planesact} />
        :null
        
      }
      </Grid>
      
  
  </Grid>
  )

}
export default AlumnosPage