
function calcularCobro(fechaIngreso, valorHora, ahora = Date.now()){
// Tiempo parqueadero  en milisegundo
const milisegundos = ahora - fechaIngreso;
// Redondeo hacia arriba cobrando minimo una hora 
const horas = Math.max(1, Math.ceil(milisegundos / (1000 * 60 * 60)));
// Total = horas por el valor de una hora
return { horas, total: horas* valorHora };
}
// Exportamos la funcion para usarla en rutas y pruebas 
module.exports = calcularCobro;