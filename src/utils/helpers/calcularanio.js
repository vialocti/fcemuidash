export const calcularaniolectivo = () => { 

    const hoy = new Date();
    const mes = hoy.getMonth() + 1; // getMonth() devuelve 0-11
    const anioActual = hoy.getFullYear();
    let anio;

    if (mes >= 4 && mes <= 12) {
      anio = anioActual;
    } else if (mes >= 1 && mes <= 3) {
      anio = anioActual - 1;
    }

    return anio
}