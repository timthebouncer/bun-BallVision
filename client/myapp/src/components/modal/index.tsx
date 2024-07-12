import './index.css';
import { ChangeEvent, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';



const CustomModal: React.FC<PropsType> = ({ isModalOpen, modalCallback, title }) => {
    const [loading, setLoading] = useState(false);
    const [modalContent, setModalContent] = useState<{ emailOrPhone?: string; request?: string }>({});

    const onHandleChange = (type: 'emailOrPhone' | 'request', e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setModalContent({ ...modalContent, [type]: value });
    };

    const handleOk = () => {
        setLoading(true); // Start loading state
        // Simulate async operation (e.g., API call)
        setTimeout(() => {
            modalCallback('submit', modalContent);
            setLoading(false); // End loading state
        }, 1000); // Simulating 1 second delay
    };

    const handleCancel = () => {
        modalCallback('cancel', null);
    };

    return (
        <Modal
            centered
            title={title}
            visible={isModalOpen} // Correct prop name is 'visible', not 'open'
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <div className="flex justify-center mt-6" key="modal-footer">
                    <Button className="mx-2" key="cancel" onClick={handleCancel}>
                        取消
                    </Button>
                    <Button className="mx-2" key="submit" type="primary" loading={loading} onClick={handleOk}>
                        確定
                    </Button>
                </div>,
            ]}
        >
            <div className="mb-4 mt-4">
                <Input
                    placeholder="請輸入信箱或電話"
                    style={{ height: 50 }}
                    className="bg-white"
                    onChange={(e) => onHandleChange('emailOrPhone', e)}
                />
            </div>
            <div>
                <TextArea
                    rows={4}
                    maxLength={6} // Adjusted to maxLength from maxLength={6}
                    className="bg-white"
                    onChange={(e) => onHandleChange('request', e)}
                />
            </div>
        </Modal>
    );
};

export default CustomModal;