import fs from 'fs'
import { fiction } from '../output/books/fiction.js'
import { nonfiction } from '../output/books/nonfiction.js'

let data = ''
// for (let book of fiction) {
//     data += 'INSERT INTO book(genre, rank, title, author, publication_date)\n'
//     data += `VALUES("fiction", ${book.rank}, "${book.title}", "${book.author}", ${book.year});\n\n`
// }

// fs.writeFile('./data/output/books/fiction.sql', data, (err) => {
//     if (err) throw err
// })

for (let book of nonfiction) {
    data += 'INSERT INTO book(genre, rank, title, author, publication_date)\n'
    data += `VALUES('nonfiction', ${book.rank}, '${book.title.replace("'", "&apos;")}', '${book.author.replace("'", "&apos;")}', ${book.year});\n\n`
}

fs.writeFile('./data/output/books/nonfiction.sql', data, (err) => {
    if (err) throw err
})