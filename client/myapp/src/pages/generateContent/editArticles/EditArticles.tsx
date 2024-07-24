import './editArticleList.css'
import {useEffect, useState} from "react";
import axiosInstance from "../../../../utils/axiosInstance.ts";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, Modal, Pagination} from "antd";
import EditorModal from "../../../components/modal/editorModal/EditorModal.tsx";
import {errorToaster, successToaster} from "../../../components/toaster/Toaster.tsx";



type ModalTypeParams = {
    isVisible: boolean
    id: number | null
}



const EditArticles=()=>{
    const [articleList, setArticleList] = useState<ARTICLE[]>([])
    const [, setTotalElement] = useState<number>(0)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<ModalTypeParams>({isVisible: false, id: null});
    const [showEditor, setShowEditor] =
        useState<EditorParamsType>({isVisible: false, content: [], type: 'edit', avatar: '', intro: '', title: '', category:'', id: 0})

    const showModal = (id: number) => {
        setIsDeleteModalOpen({isVisible: true, id: id});
    };

    const handleOk = async () => {
        const {status} = await axiosInstance.delete('/deleteArticle', {params: {id: isDeleteModalOpen.id}})

        if(status === 200){
            successToaster()
            setIsDeleteModalOpen({isVisible: false, id: null});
            onGetArticleList()
        } else {
            errorToaster()
        }
    };

    const handleCancel = () => {
        setIsDeleteModalOpen({isVisible: false, id: null});
    };


    const onGetArticleList= async ()=>{
        const initState={
            category: '',
            pageSize: 10,
            pageNumber: 1
        }

        const {data} = await axiosInstance.get(`/getArticle`, {params: {...initState}})
        setArticleList(data.list)
        setTotalElement(data.totalElement)
    }

    useEffect(()=>{
        onGetArticleList()
    },[])

    return (
        <div>
            <div>
                {
                    articleList.map(data=>{
                        return <div key={data.id} className='px-2 py-2 mb-2 bg-white'>
                            <div className='flex'>
                                <div className={'hidden md:block photo-wrapper'}>
                                    <img src={data.avatar} alt="" width={170} />
                                </div>
                                <div className={'content-wrapper'}>
                                    <div className={'text-xl h-2/6'}>
                                        {data.title}
                                    </div>
                                    <div className={'content-style  h-2/6'}>
                                        {data.intro}
                                    </div>
                                    <div className={'text-end h-2/6'}>
                                        <Button
                                            icon={
                                                <EditOutlined />
                                            }
                                            className={'border-0'}
                                            onClick={()=>setShowEditor({
                                                isVisible: true,
                                                id:data.id,
                                                content: data.content,
                                                type:'edit',
                                                avatar: data.avatar,
                                                title: data.title,
                                                intro: data.intro,
                                                category: data.category,
                                            })}
                                        >
                                        </Button>
                                        <Button
                                            icon={
                                                <DeleteOutlined />
                                            }
                                            className={'border-0'}
                                            onClick={()=> {
                                                showModal(data.id)
                                            }}
                                        >
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }

                <div className="hidden sm:flex justify-end mt-8">
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
            <Modal open={isDeleteModalOpen.isVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>確定要刪除嗎?</p>
            </Modal>
            {
                showEditor.isVisible &&  <EditorModal
                showEditor={showEditor}
                setShowEditor={setShowEditor}
                onGetArticleList={onGetArticleList}
              />
            }
        </div>
    )


}

export default EditArticles