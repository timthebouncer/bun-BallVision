import {Link} from "react-router-dom";

const GenerateContents=(a)=>{

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
                to={'/generateArticles'}
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

export {GenerateContents}