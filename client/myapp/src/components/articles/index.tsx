import {useEffect, useRef, useState} from "react";
import * as React from "react";
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { fetchTweet, Tweet } from 'react-tweet'
import './base.css'
import {Editor} from '../editor/Editor.js';
import Quill from "quill";
import {Button} from "antd";
const Delta = Quill.import('delta');


const SingleArticle=()=>{

    const quillRef = useRef();
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();




        return <div className='container justify-center lg:max-w-screen-lg xl:max-w-screen-xl'>

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
                        className={'mx-4'}
                        onClick={()=>{
                            if(quillRef.current){
                                quillRef.current.update()
                                const delta = quillRef.current.getContents()

                                localStorage.setItem('articleContent', JSON.stringify(delta.ops, null, 2))
                            }
                        }}>
                        送出
                    </Button>

            </div>




            {/*<div className='test'>*/}
            {/*    <Tweet id="1805687110566826297" />*/}
            {/*</div>*/}
            {/*<div className='test'>*/}
            {/*    <Tweet id="1805798876139634709" />*/}
            {/*</div>*/}
    </div>
}


export {SingleArticle}