import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableFooter from './TableFooter';
import AddNewProductModal from './AddNewProductModal';
import { getPageCount } from '../Helper';
import './table.scss';
import { deleteProduct } from '../Redux/productSlice';

function ProductsTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { products } = useSelector((state) => state?.products);

    const pageCount = useMemo(
        () => getPageCount(products?.total),
        [products?.total]
    );

    const deleteProductClick = (record) => {
        console.log(record);
        dispatch(deleteProduct(record))
    }
    const columns = [{
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',

    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <a onClick={() => navigateDetail(record)}>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Delete Item',
        dataIndex: '',
        key: 'x',
        render: (record) => <a onClick={() => deleteProductClick(record)}>Delete</a>,
    },]

    const showModal = () => {
        setIsModalOpen(true);
    };

    const navigateDetail = (record) => {
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
                    <Table dataSource={products?.products} columns={columns} />
                    <TableFooter totalResults={products?.total} pageCount={pageCount} data={products?.products}></TableFooter>
                </div>
            </div>
        </div>
    );
}

export default ProductsTable;
