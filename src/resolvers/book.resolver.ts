
// Data
const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets 2',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];


export default class BookResolver {

    books()
    {
        // console.log(params);
        return books;   
    }

}