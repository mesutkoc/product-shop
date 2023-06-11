import { useState, useMemo, useEffect } from 'react';
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
    const { selectedCategory } = useSelector((state) => state?.categories);
    const [productList, setProductList] = useState(products?.pro);


    const checkCategory = ({ addedProducts }) => {
        const localProducts = addedProducts?.filter(product => product?.category === selectedCategory?.value)
        if (selectedCategory?.value) {
            return [...products?.products, ...localProducts]

        } else if (!selectedCategory?.value && addedProducts?.length > 0 && products?.products?.length > 0) {
            return [...products?.products, ...addedProducts];

        }
        return products?.products;
    }

    useEffect(() => {
        const addedProducts = JSON.parse(localStorage.getItem('addedProducts'));
        const result = checkCategory({ addedProducts })
        setProductList(result)
    }, [products]);

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
                    <Table dataSource={productList} columns={columns} onRow={(record, rowIndex) => {
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
