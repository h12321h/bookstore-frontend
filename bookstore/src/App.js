import logo from './logo.svg';
import './css/style.css'
import './css/output.css'
import AppRouter from './Router/router';
import {useState} from "react";
import coverImageUrl from "./img/bg.jpg";

function App() {
  //写死数据
  const [book,setBook] =useState( [
    { id: 1, title: "Book One", author: "Author One", coverImageUrl: coverImageUrl, publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100, quantity: 1,checked: false},
    { id: 2, title: "Book Two", author: "Author Two", coverImageUrl: coverImageUrl, publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 3, title: "Book Three", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 4, title: "Book 4", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 5, title: "Book 5", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 6, title: "Book 6", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 7, title: "Book 7", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 8, title: "Book 8", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 9, title: "Book 9", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 10, title: "Book 10", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 11, title: "Book 11", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 12, title: "Book 12", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 13, title: "Book 13", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 14, title: "Book 14", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 15, title: "Book 15", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false},
    { id: 16, title: "Book 16", author: "Author Three", coverImageUrl: coverImageUrl , publisher:"publisher1",littleIntroduction: "This is a book about...", Introduction: "This is a book about...", price: 100,quantity: 1,checked: false}
  ]);

  const [person,setPerson] =useState({
    id: 1,
    name: "1",
    avatar:coverImageUrl,
    level: 1,
    age:12,
    contact: "123456789",
    introduction: "这是张三的简介",
    password: "1",
    isLogin: false
  });

  return (
      <AppRouter book={book} setBook={setBook} person={person} setPerson={setPerson}/>
  );
}
export default App;
