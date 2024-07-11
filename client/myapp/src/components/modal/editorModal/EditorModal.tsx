import {Button, Input, Modal, Select} from "antd";
import {UploadImg} from "../../upload/upload.tsx";
import {Editor} from "../../editor/Editor.tsx";
import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import Quill from "quill";
import axiosInstance from "../../../../utils/axiosInstance.ts";
import {errorToaster, successToaster} from "../../toaster/Toaster";

type ArticleParams = {
    title?: string;
    intro?: string;
    avatar: string;
    [key: string]: any;
}

type ShowEditorType = {
    isVisible: boolean
    content: string[]
    type: string
    avatar: string
    title: string
    intro: string
    category: string
}

type ModalParamsType = {
    showEditor: ShowEditorType
    setShowEditor: (p: {
        isVisible: boolean;
        id: number
        content: string[],
        type: string,
        avatar: string
        title: string
        intro: string
        category: string
    })=>void
    onGetArticleList:()=>void
}

const EditorModal:FC<ModalParamsType>=({showEditor, setShowEditor, onGetArticleList})=>{

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
            content = JSON.parse(JSON.stringify(delta.ops, null, 2))
        }
        if(showEditor.type === 'edit'){
            const {status} = await axiosInstance.put('/updateArticle', {
                id: newArticleParams.id,
                title: newArticleParams.title,
                intro: newArticleParams.intro,
                avatar: newArticleParams.avatar,
                category: newArticleParams.category,
                content: newArticleParams.content
            })
            if(status === 200){
                successToaster()
            } else {
                errorToaster()
            }
        } else {
            const {status} = await axiosInstance.post('/addArticle', {...newArticleParams, content})
            if(status === 200){
                successToaster()
            } else {
                errorToaster()
            }
        }
        onGetArticleList()

        onClose()
    }

    const onClose=()=>{
        setShowEditor({isVisible: false, content: [], type: ''})
    }

    useEffect(() => {
        if(showEditor.type === 'edit'){
            setNewArticleParams(showEditor)
        }

    }, [showEditor.isVisible]);


   return <div>
       <Modal
           open={showEditor.isVisible}
           width={1160}
           onCancel={onClose}
           footer={<></>}
       >
           <div>
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
                               value={newArticleParams.category || ''}
                           />
                       </div>
                   </div>
                   <div className={'flex items-center my-8'}>
                       <Input placeholder="輸入標題"
                              style={{height: 50}}
                              value={newArticleParams.title || ''}
                              onChange={(e)=>onHandleChange('title', e)}
                       />
                   </div>
                   <div className={'flex items-center my-8'}>
                       <Input placeholder="輸入簡介"
                              style={{height: 50}}
                              value={newArticleParams.intro || ''}
                              onChange={(e)=>onHandleChange('intro', e)}
                       />
                   </div>
               </div>

               <div>
                   <Editor
                       ref={quillRef}
                       readOnly={false}
                       onSelectionChange={setRange}
                       onTextChange={setLastChange}
                       content={showEditor.content}
                   />
               </div>
               <div className={'flex justify-end my-4 '}>
                   <Button
                       className={'mx-4'}
                       onClick={onClose}>
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

       </Modal>

   </div>
}

export default EditorModal