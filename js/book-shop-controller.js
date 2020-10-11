'use strict';
console.log('book shop')
var gBookid; 

renderBooks()
pagination()

function renderBooks() {
    var books = getBooks();
    var strHTML = books.map(function mapBooks(currentBook, index, array) {
        //console.log(currentBook)
        return `
                <tr class='table-row'>
                    <td class="table-div">${currentBook.id}</td>               
                    <td class="table-div">${currentBook.title}</td>               
                    <td class="table-div">$ ${currentBook.price}</td>               
                    <td class="table-div-action"> 
                        <button class="btn read" onClick="onReadBook('${currentBook.id}')">Read</button>
                        <button class="btn update" onClick="onUpdateBookModalShow('${currentBook.id}')">Update</button>
                        <button class="btn delete" onClick="onRemoveBook('${currentBook.id}')">Delete</button>
    
                    </td>               
                </tr>`
    })
    document.querySelector('.books-table-tbody').innerHTML = strHTML.join('');
    
    
    return strHTML;

}

function markPaginationBtns(page) {

    var btnClass = `.page0${page}`;
    var btn = document.querySelector(btnClass); 
    var allBtns = document.querySelectorAll(".pagination-numbers");
    var color = randomColorByPallete();

    allBtns.forEach(function (item) { item.style.color = '#000';});
    btn.style.color = `${color}`;
}

function goToPage(page){
    //console.log(page, gPageIdx)
    gPageIdx = page;
    renderBooks();
    markPaginationBtns(gPageIdx)
}

function pagination() {
    var pagination = document.querySelector('.pagination-pages')
    var gPages = Math.floor(gBooks.length / PAGE_SIZE);
    var strHTML = '';
    for (var i = 0; i < gPages; i++) {
        //console.log(pagination, gPages)
        strHTML += `<button class="btn page0${i} pagination-numbers " onclick="goToPage(${i})">${i}</button>`
    }
    //console.log(strHTML)
    pagination.innerHTML = strHTML;
    markPaginationBtns(gPageIdx)
}

function onNextPage() {
    nextPage();
    renderBooks();
    markPaginationBtns(gPageIdx)
}

function onSortById() {
    console.log('sort')
    sortByString(gBooks, 'id');
    renderBooks();
}

function onSortByName() {
    sortByString(gBooks,'title');
    renderBooks();
}

function onSortByPrice() {
    sortByNumber(gBooks,'price'); 
    renderBooks();
}

function onRatePlus(bookId) {
    ratePlus(bookId);
    renderBook(bookId)
}

function onRateMinus(bookId) {
    rateMinus(bookId);
    renderBook(bookId)
}

function onCloseBookDetails() {
    var elBookDetails = document.querySelector('.container-book-details');
    elBookDetails.classList.toggle('opacityShow');
}

function BookDetailsToggle() {
    var elContainerBookDetails = document.querySelector('.container-book-details');
    //if (!elContainerBookDetails.classList.contains('opacityShow')) elContainerBookDetails.classList.toggle('opacityShow');
    elContainerBookDetails.classList.toggle('opacityShow');
}

function onReadBook(bookId) {
    var bookIndex = getBookDetalis(bookId);
    BookDetailsToggle()
    //console.log('bookIndex', bookIndex, , bookId)
    renderBook(bookId);   
}

function renderBook(bookId) {
    console.log('render book',bookId)
    var bookIndex = getBookId(bookId);
    console.log('bookIndex', bookIndex)
    var elBookDetails = document.querySelector('.book-details');
    var elContainerBookDetails = document.querySelector('.container-book-details');

    if (bookIndex === -1) {
        elBookDetails.innerHTML = '';
        BookDetailsToggle()
        return
    }

    console.log(bookId, elBookDetails)
    var strHTML = `<div class="detalis">
                       <div class="book-stats">
                           <div class="book-title">Book title: ${gBooks[bookIndex].title} </div>
                           <div class="book-price">Book price: $${gBooks[bookIndex].price} </div>
                           <div class="book-rate">Book rate
                               <button class="btn rateMinus" onClick="onRateMinus('${bookId}')">-</button>                  
                               ${gBooks[bookIndex].rate} 
                              <button class="btn ratePlus" onClick="onRatePlus('${bookId}')">+</button>
                           </div>
                       </div>
                       <div>Book content:
                           ${gBooks[bookIndex].content}                                
                       </div>
                   </div>`;
    elBookDetails.innerHTML = strHTML;

 

}


function onUpdateBookModalShow(bookId){
    var priceModal = document.querySelector('.container-update-price-modal');
    priceModal.hidden = false;
    gBookid = bookId;
    //console.log('onUpdateBookModal', priceModal, bookId)
}
function updateBookModalHide() {
    var priceModal = document.querySelector('.container-update-price-modal');
    priceModal.hidden = true;
}
 
function onUpdateBook(bookId) {  
    var bookId = gBookid;
    var elPrice = document.querySelector('input[name=update-input-price]');
    var bookPrice = elPrice.value;
    //console.log('bookId', bookId, bookPrice, elPrice)

    if (bookPrice !== '') {
        updateBook(bookId, bookPrice);
        renderBooks();
        elPrice.value = '';
        updateBookModalHide();
    }
    console.log('no price')
    elPrice.placeholder = 'Pleas enter a valid Price....'


}

function onAddBook() {
    console.log('addBook');
    var elName = document.querySelector('input[name=input-name]');
    var elPrice = document.querySelector('input[name=input-price]');
    var name = elName.value;
    var price = elPrice.value;
    addBook(name, price)
    renderBooks();
    elName.value = '';
    elPrice.value = '';
}

function onRemoveBook(bookId) {
    //console.log(bookId);
    removeBook(bookId);
    renderBook(bookId)
    renderBooks();

}




