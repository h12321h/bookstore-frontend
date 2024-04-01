import logo from './logo.svg';
import './css/style.css'
import './css/output.css'
import Navbar from "./components/Navbar";
import BookList from './components/BookList';
import PageChange from './components/PageChange';
function App() {
  return (
   <div>
     <Navbar />
     <div className="absolute w-full top-24 px-16  bg-gray-100">
         <BookList />
         <PageChange />
     </div>
   </div>
  );
}

export default App;
