use('books')

let books = db.getCollection('livros');

res = books.aggregate([
    {
        $group: { 
            _id: "_id", 
            med: { 
              $avg: { $size: "$authors" }
          }
        }
    }
])
res.toArray()