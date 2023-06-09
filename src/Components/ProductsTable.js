import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import { Table } from 'antd';
import { getPageCount } from '../Helper';
import TableFooter from './TableFooter';

function ProductsTable() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.products);
    console.log(data);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

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

    return (
        <div className="App">
            <Table dataSource={data?.products?.products} columns={columns} pagination={false} />
            <TableFooter totalResults={data?.products?.total} pageCount={pageCount} data={data}></TableFooter>
        </div>
    );
}

export default ProductsTable;
