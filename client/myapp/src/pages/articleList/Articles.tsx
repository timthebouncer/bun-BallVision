import './articleList.css'
import {Link} from "react-router-dom";
import {EyeOutlined} from "@ant-design/icons";
import {Pagination} from "antd";
import axiosInstance from "../../../utils/axiosInstance";
import {FC} from "react";


type Article ={
    id: string
    avatar: string
    title: string
    intro: string
    content: string
    views: number
}
interface ArticlesProps {
    articleList: Article[];
}


const Articles: FC<ArticlesProps>=({articleList})=>{


    const onUpdateArticleView=(id:string)=>{
        axiosInstance.put('/updateArticleView', {id})
    }




    return <div className={'flex'}>
        <div>
            {
                articleList.map(data=>{
                    return <div key={data.id} className='px-2 py-2 mb-2 bg-white'>
                        <Link to={`/articles/${data.id}`} className='flex' onClick={()=>onUpdateArticleView(data.id)}>
                            <div className={'photo-wrapper'}>
                                <img src={data.avatar} alt="" width={170} />
                            </div>
                            <div className={'content-wrapper'}>
                                <div className={'text-xl h-2/5'}>
                                    {data.title}
                                </div>
                                <div className={'content-style  h-2/5'}>
                                    {data.intro}
                                </div>
                                <div style={{color:'#9d9b9b',  }} className={'h-1/5 text-end'}>
                                    <EyeOutlined className={'color-white mr-2'}  />
                                    <span>{data.views}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                })
            }

            <div className="pagination">
                <Pagination
                    // defaultCurrent={searchParams.pageNumber}
                    // defaultPageSize={searchParams.pageSize}
                    // total={totalElement}
                    // onChange={(e)=>{
                    //     setSearchParams({...searchParams, pageNumber: e})
                    // }}
                />
            </div>

        </div>
    </div>
}

export default Articles

