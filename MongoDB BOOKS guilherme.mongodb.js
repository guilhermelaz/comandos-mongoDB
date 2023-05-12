// Inicial
use('books')

let docs_books = db.getCollection('livros');


// ## Livros com mais de 1092 pagecount (paginas)

// buscar os maiores que 1092, 1092 é outro objeto e a chave é $gt (greater than:)
let rs = docs_books.find(
    { "pageCount": { $gt:1092 } },
    { "title": 1, "pageCount": 1 } // aparece e não aparece
)

// console.log(JSON.stringify(rs.toArray(), null, 2))

rs.forEach(book => {
    // "f string"
    console.log(`Title: ${book.title} \n\nPage count: ${book.pageCount}`)
});
console.log(`Total: ${rs.count()}`)

// ## Listar todas as categorias existentes:

rs = docs_books.distinct("categories")
console.log("Categorias: \n" + JSON.stringify(rs, null, 2))
console.log(`Total: ${rs.length}`)

// ## Listar os tipos de status

rs = docs_books.distinct("status")
console.log("Status: \n" + JSON.stringify(rs, null, 2))
console.log(`Total: ${rs.length}`)

// ## Listar os 5 livros com o maior número de páginas:

console.log("\n\n ## Listar os 5 livros com o maior número de páginas:\n")
rs = docs_books.find().sort( {pageCount: -1} ).limit(5)
rs.forEach(book => {
    // "f string"
    console.log(`Title: ${book.title} --- Page count: ${book.pageCount}`)
});

// ## Livros sobre COBOL

console.log("\n\n ## Livros sobre COBOL")

rs = docs_books.find({
    $or: [
        { "categories": "COBOL" },
        { "longDescription": { $regex: /COBOL/i } }
    ],
})

rs.forEach(book => {
    // "f string"
    console.log(`Title: ${book.title}`)
});


// ## Título contém a palavra "Development" e publicados a partir de 2000:

console.log("\n\n ## Título contém a palavra 'Development' e publicados a partir de 2000:")

rs = docs_books.find(
    { $and: [
        { "title": { $regex: /Development/i } },
        { "publishedDate.$date": { $gt: "2000-01-01T00:00:00.000Z" } }
    ]}
    )

rs.forEach(book => {
    // "f string"
    console.log(`Title: ${book.title} --- Publi year: ${book.publishedDate}`)
});

// ## Livros publicados anteriores a 1995

console.log("\n\n ## Livros publicados anteriores a 1995:")

rs = docs_books.find(
    {"publishedDate.$date": { $lt: "1995-01-01"} }
)

rs.forEach(book => {
    // tipo "f string" d python usa ` e ${} para inserir as variáveis - NÃO CONSEGUI IMPRIMIR AS DATAS.
    console.log(`Title: ${book.title} --- Publi year: ${book.publishedDate}`)
});

// ## Total de livros publicados no ano 2000

console.log("\n\n ## Total de livros publicados no ano 2000:")

rs = docs_books.find(
    { $and: [
        {"publishedDate.$date": { $lte: "2000-12-31T00:00:00Z" }},
        {"publishedDate.$date": { $gt: "2000-01-01T00:00:00Z" }}
    ]
    }
)

rs.forEach(book => {
    console.log(`Title: ${book.title}`)
});

// ## Contém a palavra "Debugger" na descrição

console.log("\n\n ## Contém a palavra \"Debugger\" na descrição:")

rs = docs_books.find(
    {"longDescription": {$regex: /Debugger/i}}
)

rs.forEach(book => {
    console.log(`Title: ${book.title}\n LongDescription: ${book.longDescription}\n`)
});

// ## Qual o livro com o menor número de páginas?

console.log("## O livro com o menor número de páginas QUE NÃO É 0 (0 = PLACEHOLDER):")

rs = docs_books.find(
    {"pageCount": {$gt: 0}}
).sort( {pageCount: 1} ).limit(1)

rs.forEach(book => {
    console.log(`Title: ${book.title}\n Paginas: ${book.pageCount}\n`)
});

// ##  Qual o livro publicado mais antigo?

console.log("## O livro publicado mais antigo:")

rs = docs_books.find(
    {"status": "PUBLISH"}).sort( {"publishedDate": 1}).limit(1)

rs.forEach(book => {
    console.log(`Title: ${book.title}\n Status: ${book.status}\n Publi date: ${book.publishedDate}`)
});

// ## Livros com 3 ou mais autores

console.log("## Livros com 3 ou mais autores:")

rs = docs_books.find(
     
    { $expr: {$gte: [{ "$size": "$authors"}, 3]}}
    
)

// { "authors": { "$size": {"$gte": 3} } }

rs.forEach(book => {
    console.log(`Title: ${book.title}\n Autores: ${book.authors}`)
});

// ## Contem o termo "Java" e foi publicado a partir de 2013.

console.log(" Contem o termo \"Java\" e foi publicado a partir de 2013:")

rs = docs_books.find({
    $or: [
        {"title": {$regex: /Java/i}},
        {"longDescription": {$regex: /Java/i}},
        {"shortDescription": {$regex: /Java/i}},
        {"categories": "Java"}
    ],
    "publishedDate.$date": { $gt: new Date("2013-01-01T00:00:00Z") }
})

rs.forEach(book => {
    console.log(`Title: ${book.title}'n`)
});

// ## Livros que contém a categoria "Networking"

console.log("Livros que contém a categoria Networking:")

rs = docs_books.find({ 
    "categories": `Networking`
 });

rs.forEach(book => {
    console.log(`Title: ${book.title}'n`)
});

// ## Livros que contém a categoria "Networking" publicados depois do ano 2000:

console.log("Livros que contém a categoria \"Networking\" publicados depois do ano 2000:")

rs = docs_books.find({
    "categories": "Networking",
    "publishedDate.$date": { $gte: "2000-01-01" } })

rs.forEach(book => {
    console.log(`Title: ${book.title}'n`)
});

// ## Total de livros na categoria networking?

rs = docs_books.find({
    "categories": "Networking"
    }
).count()
console.log("Quantidade de livros com a categoria Networking: " + rs)

// ## sumarizar total por categoria

rs = docs_books.aggregate(
    [
        { "$unwind": "$categories" },
        { "$group": { "_id": "$categories", "count": { "$sum": 1 } } }
    ])


// configs globais

use("books")
let livros = db.getCollection("livros")

const Queries = { //classe js

    q1: () => { // metodo js

    },

    //q2: () => {},
    // ...

    run: () => {
        Queries.q1();
        // ...
    }
}

Queries.run()