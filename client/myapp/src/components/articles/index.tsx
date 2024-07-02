import {useEffect, useRef, useState} from "react";
import * as React from "react";
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { fetchTweet, Tweet } from 'react-tweet'
import './base.css'
import Quill from "quill";
import {Button} from "antd";
import axiosInstance from "../../../utils/axiosInstance";
import {useParams} from "react-router-dom";
const Delta = Quill.import('delta');

interface Attribute {
    header?: number;
    bold?: boolean;
    underline?: boolean;
}

interface Insert {
    insert: string | { image: string };
    attributes?: Attribute;
}


const SingleArticle=()=>{
    const [contents, setContents] = useState([])

    const {articleId} = useParams()

    const onGetSingleArticle=async ()=>{
        const {data} = await axiosInstance.get(`api/getSingleArticle${articleId}`)
        console.log(data.list[0].content,'data.list')
        setContents(data.list[0].content)
    }

    useEffect(()=>{
        onGetSingleArticle()
    }, [])


    const renderContent = (content: Insert[]) => {
        return content.map((item, index) => {
            const parts = typeof item.insert === 'string' ? item.insert.split(/(\n|https:\/\/x\.com\/\S+\/status\/\d+)/g) : [item.insert];

            return parts.map((part, partIndex) => {

                if (part === '\n') {
                    return <br key={`${index}-${partIndex}`} />;
                }

                if (typeof part === 'string' && part.startsWith('https://x.com/')) {
                    const tweetIdMatch = part.match(/status\/(\d+)/);
                    if (tweetIdMatch) {
                        const tweetId = tweetIdMatch[1];
                        return <Tweet key={`${index}-${partIndex}`} id={tweetId} />;
                    }
                }

                if (typeof part === 'object' && 'image' in part) {
                    return <img key={index} src={part.image} alt="base64 image" />;
                }

                let style: React.CSSProperties = { whiteSpace: 'pre-wrap' };
                if (item.attributes?.bold) {
                    style.fontWeight = 'bold';
                }
                if (item.attributes?.underline) {
                    style.textDecoration = 'underline';
                }

                if (item.attributes?.header && partIndex === 0) {
                    return React.createElement(`h${item.attributes.header}`, { key: `${index}-${partIndex}`, style }, part);
                }

                return <span key={`${index}-${partIndex}`} style={style}>{part}</span>;
            });
        });
    };

    // useEffect(()=>{
    //     const content = localStorage.getItem('articleContent')
    //     console.log(JSON.parse(content),'ccccc')
    //     if(content?.length > 0){
    //         setContents(JSON.parse(content))
    //     }
    // },[])




        return <div className='singleArticleWrapper sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl p-4'>

            <div className={'size'}>
                {renderContent(contents)}
            </div>
    </div>
}


export {SingleArticle}