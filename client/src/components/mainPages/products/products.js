import React, { useContext } from "react";

import { GlobalState } from "../../../globalState";
import ProductItem from "../utils/productItem/productItem";
import Loading from "../utils/loading/loading";

export default function Products() {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <>
            <div className="products">
                {products.map((product) => {
                    return (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                        />
                    );
                })}
            </div>
            {products.length === 0 && <Loading />}
        </>
    );
}
