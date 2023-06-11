import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../Redux/productSlice";

function ProductDetail() {
    const { i } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getProductById(i))
    }, [dispatch, i]);
    console.log({ product });

    return <div>ProductDetail</div>;
}

export default ProductDetail;
