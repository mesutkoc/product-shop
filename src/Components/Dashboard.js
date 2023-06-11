import { useSelector } from 'react-redux';
import Loading from './Loading';
import ProductsTable from './ProductsTable';
import VerticalFilter from './VerticalFilter';

function Dashboard() {
    const { loading: productLoading } = useSelector((state) => state?.products);
    const { loading: categoryLoading } = useSelector((state) => state?.categories);

    return <div className='dashboard'>
        {categoryLoading || (categoryLoading && productLoading) ? <Loading></Loading> : <>
            <VerticalFilter></VerticalFilter>
            <ProductsTable></ProductsTable>
        </>}
    </div>;
}

export default Dashboard;
