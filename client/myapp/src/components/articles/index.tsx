import {useEffect, useRef, useState} from "react";
import * as React from "react";
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { fetchTweet, Tweet } from 'react-tweet'
// import './base.css'
import {Editor} from './Editor.tsx';
import Quill from "quill";
import {Button} from "antd";
const Delta = Quill.import('delta');


const SingleArticle=()=>{

    const quillRef = useRef();
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    const [readOnly, setReadOnly] = useState(false);




        return <div style={{margin: 'auto', position: 'relative'}}>

            <div style={{width:1200}}>
                <Editor
                    ref={quillRef}
                    readOnly={readOnly}
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

            <Button onClick={()=>{
                if(quillRef.current){
                    quillRef.current.update()
                    console.log(quillRef.current.getContents());
                }
            }}>
                送出
            </Button>



            {/*<div className='test'>*/}
            {/*    <Tweet id="1805687110566826297" />*/}
            {/*</div>*/}
            {/*<div className='test'>*/}
            {/*    <Tweet id="1805798876139634709" />*/}
            {/*</div>*/}
    </div>
}


export {SingleArticle}