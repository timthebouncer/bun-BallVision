import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const GenerateContents=()=>{
    const navigate = useNavigate();

    const handleUserCheck= async ()=>{

        const hasPassword = localStorage.getItem('password')

        if(!hasPassword){
            return navigate('/login')
        }
    }


    useEffect(() => {
        handleUserCheck()
    }, []);

    return (
        <div className={'text-center mt-8'}>
            <Link
                className={'px-8 py-4 bg-[#fa0] text-white'}
                to={'/generateArticles'}
            >
                新增文章
            </Link>
            <Link
                className={'px-8 py-4 mx-4 bg-[#fa0] text-white'}
                to={'/editArticles'}
            >
                修改文章
            </Link>
            <Link
                className={'px-8 py-4 bg-[#fa0] text-white'}
                to={'/upload'}
            >
                新增影片
            </Link>
        </div>
    )

}

export default GenerateContents