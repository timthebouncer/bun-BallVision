import './index.css'
import React, { useState } from 'react';
import {Button, Input, Modal} from 'antd';
import TextArea from "antd/es/input/TextArea";

type PropsType={
    isModalOpen: boolean
    modalCallback: modalCallback
    title: string
}
type modalCallback=(arg0: string, arg1: any)=>void

const CustomModal = ({isModalOpen, modalCallback, title}:PropsType) => {
    const [loading, setLoading] = useState(false);
    const [modalContent, setModalContent] = useState({});


    const handleOk = () => {
        modalCallback('submit', modalContent)
    };

    const handleCancel = () => {
        modalCallback('cancel', null)
    };

    return (
        <>
            <Modal
                centered
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <div className={'flex justify-center mt-6'}>
                        <Button className={'mx-2'} key="back" onClick={handleCancel}>
                            取消
                        </Button>
                        <Button className={'mx-2'} key="submit" type="primary" loading={loading} onClick={handleOk}>
                            確定
                        </Button>
                    </div>
                ]}
            >
                <div className={'mb-4 mt-4'}>
                    <Input placeholder="請輸入信箱或電話" style={{height: 50}} className={'bg-white'} />
                </div>
                <div>
                    <TextArea rows={4} maxLength={6} className={'bg-white'} />
                </div>
            </Modal>
        </>
    );
};

export default CustomModal;