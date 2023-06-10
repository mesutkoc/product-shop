import React from "react";
import { Button, Modal, Form, Input } from 'antd';
import PROJECT_CONSTANTS from "../constants";

function AddNewProductModal({ setIsModalOpen, isModalOpen }) {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return <div><Modal
        title="Basic Modal"
        open={isModalOpen}
        okButtonProps={{
            style: {
                display: "none"
            }
        }}
        cancelButtonProps={{
            style: {
                display: "none"
            }
        }}
        onCancel={handleCancel}
    >
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            {
                PROJECT_CONSTANTS.FORM_FIELDS.map((field, index) =>
                    <Form.Item
                        label={field.label}
                        name={field.name}
                        rules={[{ required: true, message: `Please input ${field.label}!` }]}
                        key={index}
                    >
                        <Input />
                    </Form.Item>)
            }
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={() => handleOk()}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </Modal></div>;
}

export default AddNewProductModal;
