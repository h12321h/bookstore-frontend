import back from "../img/back.png"
import {useNavigate} from "react-router-dom";
export default function BackButton(){
    const navigate = useNavigate();
    return (
        <div className="absolute mt-10  left-24">
            <button id="back" className="flex flex-row hover:bg-gray-200 rounded-lg" onClick={()=>navigate(-1)}>
                <img src={back} className="bg-transparent h-8 w-8"/>
                <p className="my-auto ml-1 mr-2">返回</p>
            </button>
        </div>
    )
}