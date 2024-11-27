
import { useLocation } from 'react-router-dom';
import {useState,useEffect} from "react";
import {getBookByTag} from "../service/book";
import BookList from "../components/BookList";
import {Flex, Tag} from "antd";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchTagPage() {
    const query = useQuery();
    const searchTerm = query.get('query');


    const [books, setBooks] = useState([]);
    const [tags,setTags]=useState([]);

    const initSearch = async () => {
        getBookByTag(searchTerm).then(data => {
                setBooks(data.books);
                setTags(data.tags);
            }
        );
    }

    useEffect(() => {
        initSearch();
    }, [searchTerm]);


    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <div className="text-xl mt-6 ml-10"></div>
                <Flex gap="4px 0" wrap>
                    <p className="text-xl">{'和"' + searchTerm + '"相关的标签有'}</p>
                    {tags.map((tag, index) => (
                        <Tag color="geekblue">{tag.name}</Tag>
                    ))}
                </Flex>
                <BookList books={books}/>
            </div>
        </div>
    );
}