
import { useLocation } from 'react-router-dom';
import {useState,useEffect} from "react";
import {getBookByTag} from "../service/book";
import BookList from "../components/BookList";
import {Flex, Tag} from "antd";
import {getCountKeywords} from "../service/keyWords";


export default function CountKeywordsPage() {
    const [keyWords, setKeyWords] = useState([]);

    const initSearch = async () => {
        getCountKeywords().then(data => {
            const formattedData = Object.entries(data).map(([tag, count]) => ({ tag, count }));
            setKeyWords(formattedData);
            }
        );
    }

    useEffect(() => {
        initSearch();
    }, []);


    return (
        <div>
            <div className="absolute w-full top-24 px-16  bg-gray-100">
                <div className="text-xl mt-6 ml-10"></div>
                <Flex gap="4px 0" wrap>
                    {keyWords.map((keyword, index) => (
                        <div key={index} className="text-lg p-2 bg-white rounded shadow-sm">
                            {keyword.tag}: {keyword.count}
                        </div>
                    ))}
                </Flex>
            </div>
        </div>
    );
}