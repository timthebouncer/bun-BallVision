import React, { useState } from 'react';
import { Upload } from 'antd';
import type { UploadFile } from 'antd';



const UploadImg: React.FC = ({setNewArticleParams}) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onRemove = ({uid}) => {
        const i = fileList.findIndex(e => e.uid === uid)
        if (i !== -1) {
            setFileList(e => [...e.slice(0, i), ...e.slice(i + 1, e.length)])
        }
    }

    const onData = async file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new (window as any).Image();
            img.src = reader.result
            img.onload = () => {
                const e = {...file}
                const naturalHeight = img.naturalHeight;
                const naturalWidth = img.naturalWidth;
                // setImgWidth(naturalWidth)
                // setImgHeight(naturalHeight)
                // getSize.push({id:e.uid,calWidthHeight: naturalWidth * naturalHeight})
                // setSize(getSize)
                for (let key in file) {
                    e[key] = file[key]
                }
                e.isPass = null
                e.widthHeight = `${naturalWidth} x ${naturalHeight}`
                e.url = reader.result
                setNewArticleParams(pre=>({...pre, avatar: e.url}))
                setFileList(f=> [...f, e])
            }
        }
    }

    return (
        <>
            <div>
                <Upload
                    // customRequest={dummyRequest}
                    listType="picture-card"
                    data={onData}
                    fileList={fileList}
                    onRemove={onRemove}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </div>
        </>
    );
};

export {UploadImg};