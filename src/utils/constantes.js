//const HOST_PORT = 'http://localhost:5000'
const HOST_PORT = 'http://200.12.136.75:5000'
const HOST_PORTB = 'http://200.12.136.74:4000'
// const HOST_PORTB = 'http://127.0.0.1:4000'
// const HOST_PORT = 'http://172.22.160.97:5000'
// const HOST_PORTB = 'http://172.22.160.70:4000'

const uri = (base, path) => `${base}${path}`

export const URI_ALU = uri(HOST_PORT, '/alutivos')
export const URI_CUR = uri(HOST_PORT, '/cursadas')
export const URI_EGR = uri(HOST_PORT, '/dbegresados')
export const URI_ING = uri(HOST_PORT, '/dbingreso')
export const URI_INS = uri(HOST_PORT, '/dbinscriptos')
export const URI_PER = uri(HOST_PORTB, '/biometrico')
export const URI_REN = uri(HOST_PORT, '/rendimiento')
export const URI_EXA = uri(HOST_PORT, '/examenes')
export const URI_UTL = uri(HOST_PORT, '/utiles')
export const URI_AI = uri(HOST_PORT, '/datosanalisis')
export const URI_ALUI = uri(HOST_PORT, '/aluinfo')
export const URI_PROC = uri(HOST_PORT, '/procesos')