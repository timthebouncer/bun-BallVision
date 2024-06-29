import './articleList.css'
import {Link, useParams} from "react-router-dom";
import ballLogo from '../../../public/ballLogo.png'
import {useEffect, useState} from "react";
import * as React from "react";
import {EyeOutlined} from "@ant-design/icons";
import {Pagination} from "antd";


const Articles=()=>{

    const {articleId} = useParams()


    const dataList=[
        {id: 1,title: '123456', content: '籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，'},
        {id: 2,title: '456789', content: '籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，'},
        {id: 3,title: '987654', content: '籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，'},
    ]



    return <div className={'flex'}>
        <div>
            {
                dataList.map(data=>{
                    return <div key={data.id} className='px-2 py-2 mb-2 bg-white'>
                        <Link to={`/articles/:${data.id}`} className='flex'>
                            <div className={'photo-wrapper'}>
                                <img src={'https://shorturl.at/QS5Ev'} alt="" width={170} />
                            </div>
                            <div className={'content-wrapper'}>
                                <div className={'py-2 mb-2 text-xl'}>
                                    {data.title}
                                </div>
                                <div className={'content-style'}>
                                    {data.content}
                                </div>
                                <div style={{color:'#9d9b9b', float: 'right'}}>
                                    <EyeOutlined className={'color-white mr-2'}  />
                                    <span>123456</span>
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

