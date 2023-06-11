import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Menu } from 'antd';
import { setCategory } from "../Redux/categorySlice";
import { getProductsByCategory } from "../Redux/productSlice";

function VerticalFilter() {
    const dispatch = useDispatch();
    const { categories, selectedCategory } = useSelector((state) => state?.categories);

    const onClick = (e) => {
        const category = categories.find(item => item?.key === parseInt(e?.key));
        dispatch(setCategory(category));
        dispatch(getProductsByCategory(category))
    };

    return <div className="verticalFilter">
        <Menu
            mode="inline"
            items={categories}
            onClick={onClick}
        />
    </div>;
}

export default VerticalFilter;
