import React from "react";
import { useSelector } from 'react-redux';
import { Menu } from 'antd';

function VerticalFilter() {
    const data = useSelector((state) => state?.categories);
    console.log({ data });

    return <div className="verticalFilter">
        <Menu
            mode="inline"

            items={data?.categories}
        />
    </div>;
}

export default VerticalFilter;
