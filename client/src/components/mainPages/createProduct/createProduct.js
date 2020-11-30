import React, { useState, useContext } from "react";

import { GlobalState } from "../../../globalState";

const initialState = {
    product_id: "",
    title: "",
    price: 0,
    description: "Small prince",
    content:
        "ORINN REMIX: NHẠC TRẺ REMIX 2020 MỚI NHẤT HIỆN NAY - EDM Tik Tok ORINN REMIX - Lk Nhạc Trẻ Remix 2020",
    category: ""
};

function CreateProduct() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;

    const [product, setProduct] = useState(initialState);
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);

    const styleUpload = {
        display: images ? "block" : "none"
    };

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" />
                <div id="file_img" style={styleUpload}>
                    <img src="" alt="" />
                    <span>X</span>
                </div>
            </div>

            <form>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        required
                        value={product.product_id}
                        
                    />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={product.title}
                        
                    />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        value={product.price}
                        
                    />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        required
                        value={product.description}
                        rows="5"
                        
                    />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea
                        type="text"
                        name="content"
                        id="content"
                        required
                        value={product.description}
                        rows="7"
                        
                    />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories</label>
                    <select name="category" value={product.category} >
                        <option value="">Please select a category</option>
                        {categories.map((category) => (
                            <option value={category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateProduct;
