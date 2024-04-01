import react from 'react';
import Book from "./Book";

import coverImageUrl from "../img/bg.jpg";



const books = [
    { id: 1, title: "Book One", author: "Author One", coverImageUrl: coverImageUrl, littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100},
    { id: 2, title: "Book Two", author: "Author Two", coverImageUrl: coverImageUrl, littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100 },
    { id: 3, title: "Book Three", author: "Author Three", coverImageUrl: coverImageUrl , littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100},
    { id: 4, title: "Book 4", author: "Author Three", coverImageUrl: coverImageUrl , littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100},
    { id: 5, title: "Book 5", author: "Author Three", coverImageUrl: coverImageUrl , littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100},
    { id: 6, title: "Book 6", author: "Author Three", coverImageUrl: coverImageUrl , littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100},
    { id: 7, title: "Book 7", author: "Author Three", coverImageUrl: coverImageUrl , littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100}
    // 更多书籍...
];

function BookList() {
  return (
      <div className="booklist grid grid-cols-4 gap-4 place-items-center">
          {books.map(book => (
              <Book
                  key={book.id}
                  coverImageUrl={book.coverImageUrl}
                  title={book.title}
                  author={book.author}
                  price={book.price}
              />
          ))}
      </div>
  );
}

export default BookList;