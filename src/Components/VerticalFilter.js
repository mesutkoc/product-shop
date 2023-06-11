import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Menu } from 'antd';
import { setCategory } from "../Redux/categorySlice";
import { selectCategoryIfExist } from "../Redux/productSlice";

function VerticalFilter() {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(null);

    const { categories, selectedCategory } = useSelector((state) => state?.categories);

    const onClick = (e) => {
        const category = categories.find(item => item?.key === parseInt(e?.key));
        setCurrent(e?.key)
        dispatch(setCategory(category));
        dispatch(selectCategoryIfExist(category))
    };

    const onDeselect = () => {
        setCurrent(null)
        dispatch(setCategory(''));
        dispatch(selectCategoryIfExist(''))
    }

    return <div className="verticalFilter">
        <Menu
            selectedKeys={[current]}
            mode="inline"
            items={categories}
            onSelect={onClick}
            onDeselect={onDeselect}
        />
    </div>;
}

export default VerticalFilter;
