import { useState } from 'react';
import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';
import * as React from "react";

interface UploadImgProps {
    setNewArticleParams: (params: any) => void;
}

const UploadImg: React.FC<UploadImgProps> = ({ setNewArticleParams }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onRemove = (file: UploadFile) => {
        const newFileList = fileList.filter(e => e.uid !== file.uid);
        setFileList(newFileList);
    };

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
                setNewArticleParams((pre: any) => ({ ...pre, avatar: e.url }));
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

    return (
        <div>
            <Upload {...uploadProps}>
                {fileList.length < 5 && '+ Upload'}
            </Upload>
        </div>
    );
};

export { UploadImg };