use('books')

let books = db.getCollection('livros');

res = books.aggregate([

    {
        $match: {
            $and: [
                {"categories": "Internet"},
                {"categories": "XML"}
            ]}
    },
    {
        $group: {
            _id: "_id",
            total: {
                $sum: 1
            }
        }
    }

])

res.toArray()
