use('books')

// Método 1

let books = db.getCollection('livros');

res = books.aggregate([
    {
        $match: {
            "pageCount": {$gt: 0}
        }
    },
    {
        $sort: {
            "pageCount": -1
        }
    },
    { $limit: 1 },
    { $project: {
        "title": 1,
        "pageCount": 1
    }}
])

/// Método 2

use('books')

books = db.getCollection('livros');

res = books.aggregate([
    { 
        $group: { 
          _id: "_id", 
          max: { 
            $max: "$pageCount"
          },
          min: {
            $min: "$pageCount"
          }
        } 
      }
])