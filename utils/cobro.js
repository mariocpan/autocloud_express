function calcularCobro(fechaIngreso, valorHora, ahora = Date.now()){
const milisegundos = ahora - fechaIngreso;
const horas = Math.max(1, Math.ceil(milisegundos / (1000 * 60 * 60)));
return { horas, total: horas* valorHora };
}
module.exports = calcularCobro;