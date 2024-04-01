import react from "react";
import left from "../img/angle-left.png";
import right from "../img/angle-right.png";

function PageChange({ coverImageUrl,title, littleIntroduction,author,price}) {
  return (
      <div className="page_change relative h-24 flex flex-row justify-center">
          <div className=" flex flex-row ">
              <button className="bg-white rounded-lg shadow-lg hover:bg-blue-50 w-32 h-12 m-4 ">
                  上一页
              </button>
              <button className="bg-white rounded-lg shadow-lg hover:bg-blue-50 w-32 h-12 m-4 ">
                  下一页
              </button>
          </div>
          <div className="absolute right-0 flex flex-row mt-1 mr-10">
              <button className="rounded-lg hover:bg-gray-200 hover:shadow-lg w-10 h-10 my-4">
                  <img src={left} alt=" < " className="bg-transparent w-4 h-4 mx-auto my-auto"/>
              </button>
              <input type="text" name="page_number" placeholder="1" className="w-10 h-10 my-auto ml-1 border-2 border-blue-400 rounded-lg text-center"/>
              <button className="rounded-lg hover:bg-gray-200 hover:shadow-lg w-10 h-10 my-4 ml-1">
                  <img src={right} alt=" > " className="bg-transparent w-4 h-4 mx-auto my-auto"/>
              </button>
          </div>
      </div>
  );
}

export default PageChange;