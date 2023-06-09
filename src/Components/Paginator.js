import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getProductsByPage } from "../Redux/productSlice";

function Paginator({ pageCount }) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);


    const changePage = (page) => {
        setCurrentPage(page)
        dispatch(getProductsByPage(page));
    }

    return (
        <div className="paginator">
            {pageCount?.map(page => <span className={`paginatorItem ${currentPage === page ? "active" : ""}`} key={page} onClick={() => changePage(page)}>{page}</span>)}
        </div>);
}

export default Paginator;