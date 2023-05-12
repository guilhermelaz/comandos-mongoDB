/* Conecta ao mongodb atlas e carrega os dados de municipios */
// conecta ao banco de dados geo
use('geo'); 

// salva numa variavel a coleção municipios
let colMuni = db.getCollection('municipios');

// apaga todos os documentos de municipios antes de importar os novos
colMuni.drop();

// importa api do Nodejs para ler arquivos:
const fs = require('fs');
let rawdata = fs.readFileSync('./data/municipios.json');
// converte o conteudo do arquivo para um objeto javascript (data):
let data = JSON.parse(rawdata);
console.log('Total municipios carregados do arquivo: ' + data.length);

console.log('Inserindo Documentos no cloud atlas...');
colMuni.insertMany(data);
console.log('Total Documentos inseridos: ' + colMuni.countDocuments() + ' municipios.');
// abrir cloud atlas e verificar se os documentos foram inseridos na
// base de dados "geo" -> coleção "municipios"

// teste: primeiro Documento da Coleção é... "Alta Floresta D'Oeste"
let doc1 = colMuni.findOne();
console.log(JSON.stringify(doc1, null, 2))
