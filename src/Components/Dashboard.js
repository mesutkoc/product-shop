import ProductsTable from './ProductsTable';
import VerticalFilter from './VerticalFilter';

function Dashboard() {

    return <div className='dashboard'>
        <VerticalFilter></VerticalFilter>
        <ProductsTable></ProductsTable>
    </div>;
}

export default Dashboard;
