/**
 * Verifica se é numero
 * @param {number} number Informe um valor
 * @returns boolean
 */
export function toNumber(number) {
  let num = NaN;
  try {
    num = +number.replace(/\D+/g, "");
  } catch (e) {
    console.info("Erro ao converter para numero");
  }
  return !isNaN(parseFloat(num));
}
