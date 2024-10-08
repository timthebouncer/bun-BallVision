import {ChangeEvent, useRef, useState} from "react";
import './generateArticles.css'
import {Editor} from '../../../components/editor/Editor';
import Quill from "quill";
import {Button, Input, Select } from "antd";
import {UploadImg} from "../../../components/upload/upload";
import axiosInstance from "../../../../utils/axiosInstance.ts";
import { useNavigate  } from "react-router-dom";
import {errorToaster, successToaster} from "../../../components/toaster/Toaster";
import {dealImage} from "../../../../utils/zipImage";

const Delta = Quill.import('delta');

type  ArticleParams = {
    title?: string;
    intro?: string;
    avatar?: string;
    [key: string]: any;
}


function isImageInsertWrapper(insert: Insert): insert is ImageInsertWrapper {
    return (insert as ImageInsertWrapper).insert.image !== undefined;
}
const GenerateArticles=()=>{
    const navigate = useNavigate();
    const quillRef = useRef<Quill | null>(null);
    const [, setRange] = useState();
    const [, setLastChange] = useState();
    const [newArticleParams, setNewArticleParams] = useState<ArticleParams>({})

    const onHandleChange=(type:string, e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target
        setNewArticleParams({...newArticleParams, [type]: value})
    }

    const onSubmit= async ()=>{


        let content:Insert[] = []

        if(quillRef.current){
            quillRef.current.update()
            const delta = await quillRef.current.getContents()
            // console.log(JSON.parse(JSON.stringify(delta.ops, null, 2)));
            content = JSON.parse(JSON.stringify(delta.ops, null, 2))
        }

        const imageProcessingPromises = content.map(item => {
            return new Promise<void>((resolve) => {
                if (isImageInsertWrapper(item)) {
                    const useImg = (base64: string) => {
                        item.insert.image = base64; // 更新图像数据
                        resolve(); // 处理完成，调用 resolve
                    };
                    dealImage(item.insert.image, 700, useImg); // 处理图像压缩
                } else {
                    resolve(); // 如果不是图像插入，则直接 resolve
                }
            });
        });

        await Promise.all(imageProcessingPromises);


        const {status} = await axiosInstance.post('/addArticle', {...newArticleParams, content})
        if(status === 200){
            successToaster()
            navigate('/generateContent')
        } else {
            errorToaster()
        }
    }




    return <div>

        <div>
            <div className={'flex items-center'}>
                <div className={'mr-8'}>
                    上傳封面
                </div>
                <UploadImg newArticleParams={newArticleParams} setNewArticleParams={setNewArticleParams} />
                <div className={'flex items-center ml-8'}>
                    <span className={'mr-4'}>
                        文章分類:
                    </span>
                    <Select
                        style={{ width: 120 }}
                        onChange={(e)=> setNewArticleParams({...newArticleParams, category: e})}
                        options={[
                            { value: 'nba', label: 'NBA' },
                            { value: 'tba', label: '台籃' },
                        ]}
                    />
                </div>
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


export default GenerateArticles