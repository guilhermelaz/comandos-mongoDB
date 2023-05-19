use('books')

let books = db.getCollection('livros');

res = books.aggregate([
    {
        $match: { "authors": { $regex: /Isidor/i} }
    },
    {
        $group: { 
            _id: "$authors", 
            total: { 
              $sum: 1
          }
        }
    }
])
res.toArray()