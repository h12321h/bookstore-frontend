import logo from './logo.svg';
import './css/style.css'
import './css/output.css'
import AppRouter from './components/router';
import {useState} from "react";
import coverImageUrl from "./img/bg.jpg";

function App() {
  const [book,setBook] =useState( [
    { id: 1, title: "Book One", author: "Author One", coverImageUrl: coverImageUrl, publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100, quantity: 1,checked: false},
    { id: 2, title: "Book Two", author: "Author Two", coverImageUrl: coverImageUrl, publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 3, title: "Book Three", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 4, title: "Book 4", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 5, title: "Book 5", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 6, title: "Book 6", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 7, title: "Book 7", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false}
    // 更多书籍...
  ]);

  const [person,setPerson] =useState({
    id: 1,
    name: "张三",
    avatar:coverImageUrl,
    level: 1,
    age:12,
    contact: "123456789",
    introduction: "这是张三"
  });

  return (
      <AppRouter book={book} setBook={setBook} person={person} setPerson={setPerson}/>
  );
}
export default App;
