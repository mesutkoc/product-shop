import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import TableFooter from './TableFooter';
import AddNewProductModal from './AddNewProductModal';
import './table.scss';

function ProductsTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading, products } = useSelector((state) => state?.products);

    const columns = [{
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',

    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    }]

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="productsTable">
            {loading === true ? <h1>Loading...</h1> :
                <div className='table'>
                    <div className='addNewItem'>
                        <Button type="primary" onClick={showModal}>
                            Add New Product
                        </Button>
                    </div>
                    <div className='dashboardTable'>
                        <AddNewProductModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></AddNewProductModal>
                        <Table dataSource={products?.products} columns={columns} onRow={(record, rowIndex) => {
                            return {
                                onClick: () => console.log(record)
                            };
                        }} />
                        <TableFooter totalResults={products?.total}></TableFooter>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductsTable;
