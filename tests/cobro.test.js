// Importamos  la funcion que vamos aprobar
const calcularCobro = require('../utils/cobro');
// Prueba cada 180 segundos  3 horas
test('120 minutos se cobran como 2 horas ', () => {
// Ingreso a tiempo transcurido  180 minutos 
 const resultado = calcularCobro(0, 2500, 180 * 60 * 1000);   
 // Esperamos 3 horas y un total de 7500
 expect(resultado.horas).toBe(3); 
 expect(resultado.total).toBe(7500);
});
test('61 minutos se cobran como 2 horas' , () => {
const resultado = calcularCobro(0, 3000, 61* 60 * 1000);
expect(resultado.horas).toBe(2);
expect(resultado.total).toBe(6000);
});
test('0 minutos se cobran como una hora', () => {
const  resultado = calcularCobro(0,1000,0);
expect (resultado.horas).toBe(1); 
expect (resultado.total).toBe(1000);
});