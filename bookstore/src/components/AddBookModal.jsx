import React from 'react';
import {Modal, Button, Form, Input, Upload, notification} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddBookModal = ({ isVisible, onOk, onCancel, handleImageChange, tempImage, showModal }) => {
    const [form] = Form.useForm();

    const validatePrice = (rule, value) => {
        const regex = /^(?!0(\.0{1,2})?$)(\d+(\.\d{1,2})?)$/;
        if (!regex.test(value)) {
            return Promise.reject('价钱必须是正数且小数不超过两位');
        }
        return Promise.resolve();
    };

    const validateStock = (rule, value) => {
        const regex = /^[1-9]\d*$/;
        if (!regex.test(value)) {
            return Promise.reject('库存必须是正整数');
        }
        return Promise.resolve();
    }


    const handleCheck = async () => {
        try {
            await form.validateFields();
            onOk(form);
        } catch (error) {
            notification.error({
                message: '失败',
                description: '请检查并正确填写所有必填项。',
            });
        }
    };

    return (
        <Modal
            title="Add Book"
            visible={isVisible}
            onOk={() => onOk(form)}
            onCancel={onCancel}
            footer={[
                <Button key="back" type="default" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="default" onClick={handleCheck}>
                    Save
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="书籍名称" rules={[{ required: true, message: '请输入书籍名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="author" label="作者" rules={[{ required: true, message: '请输入作者名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="publisher" label="出版社" rules={[{ required: true, message: '请输入出版社名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="isbn" label="ISBN 编号" rules={[{ required: true, message: '请输入ISBN编号' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="stock" label="库存" rules={[{ required: true, message: '请输入库存数量' },{validator:validateStock}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="价钱" rules={[{ required: true, message: '请输入价钱' },{validator:validatePrice}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="introduction" label="介绍">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="cover_image" label="书籍封面">
                    <div className="flex flex-row justify-center items-center mb-3">
                        {tempImage && (
                            <img
                                src={tempImage}
                                alt="cover_image"
                                style={{ width: '50px', height: '50px', cursor: 'pointer', marginRight: '100px' }}
                                onClick={() => showModal(tempImage)}
                            />
                        )}
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                            accept=".jpg,.jpeg,.png"
                        >
                            <Button icon={<PlusOutlined />}>Upload</Button>
                        </Upload>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddBookModal;
