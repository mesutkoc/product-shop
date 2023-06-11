import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../Redux/productSlice";
import { Carousel, Image, Table } from 'antd';
import _ from 'lodash';


function ProductDetail() {
    const { i } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.products)
    const { Column } = Table;

    useEffect(() => {
        dispatch(getProductById(i));
        console.log('asd');
    }, []);
    console.log(product);

    return <div className="detailPage">
        {product?.thumbnail && < div className="detailImage"><img className="image" src={product?.thumbnail} alt="moviePoster"></img></div>}
        <Table dataSource={[product]}>
            {_.times(Object.keys(product).length, (i) => (
                <Column title={Object.keys(product)[i]} dataIndex={Object.keys(product)[i]} key={Object.keys(product)[i]} />
            ))}
        </Table>
    </div>;
}

export default ProductDetail;
