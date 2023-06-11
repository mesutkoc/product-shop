import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { getPageCount } from '../Helper';
import TableFooter from './TableFooter';
import AddNewProductModal from './AddNewProductModal';
import './table.scss';

function ProductsTable() {  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const data = useSelector((state) => state?.products);

    const pageCount = useMemo(
        () => getPageCount(data?.products?.total),
        [data?.products?.total]
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

    return (
        <div className="productsTable">
            {data?.loading === true ? <h1>Loading...</h1> :
                <div className='table'>
                    <div className='addNewItem'>
                        <Button type="primary" onClick={showModal}>
                            Add New Product
                        </Button>
                    </div>
                    <div className='dashboardTable'>
                        <AddNewProductModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></AddNewProductModal>
                        <Table dataSource={data?.products?.products} columns={columns} pagination={false} onRow={(record, rowIndex) => {
                            return {
                                onClick: () => console.log(record)
                            };
                        }} />
                        <TableFooter totalResults={data?.products?.total} pageCount={pageCount} data={data}></TableFooter>
                    </div>

                </div>
            }
        </div>
    );
}

export default ProductsTable;
