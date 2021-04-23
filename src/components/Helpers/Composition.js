const usuarios = [
  { nome: 'Aluno 1', parcelasFaltantes: 3, valor: 89.9 },
  { nome: 'Aluno 2', parcelasFaltantes: 5, valor: 19.9 },
  { nome: 'Aluno 1', parcelasFaltantes: 7, valor: 49.9 },
  { nome: 'Aluno 1', parcelasFaltantes: 6, valor: 69.9 },
  { nome: 'Aluno 1', parcelasFaltantes: 2, valor: 99.9 }
]

// Reatribuicao das funcoes map e reduce para suportar composicao
const map = fn => xs => xs.map(fn);

const reduce = (fn, ini) => xs => xs.reduce(fn, ini)

//Regra de negocio
const totalPorUsuario = usuario =>
  usuario.parcelasFaltantes * usuario.valor;

//Separacao de responsabilidade, usando a composicao do map
const calculoTotalUsuarios = map(totalPorUsuario);

// Funcao generica
const soma = (a, b) => a + b;

// Reducao de todos os usuarios, somando todos e comecando a partir de 0
const somaTodosUsuarios = reduce(soma,0)

// Composicao das funcoes calculoTotalUsuarios e somaTodosUsuarios
const somatorioTotal = usuarios =>
  somaTodosUsuarios(calculoTotalUsuarios(usuarios))

console.log('valor total faltante =>', somatorioTotal(usuarios))