import logo from './logo.svg';
import './css/style.css'
import './css/output.css'
import AppRouter from './Router/router';
import {useEffect,useState} from "react";
import coverImageUrl from "./img/bg.jpg";
import { AuthProvider } from './context/AuthContext';  // 引入 AuthProvider

function initializeLocalStorage() {
  if (!localStorage.getItem('isLogin')) {
    localStorage.setItem('isLogin', false);
  }
}
function App() {
  useEffect(() => {
    initializeLocalStorage();
  }, []);
  return (
      <AppRouter />
  );
}
export default App;
