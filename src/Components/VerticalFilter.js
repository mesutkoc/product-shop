import { useSelector, useDispatch } from 'react-redux';
import { Menu } from 'antd';
import { setCategory } from "../Redux/categorySlice";
import { selectCategoryIfExist } from "../Redux/productSlice";

function VerticalFilter() {
    const dispatch = useDispatch();

    const { categories, selectedCategory } = useSelector((state) => state?.categories);

    const onClick = (e) => {
        const category = categories.find(item => item?.key === parseInt(e?.key));
        dispatch(setCategory(category));
        dispatch(selectCategoryIfExist(category))
    };

    const onDeselect = () => {
        dispatch(setCategory(''));
        dispatch(selectCategoryIfExist(''))
    }

    return <div className="verticalFilter">
        <h3>Categories</h3>
        <Menu
            selectedKeys={[selectedCategory?.key?.toString()]}
            mode="inline"
            items={categories}
            onSelect={onClick}
            onDeselect={onDeselect}
        />
    </div>;
}

export default VerticalFilter;
