import {useEffect, useState} from 'react';
import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';
import * as React from "react";
import {dealImage} from "../../../utils/zipImage";

type  ArticleParams = {
    title?: string;
    intro?: string;
    avatar?: string;
    [key: string]: any;
}

interface UploadImgProps {
    newArticleParams: ArticleParams
    setNewArticleParams: (params: any) => void;
}

const UploadImg: React.FC<UploadImgProps> = ({newArticleParams, setNewArticleParams }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onRemove = (file: UploadFile) => {
        const newFileList = fileList.filter(e => e.uid !== file.uid);
        setFileList(newFileList);
    };

    function useImg(base64:string) {
        setNewArticleParams((pre: any) => ({ ...pre, avatar: base64 }));
    }

    const onData = async (file: RcFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result as string;
            img.onload = () => {
                const e = { ...file } as UploadFile & { url?: string; widthHeight?: string };
                const naturalHeight = img.naturalHeight;
                const naturalWidth = img.naturalWidth;
                e.widthHeight = `${naturalWidth} x ${naturalHeight}`;
                e.url = reader.result as string;
                console.log(e,'eee')
                dealImage(e.url, 700, useImg)
                setFileList(f => [...f, e]);
            };
        };
    };

    const uploadProps: UploadProps = {
        listType: 'picture-card',
        beforeUpload: (file) => {
            onData(file);
            return false; // Prevent upload
        },
        fileList: fileList,
        onRemove: onRemove,
    };

    useEffect(() => {
        if(newArticleParams?.avatar){
            setFileList(f => {
                const copyList = f[0]
                return [{...copyList, url: newArticleParams.avatar}]
            });
        }
    }, [newArticleParams]);

    return (
        <div>
            <Upload {...uploadProps}>
                {fileList.length < 5 && '+ Upload'}
            </Upload>
        </div>
    );
};

export { UploadImg };