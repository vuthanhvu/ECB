import React, { useContext, useState } from "react";

import axios from "axios";

import { GlobalState } from "../../../globalState";
import ProductItem from "../utils/productItem/productItem";
import Loading from "../utils/loading/loading";

export default function Products() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productsAPI.callback;
    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck]= useState(false);

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true);
            const destroyImg = axios.post(
                "/api/destroy",
                { public_id: public_id },
                {
                    headers: { Authorization: token },
                }
            );
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token },
            });

            await destroyImg;
            await deleteProduct;
            setCallback(!callback);
            setLoading(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const handleCheck = (id) => {
        products.forEach((product) => {
            if (product._id === id) product.checked = !product.checked;
        });

        setProducts([...products]);
    };

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck;
        })
        setProducts([...products]);
        setIsCheck(!isCheck)
    };

    const deleteAll = () => {
        products.forEach(product => {
            if(product.checked){
                deleteProduct(product._id, product.images.public_id);
            }
        })
    }

    if(loading) return <div><Loading /></div> 
    return (
        <>
            {
                isAdmin &&
                <div className="delete_all">
                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll}/>
                    <button onClick={deleteAll}>Delete all</button>
                </div>
            }
            <div className="products">
                {products.map((product) => {
                    return (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                            deleteProduct={deleteProduct}
                            handleCheck={handleCheck}
                            loading={loading}
                        />
                    );
                })}
            </div>
            {products.length === 0 && <Loading />}
        </>
    );
}
