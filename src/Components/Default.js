import React from "react";

function Default() {
    return <div><Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please input category!" }]}
    >
        <Input />
    </Form.Item>

        <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price!" }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Discount Percentage"
            name="discountPercentage"
            rules={[
                { required: true, message: "Please input discount percentage!" }
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please input rating!" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please input stock!" }]}
        >
            <Input />
        </Form.Item></div>;
}

export default Default;
