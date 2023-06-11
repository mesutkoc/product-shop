import { Button, Modal, Form, Input, Select } from 'antd';
import PROJECT_CONSTANTS from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from '../Redux/productSlice';

function AddNewProductModal({ setIsModalOpen, isModalOpen }) {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories)
    const { products } = useSelector(state => state.products)
    const [form] = Form.useForm();

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        dispatch(addProduct(values, products))
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        form.resetFields();
    };

    return <div>
        <Modal
            title="Add New Product"
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
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item name="category" label="Category" rules={[{ required: true, message: `Please input category!` }]}>
                    <Select
                        placeholder="Select a category"
                        allowClear
                        options={categories}
                    >
                    </Select>
                </Form.Item>

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
