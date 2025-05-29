import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import {
  traerAlumnosInfouno,
  traerPlanesVersiones,
} from "../../services/servicesRendimiento";
//import InfoUnoMuestra from "../../components/rendimiento/InfoUnoMuestra";
import InfoUnoMuestraD from "../../components/rendimiento/InfoUnoMuestraD";

const AlumnosInfoUno = () => {
  const [anioI, setAnioI] = useState(2023);
  const [ubicacion, setUbicacion] = useState(1);
  const [propuesta, setPropuesta] = useState(1);
  const [planversionT, setPlanVersionT] = useState(null);
  const [planversion, setPlanversion] = useState("12-77");

  const [versionesOp, setversionesOP] = useState(null);
  const [infoalumnos, setInfoalumnos] = useState([]);

  useEffect(() => {
    const traerplanesversion = async () => {
      let resu = await traerPlanesVersiones();
      console.log(resu);
      setPlanVersionT(resu);
    };

    /*
     const pv=[{
      nombre:'CP19.03.1(Transicion)',
      plan:12,
      version:69
     },
     {
      nombre:'CP19.03(Bimestre)',
      plan:12,
      version:77
     }
    ]
          setversionesOP(pv);
   */

    traerplanesversion();
  }, []);

  useEffect(() => {
    //console.log(infoalumnos);
  }, [infoalumnos]);

  const onHandleChange = (event) => {
    if (event.target.name === "anioI") {
      setAnioI(event.target.value);
    } else if (event.target.name === "ubicacion") {
      setUbicacion(event.target.value);
    } else if (event.target.value) {
      setPlanversion(event.target.value);
    }
  };

  const onHandleChangeProp = (event) => {
    setPropuesta(event.target.value);
    let propuesta = event.target.value;
    //console.log(propuesta);
    if (planversionT) {
      const pv = planversionT.filter(
        (planv) => planv.propuesta === Number(propuesta)
      );
      setversionesOP(pv);
    }
  };

  const onHandleChangePV = (event) => {
    setPlanversion(event.target.value);
    //console.log(event.target.value);
  };

  const onHandleInfo = async () => {
    let pver = planversion.split("-");
    //console.log(pver);
    setInfoalumnos(
      await traerAlumnosInfouno(
        anioI,
        ubicacion,
        propuesta,
        Number(pver[0]),
        Number(pver[1])
      )
    );
    //console.log(ubicacion, propuesta, anioI, Number(pver[0]), Number(pver[1]));
  };

  return (
    <Container maxWidth='false' sx={{width:'90%',paddingInline:10}}>
      <Grid container>
      

        <Box
          sx={{
            display: "flex",
            border: 1,
            borderRadius: 2,
            backgroundColor: "beige",
            width: "97%",
            p: 2,
            flexWrap: "wrap",
          }}
        >
          <Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>

          <Typography variant="h6" textAlign={"center"}>
            Informacion Rendimiento Academico
          </Typography>
        </Grid>
          <Grid item xs={12} md={1} sx={{ mr: 1 }}>
            <InputLabel id="anioI">Ingreso </InputLabel>

            <TextField
              variant="standard"
              type="text"
              id="anioI"
              name="anioI"
              onChange={onHandleChange}
              value={anioI}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <InputLabel id="ubicacion">Sede</InputLabel>
            <Select
              variant="standard"
              name="ubicacion"
              id="ubicacion"
              onChange={onHandleChange}
              value={ubicacion}
            >
              <MenuItem value={"1"}>Mendoza</MenuItem>
              <MenuItem value={"2"}>San Rafael</MenuItem>
              <MenuItem value={"3"}>Gral.Alvear</MenuItem>
              <MenuItem value={"4"}>Este</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={3}>
            <InputLabel id="propuesta">Propuesta Academica</InputLabel>
            <Select
              variant="standard"
              name="propuesta"
              id="propuesta"
              onChange={onHandleChangeProp}
              value={propuesta}
            >
              <MenuItem value={1}>CONTADOR PUBLICO NACIONAL</MenuItem>
              <MenuItem value={2}>LICENCIATURA EN ADMINISTRACION</MenuItem>
              <MenuItem value={3}>LICENCIATURA EN ECONOMIA</MenuItem>
              <MenuItem value={6}>LGN.REGIONALES</MenuItem>
              <MenuItem value={7}>LICENCIADO EN LOGISTICA</MenuItem>
              <MenuItem value={8}>CONTADOR PUBLICO</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={3}>
            <InputLabel id="planversion">Plan version</InputLabel>
            <Select
              variant="standard"
              name="planversion"
              id="planversion"
              onChange={onHandleChangePV}
              value={planversion}
            >
              {versionesOp
                ? versionesOp.map((elemento, index) => (
                    <MenuItem
                      value={
                        String(elemento.plan) +
                        "-" +
                        String(elemento.plan_version)
                      }
                      key={index}
                    >
                      {elemento.nombre}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>

          <Grid item xs={12} md={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onHandleInfo}>
              Aceptar
            </Button>
          </Grid>
        </Box>
      </Grid>

      {infoalumnos.length > 0 ? (
        <InfoUnoMuestraD infoalu={infoalumnos} />
      ) : null}
    </Container>
  );
};

export default AlumnosInfoUno;

/**
 *  
 * 
 *  <Box
          sx={{
            display: "flex",
            border: 1,
            borderRadius: 2,
            backgroundColor: "beige",
            width: "100%",
            p: 2,
            flexWrap: "wrap",
          }}
        >
 * <Grid item xs={12} md={1} sx={{ mr: 1 }}>
            <InputLabel id="anioFC">AñoU.Re</InputLabel>

            <TextField
              variant="standard"
              type="text"
              id="anioFC"
              name="anioFC"
              onChange={onHandleChange}
              value={anioFC}
            />
          </Grid>

 */
