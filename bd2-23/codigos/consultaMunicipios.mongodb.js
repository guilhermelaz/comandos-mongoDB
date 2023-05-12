use('geo');

let colMuni = db.getCollection('municipios');

// consulta 1: todos os municipios do estado de Roraima e ordena por nome
let docs = colMuni.find(
  { Uf: 'RO' }
).sort( { Nome: 1 } );

// docs => é um array de documentos pois usamos o find()

// para imprimir o conteudo do array (documentos):
docs.forEach(d => {
  console.log(`${d.Nome} - ${d.Uf}`);
});

console.log('# Total: ' + docs.count() + ' municipios.'); // 52 municipios