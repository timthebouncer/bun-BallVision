import {ChangeEvent, useEffect, useRef, useState} from "react";
import * as React from "react";
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { fetchTweet, Tweet } from 'react-tweet'
import './generateArticles.css'
import {Editor} from '../../components/editor/Editor';
import Quill from "quill";
import {Button, Input} from "antd";
import {UploadImg} from "../../components/upload/upload";
const Delta = Quill.import('delta');


const GenerateArticles=()=>{

    const quillRef = useRef();
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    const [newArticleParams, setNewArticleParams] = useState({})

    const onHandleChange=(type:string, e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target
        setNewArticleParams({...newArticleParams, [type]: value})
    }




    return <div className='container justify-center lg:max-w-screen-lg xl:max-w-screen-xl'>

        <div>
            <div className={'flex items-center'}>
                <div className={'mr-8'}>
                    上傳封面
                </div>
                <UploadImg setNewArticleParams={setNewArticleParams} />
            </div>
            <div className={'flex items-center my-8'}>
                <Input placeholder="輸入標題"
                       style={{height: 50}}
                       onChange={(e)=>onHandleChange('title', e)}
                />
            </div>
            <div className={'flex items-center my-8'}>
                <Input placeholder="輸入簡介"
                       style={{height: 50}}
                       onChange={(e)=>onHandleChange('intro', e)}
                />
            </div>

        </div>

        <div>
            <Editor
                ref={quillRef}
                readOnly={false}
                defaultValue={new Delta()
                    .insert('Hello')
                    .insert('\n', { header: 1 })
                    .insert('Some ')
                    .insert('initial', { bold: true })
                    .insert(' ')
                    .insert('content', { underline: true })
                    .insert('\n')}
                onSelectionChange={setRange}
                onTextChange={setLastChange}
            />
        </div>
        <div className={'flex justify-end my-4 '}>
            <Button
                className={'mx-4'}
                onClick={()=>{
                    if(quillRef.current){
                        quillRef.current.update()
                        console.log(quillRef.current.getContents());
                    }
                }}>
                取消
            </Button>
            <Button
                onClick={()=>{
                    console.log(newArticleParams,'nnn')
                    if(quillRef.current){
                        quillRef.current.update()
                        const delta = quillRef.current.getContents()
                        console.log( JSON.stringify(delta.ops, null, 2))
                        // localStorage.setItem('articleContent', JSON.stringify(delta.ops, null, 2))
                    }
                }}>
                送出
            </Button>

        </div>
    </div>
}


export {GenerateArticles}