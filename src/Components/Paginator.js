import { useDispatch, useSelector } from 'react-redux';
import { getProductsByPage, updatePage } from "../Redux/productSlice";

function Paginator({ pageCount }) {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state?.products);

    const changePage = (page) => {
        dispatch(updatePage(page))
        dispatch(getProductsByPage(page === 1 ? 0 : (page - 1) * 10));
    }

    return (
        <div className="paginator">
            {pageCount?.map(page => <span className={`paginatorItem ${currentPage === page ? "active" : ""}`} key={page} onClick={() => changePage(page)}>{page}</span>)}
        </div>);
}

export default Paginator;