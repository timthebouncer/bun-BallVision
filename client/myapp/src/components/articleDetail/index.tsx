import {ReactNode, useEffect, useState} from "react";
import { Tweet } from 'react-tweet'
import './base.css'
import axiosInstance from "../../../utils/axiosInstance";
import {useParams} from "react-router-dom";
import * as React from "react";

interface Attribute {
    header?: number;
    bold?: boolean;
    underline?: boolean;
    color?: string;
    list?: 'ordered' | 'bullet';
    align?: 'center' | 'right' | 'justify';
}

interface Insert {
    insert: string | { image?: string; video?: string };
    attributes?: Attribute;
}

const Image: React.FC<{ src: string }> = ({ src }) => {
    return <img src={src} alt="base64 image" style={{ maxWidth: '100%' }} />;
};

const Video: React.FC<{ src: string; align?: string }> = ({ src, align }) => {
    return (
        <div style={{ display:'flex', justifyContent: align || 'left' }}>
            <iframe
                width="80%"
                height="500"
                src={src}
                title="Embedded video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

const Header: React.FC<{ level: number; style?: React.CSSProperties, children?:ReactNode  }> = ({ level, style, children }) => {
    return React.createElement(`h${level}`, { style }, children);
};


const Span: React.FC<{ style?: React.CSSProperties, children?:ReactNode }> = ({ style, children }) => {
    return <span style={style}>{children}</span>;
};

const Br: React.FC = () => {
    return <br />;
};




const SingleArticle=()=>{
    const [contents, setContents] = useState([])

    const {articleId} = useParams()

    const onGetSingleArticle=async ()=>{
        const {data} = await axiosInstance.get(`/getSingleArticle${articleId}`)
        console.log(typeof data.list[0].content)
        console.log(data.list)
        setContents(data.list[0].content)
    }

    useEffect(()=>{
        onGetSingleArticle()
    }, [])





    const renderContent = (content: Insert[]) => {
        let currentListItems: JSX.Element[] = [];
        let currentListType: 'ordered' | 'bullet' | null = null;
        const renderedElements: JSX.Element[] = [];

        content.forEach((item, index) => {
            if (typeof item.insert === 'string') {
                const parts = item.insert.split(/(\n|https:\/\/(?:x|twitter)\.com\/\S+\/status\/\d+(?:\/\S+)?)/g).filter(part => part !== '');

                parts.forEach((part, partIndex) => {
                    if (part === '\n') {
                        if (currentListItems.length > 0) {
                            const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
                            renderedElements.push(
                                React.createElement(listTag, { key: `${index}-${partIndex}` }, currentListItems)
                            );
                            currentListItems = [];
                            currentListType = null;
                        } else {
                            renderedElements.push(<Br key={`${index}-${partIndex}`} />);
                        }
                        return;
                    }

                    if (part.startsWith('https://x.com/') || part.startsWith('https://twitter.com/')) {
                        const tweetIdMatch = part.match(/status\/(\d+)/);
                        if (tweetIdMatch) {
                            const tweetId = tweetIdMatch[1];
                            renderedElements.push(<Tweet key={`${index}-${partIndex}`} id={tweetId} />);
                            return;
                        }
                    }

                    let style: React.CSSProperties = { whiteSpace: 'pre-wrap' };
                    if (item.attributes?.bold) {
                        style.fontWeight = 'bold';
                    }
                    if (item.attributes?.underline) {
                        style.textDecoration = 'underline';
                    }
                    if (item.attributes?.color) {
                        style.color = item.attributes.color;
                    }
                    if (item.attributes?.align) {
                        style.textAlign = item.attributes.align as any;
                    }

                    if (item.attributes?.header && partIndex === 0) {
                        renderedElements.push(<Header key={`${index}-${partIndex}`} level={item.attributes.header} style={style}>{part}</Header>);
                        return;
                    }

                    if (item.attributes?.list) {
                        if (currentListType !== item.attributes.list) {
                            if (currentListItems.length > 0) {
                                const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
                                renderedElements.push(
                                    React.createElement(listTag, { key: `${index}-${partIndex}` }, currentListItems)
                                );
                                currentListItems = [];
                            }
                            currentListType = item.attributes.list;
                        }
                        currentListItems.push(<li key={`${index}-${partIndex}`}>{part}</li>);
                    } else {
                        if (currentListItems.length > 0) {
                            const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
                            renderedElements.push(
                                React.createElement(listTag, { key: `${index}-${partIndex}` }, currentListItems)
                            );
                            currentListItems = [];
                            currentListType = null;
                        }
                        renderedElements.push(<Span key={`${index}-${partIndex}`} style={style}>{part}</Span>);
                    }
                });
            }

            if (typeof item.insert === 'object') {
                if (item.insert.image) {
                    renderedElements.push(<Image key={index} src={item.insert.image} />);
                }
                if (item.insert.video) {
                    renderedElements.push(<Video key={index} src={item.insert.video} align={item.attributes?.align} />);
                }
            }
        });

        if (currentListItems.length > 0) {
            const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
            renderedElements.push(
                React.createElement(listTag, { key: "final-list" }, currentListItems)
            );
        }

        return renderedElements;
    };


        return <div className='singleArticleWrapper sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl p-4'>

            <div className={'size'}>
                {contents?.length > 0 && renderContent(contents)}
            </div>
    </div>
}


export default SingleArticle