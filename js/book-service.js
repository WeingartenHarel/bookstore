'use strict';
console.log('book shop service')
const PAGE_SIZE = 3;
var gPageIdx = 0;
var gPages;

const STORAGE_KEY = 'gBooksDB';

var gBooks;

_createBooks();

function getBookId(bookId) {
    var bookIndex = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    return bookIndex
}

function sortByAll(array) {
    array.sort();
    return array;
}

function sortByString(array,sortby) { // sortBy
    //console.log(array);
    array.sort(function (a, b) {
        //console.log(a, b);
        var nameA = a[sortby].toUpperCase(); // ignore upper and lowercase
        var nameB = b[sortby].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;

    });
    return array
}

function sortByNumber(array, sortby) {
    array.sort(function (a, b) {
        var dateA = a[sortby];
        var dateB = b[sortby];
        return dateA - dateB;
    });
}


function getBooks() {
    var fromIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(fromIdx, fromIdx + PAGE_SIZE)
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

function addBook(name, price){
    var newBook = _createBook(makeId(2), name, price, makeLorem(22), 0)
    gBooks.unshift(newBook)
    _saveBooksToStorage();
}

function ratePlus(bookId) { // use diff from btn
    var bookIndex = getBookId(bookId);
    //console.log('bookIndex', bookIndex)
    if (gBooks[bookIndex].rate < 10) {
        gBooks[bookIndex].rate++
        console.log('bookId', bookIndex, gBooks[bookIndex].rate)
        _saveBooksToStorage();
    }  
  
}
function rateMinus(bookId) {
    var bookIndex = getBookId(bookId);
    //console.log('bookIndex', bookIndex)
    if (gBooks[bookIndex].rate > 0) {
        gBooks[bookIndex].rate--
        console.log('bookId', bookIndex, gBooks[bookIndex].rate)
        _saveBooksToStorage();
    }  
}

function getBookDetalis(bookId){
    var bookIndex = getBookId(bookId);
    return bookIndex
}

function updateBook(bookId, bookPrice) {
    console.log('onUpdateBook', bookId, bookPrice)
    var bookIndex = getBookId(bookId); //getBookInxById
    gBooks[bookIndex].price = bookPrice;
    _saveBooksToStorage();
}

function removeBook(bookId) {
    console.log(bookId)
    //gbooks.splice(bookId,1)
    var bookIndex = getBookId(bookId); //getBookInxById
    console.log(bookIndex)
    gBooks.splice(bookIndex, 1)
    _saveBooksToStorage();
}

function _createBook(id,title,price,content,rate) {
    return {
        id: id,
        title: title,
        price: price,
        content: content,
        rate: rate,
    }
}


function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
 
        books = []
        for (let i = 0; i < 3; i++) {

            var book = _createBook(makeId(2), `book${i}` , makePrice(),makeLorem(22),0) //less values
            console.log('create books', book)
            books.push(book)
        }
    }
    //console.log('books', books)
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() { // save to.....
    saveToStorage(STORAGE_KEY, gBooks)
}
