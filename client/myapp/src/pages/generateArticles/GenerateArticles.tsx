import {ChangeEvent, useRef, useState} from "react";
import './generateArticles.css'
import {Editor} from '../../components/editor/Editor';
import Quill from "quill";
import {Button, Input} from "antd";
import {UploadImg} from "../../components/upload/upload";
import axiosInstance from "../../../utils/axiosInstance.ts";
const Delta = Quill.import('delta');

type  ArticleParams = {
    title?: string;
    intro?: string;
    [key: string]: any;
}

const GenerateArticles=()=>{

    const quillRef = useRef<Quill | null>(null);
    const [, setRange] = useState();
    const [, setLastChange] = useState();
    const [newArticleParams, setNewArticleParams] = useState<ArticleParams>({})

    const onHandleChange=(type:string, e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target
        setNewArticleParams({...newArticleParams, [type]: value})
    }

    const onSubmit= async ()=>{


        let content:[] = []

        if(quillRef.current){
            quillRef.current.update()
            const delta = await quillRef.current.getContents()
            // console.log(JSON.parse(JSON.stringify(delta.ops, null, 2)));
            content = JSON.parse(JSON.stringify(delta.ops, null, 2))
        }



        await axiosInstance.post('/api/addArticle', {...newArticleParams, content})
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
                onClick={()=>{}}>
                取消
            </Button>
            <Button
                onClick={()=>{
                    onSubmit()
                }}>
                送出
            </Button>

        </div>
    </div>
}


export {GenerateArticles}