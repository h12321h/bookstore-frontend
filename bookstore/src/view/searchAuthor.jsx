
import { useLocation } from 'react-router-dom';
import {useState,useEffect} from "react";
import {getAuthorByTitle} from "../service/author";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchAuthorPage() {
    const query = useQuery();
    const searchTerm = query.get('query');


    const [authors, setAuthors] = useState([]);

    const initSearch = async () => {
        getAuthorByTitle(searchTerm).then(data => {
                setAuthors(data);
            }
        );
    }

    useEffect(() => {
        initSearch();
    }, [searchTerm]);


    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <p className="text-xl mt-6 ml-10">{'以下是"' + searchTerm + '"的作者：'}</p>
                <ul className="text-xl mt-6 ml-10">
                    {authors.map((author, index) => (
                        <li key={index}>{author}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}