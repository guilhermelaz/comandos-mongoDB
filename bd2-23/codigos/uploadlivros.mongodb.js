use('books'); 

let tb_books = db.getCollection('livros');

tb_books.drop();


const fs = require('fs');
let rawdata = fs.readFileSync('./data/books3.json');

let data = JSON.parse(rawdata);
console.log('Total de livros carregados do arquivo: ' + data.length);

console.log('Inserindo Documentos no cloud atlas...');
tb_books.insertMany(data);
console.log('Total Documentos inseridos: ' + tb_books.countDocuments() + ' livros.');

let doc1 = tb_books.findOne();
console.log(JSON.stringify(doc1, null, 2))
