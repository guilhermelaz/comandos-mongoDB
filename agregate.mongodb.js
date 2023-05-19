use('books')

let books = db.getCollection('livros');

let res = books.aggregate([
    {
        $project: {
            "title": 1,
            "pageCount": 1,
            "_id": 0
        }
    },
    {
        $match: { "pageCount": {$gt: 600} }
    },
    {
        $limit: 5
    },
    {
        $sort: { "pageCount": 1 }
    }//,
    // {
    //     $group: {
    //         _id: "_id",
    //         media_paginas: {
    //             $avg: "$pageCount"
    //         }
    //     }
    // }
])

res.toArray()


////////////////////////////////////////////////////////////////
use('books')

books = db.getCollection('livros');

res = books.aggregate([
    {
        $match: { "categories": "Java" }
    },
    {
        $group: {
            _id: "_id",
            books: {
                $sum: 1
            }
        }
    }

])

res.toArray()