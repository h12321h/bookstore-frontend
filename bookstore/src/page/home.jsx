import Navbar from "../components/Navbar";
import BookList from '../components/BookList';
import PageChange from '../components/PageChange';

export default function HomePage() {
    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <BookList/>
                <PageChange/>
            </div>
            <div className="fixed top-0 w-full h-20 bg-white flex flex-col items-center">
                <Navbar/>
            </div>
        </div>
    );
}