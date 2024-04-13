import react from 'react';
import Book from "./Book";

import coverImageUrl from "../img/bg.jpg";

function BookList({books,currentPage}) {
  return (
      <div className="booklist grid grid-cols-4 gap-4 place-items-center">
          {books.slice((currentPage-1)*12,currentPage*12).map(book => (
              <Book
                  key={book.id}
                    id={book.id}
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