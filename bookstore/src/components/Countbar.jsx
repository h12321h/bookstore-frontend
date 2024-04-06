
export default function Countbar({handleSelectAll,totalNum,totalPrice}) {
    console.log(totalNum,totalPrice);
    return(
        <div className="fixed bottom-0 w-full h-16 bg-blue-100 flex flex-row items-center">
            <input type="checkbox" className="ml-32 w-4 h-4 rounded-full checked:bg-blue-400"
                    onChange={e=>{handleSelectAll(e.target.checked)}}/>
            <p className="ml-4 text-l">全选</p>
            <div className="w-1/2"></div>
            <p className="ml-4 text-gray-400">一共</p>
            <p id="book_num" className="ml-1 text-gray-400">{totalNum}</p>
            <p className="ml-1 text-gray-400">件</p>
            <p className="ml-12">合计：</p>
            <p className=" text-xl text-blue-800">{'¥'+totalPrice}</p>
            <button className="ml-24 bg-blue-900 w-32 h-12 rounded-lg shadow-lg text-white hover:bg-blue-950 ml-4">结
                算
            </button>
        </div>
    )
}