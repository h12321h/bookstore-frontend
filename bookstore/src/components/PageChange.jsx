import react from "react";
import left from "../img/angle-left.png";
import right from "../img/angle-right.png";
import {useState, useEffect} from "react";

function PageChange({currentPage, handlePageChange}) {
    const [tempPage, setTempPage] = useState(currentPage);
    const handleKeyDown = (event) => {//处理按下回车输入的页数
        if (event.key === 'Enter') {
            if (handlePageChange(tempPage) === 0) {
                setTempPage(currentPage);
            }
        }

    }

    useEffect(() => {//处理页面切换
        setTempPage(currentPage);
    }, [currentPage])

    return (
        <div className="page_change relative h-24 flex flex-row justify-center">
            <div className=" flex flex-row ">
                {/*上一页按钮*/}
                <button className="bg-white rounded-lg shadow-lg hover:bg-blue-50 w-32 h-12 m-4 " onClick={() => {
                    handlePageChange(currentPage - 1)
                }}>
                    上一页
                </button>
                {/*//下一页按钮*/}
                <button className="bg-white rounded-lg shadow-lg hover:bg-blue-50 w-32 h-12 m-4 " onClick={() => {
                    handlePageChange(currentPage + 1)
                }}>
                    下一页
                </button>
            </div>
            <div className="absolute right-0 flex flex-row mt-1 mr-10">
                {/*//上一页按钮*/}
                <button className="rounded-lg hover:bg-gray-200 hover:shadow-lg w-10 h-10 my-4"
                        onClick={() => handlePageChange(currentPage - 1)}>
                    <img src={left} alt=" < " className="bg-transparent w-4 h-4 mx-auto my-auto"/>
                </button>
                {/*//输入页数*/}
                <input type="text" value={tempPage}
                       className="w-10 h-10 my-auto ml-1 border-2 border-blue-400 rounded-lg text-center"
                       onChange={e => {
                           setTempPage(e.target.value)
                       }}
                       onKeyDown={e => {
                           handleKeyDown(e)
                       }}/>
                {/*//下一页按钮*/}
                <button className="rounded-lg hover:bg-gray-200 hover:shadow-lg w-10 h-10 my-4 ml-1"
                        onClick={() => handlePageChange(currentPage + 1)}>
                    <img src={right} alt=" > " className="bg-transparent w-4 h-4 mx-auto my-auto"/>
                </button>
            </div>
        </div>
    );
}

export default PageChange;