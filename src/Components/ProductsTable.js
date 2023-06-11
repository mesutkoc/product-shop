import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableFooter from './TableFooter';
import AddNewProductModal from './AddNewProductModal';
import { getPageCount } from '../Helper';
import './table.scss';

function ProductsTable() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { products } = useSelector((state) => state?.products);

    const pageCount = useMemo(
        () => getPageCount(products?.total),
        [products?.total]
    );

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

    const navigateDetail = (record) => {
        console.log(record);
        navigate(`/productdetail/${record?.id}`)
    }

    return (
        <div className="productsTable">
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
                            onClick: () => navigateDetail(record)
                        };
                    }} />
                    <TableFooter totalResults={products?.total} pageCount={pageCount} data={products?.products}></TableFooter>
                </div>
            </div>
        </div>
    );
}

export default ProductsTable;
