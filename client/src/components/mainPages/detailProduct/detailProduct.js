import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { GlobalState } from "../../../globalState";
import ProductItem from '../utils/productItem/productItem';

export default function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if (params) {
            products.forEach((product) => {
                if (product._id === params.id) {
                    setDetailProduct(product);
                }
            });
        }
    }, [params, products]);

    if (detailProduct.length === 0) return null;
    return (
        <>
            <div className="detail">
                <div className="detail-img">
                    <img src={detailProduct.images.url} alt="" />
                </div>

                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>

                    <span>$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart">
                        Buy Now
                    </Link>
                </div>
            </div>
            <div className="relate-product">
                <h2>Related products</h2>
                <div className="products">
                        {
                            products.map(product => {
                                return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null
                            })
                        }
                </div>
            </div>
        </>
    );
}
