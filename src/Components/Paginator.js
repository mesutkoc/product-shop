import { useDispatch, useSelector } from 'react-redux';
import { productLimitForPage } from '../Helper';
import { getProductsByPage, updatePage } from "../Redux/productSlice";

function Paginator({ pageCount }) {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state?.products);

    const changePage = (page) => {
        const pages = productLimitForPage(page);
        dispatch(updatePage(page))
        dispatch(getProductsByPage(pages));
    }

    return (
        <div className="paginator">
            {pageCount?.map(page => <span className={`paginatorItem ${currentPage === page ? "active" : ""}`} key={page} onClick={() => changePage(page)}>{page}</span>)}
        </div>);
}

export default Paginator;