import logo from './logo.svg';
import './css/style.css'
import './css/output.css'
import AppRouter from './Router/router';
import {useEffect,useState} from "react";
import coverImageUrl from "./img/bg.jpg";
import { AuthProvider } from './context/AuthContext';  // 引入 AuthProvider
import { ApolloProvider } from "@apollo/client";
import client from "./service/graphQL/ApolloClient";

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
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
  );
}
export default App;
