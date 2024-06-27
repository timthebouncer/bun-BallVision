import './App.css'
import {Link, useParams} from "react-router-dom";
import ballLogo from '../../public/ballLogo.png'
import {useEffect, useState} from "react";
import * as React from "react";


interface Attribute {
    header?: number;
    bold?: boolean;
    underline?: boolean;
}

interface Insert {
    insert: string | { image: string };
    attributes?: Attribute;
}

const Articles=()=>{

    const {articleId} = useParams()
    const [contents, setContents] = useState([])

    const dataList=[
        {id: 1,title: '123456', content: '籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，'},
        {id: 2,title: '456789', content: '籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，'},
        {id: 3,title: '987654', content: '籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，'},
    ]

    const renderContent = (contents: Insert[]) => {
        return (contents || [])?.map((item, index) => {
            if (item.insert === '\n') {
                if (item.attributes?.header) {
                    return React.createElement(`h${item.attributes.header}`, { key: index }, null);
                } else {
                    return <br key={index} />;
                }
            }

            // Handle base64 images
            if (typeof item.insert === 'object' && item.insert?.image) {
                return <img key={index} src={item.insert?.image} alt="base64 image" />;
            }

            let text = item.insert;
            let style: React.CSSProperties = {};
            if (item.attributes?.bold) {
                style.fontWeight = 'bold';
            }
            if (item.attributes?.underline) {
                style.textDecoration = 'underline';
            }

            if (item.attributes?.header) {
                return React.createElement(`h${item.attributes.header}`, { key: index, style }, text);
            }

            return <span key={index} style={style}>{text}</span>;
        });
    };


    useEffect(()=>{
      const content = localStorage.getItem('articleContent')
        console.log(JSON.parse(content),'ccccc')
        if(content.length > 0){
            setContents(JSON.parse(content))
        }
    },[])

    return <div className='container sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl flex' style={{background:'#F3F3F3'}}>
        <div className={'flex-1'} style={{width: 736, height: 133}}>
            {
                dataList.map(data=>{
                    return <div key={data.id} className='px-2 py-2 border-b-2 bg-white'>
                        <Link to={`/articles/:${data.id}`} className='flex'>
                            <div className='mr-8'>
                                <img src={ballLogo} alt="" width={170} />
                            </div>
                            <div>
                                <div className={'py-2 mb-2 text-xl'}>
                                    {data.title}
                                </div>
                                <div  style={{fontSize: 14, color: '#9d9b9b'}}>
                                    {data.content}
                                </div>
                            </div>
                        </Link>
                    </div>
                })
            }
        </div>

        <div className={'w-1/5 ml-8 bg-white'}>
            熱門文章
            <div>
                {renderContent(contents)}
            </div>
        </div>


    </div>
}

export default Articles