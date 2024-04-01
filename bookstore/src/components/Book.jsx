import react from "react";

function Book({ id,coverImageUrl,title,author,price}) {
  return (
      <button class="book-item flex flex-col items-center bg-white transform booksize rounded-lg m-8  shadow-lg  hover:-translate-y-2">
          <img src={coverImageUrl} className="mt-2 px-4 pt-4 pb-2 h-64 "/>
          <h1 className="book-name text-xl">{title}</h1>
          <p className="mt-1 text-xs text-gray-400">{author}</p>
          <p className="mt-2 text-m text-blue-800">{'¥' + price}</p>
      </button>
  );
}

export default Book;