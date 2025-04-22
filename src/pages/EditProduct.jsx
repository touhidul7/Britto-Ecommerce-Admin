import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;
    const { id } = useParams(); // Get product ID from URL

    const [getCategory, setCategory] = useState([]);
    const [getSubCategory, setSubCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        product_name: '',
        select_category: '',
        availability: '',
        regular_price: '',
        selling_price: '',
        product_description: '',
        p_short_des: '',
        product_image: null,
        image_gallary: [] // Store multiple images
    });

    // Fetch Categories
    useEffect(() => {
        axios.get(`${BASE_URL}/products/categories`)
            .then((response) => {
                setCategory(response.data[0] || []);
            })
            .catch((error) => console.log(error));
    }, []);


    // ✅ Fetch Sub categories
    useEffect(() => {
        axios.get(`${BASE_URL}/products/sub-categories`)
            .then((response) => {
                setSubCategory(response.data[0] || []);
            })
            .catch((error) => console.log(error));
    }, []);

    // ✅ Fetch existing product details
    useEffect(() => {
        axios.get(`${BASE_URL}/products/${id}`)
            .then((response) => {
                const productData = response.data[0]; // Ensure correct indexing
                setFormData({
                    ...productData,
                    product_image: null, // Reset file input
                    image_gallary: productData.image_gallary || [] // Ensure image gallery is an array
                });
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [id]);

    // ✅ Handle form input changes
    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        if (type === "file") {
            if (name === "image_gallary[]") {
                // Handle multiple file selection
                setFormData((prevData) => ({
                    ...prevData,
                    image_gallary: [...prevData.image_gallary, ...files] // Append new files
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: files[0], // Store single file
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // ✅ Update Product
    const updateProduct = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "image_gallary") {
                value.forEach((file) => data.append("image_gallary[]", file));
            } else {
                data.append(key, value);
            }
        });

        axios.post(`${BASE_URL}/product/update/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                toast.success('Product updated successfully');
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong');
                setLoading(false);
            });
    };

    return (
        <div>
            {loading ? <Loader /> : (
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Edit Product</h1>
                    <div className="card mb-5">
                        <div className="card-body">
                            <form onSubmit={updateProduct}>
                                <div className="row">
                                    <div className="col-lg-3 col-sm-12 col-md-4 mt-3 form-group">
                                        <label className="mb-2">Product Name</label>
                                        <input
                                            name="product_name"
                                            value={formData.product_name || ""}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-lg-3 col-sm-12 col-md-4 mt-3 form-group">
                                        <label className="mb-2">Product Category</label>
                                        <select
                                            name="select_category"
                                            value={formData.select_category || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Select Category</option>
                                            {getCategory.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-lg-3 col-sm-12 col-md-4 mt-3 form-group">
                                        <label className='mb-2'>Product Sub Category</label>
                                        <select
                                            value={formData.select_sub_category || ""}
                                            name="select_sub_category" onChange={handleChange} class="form-control">
                                            <option value="">Select Sub Category</option>
                                            {
                                                getSubCategory?.map((item) => {
                                                    return (
                                                        <option value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-lg-3 col-sm-12 col-md-4 mt-3 form-group">
                                        <label className="mb-2">Product Availability</label>
                                        <select
                                            name="availability"
                                            value={formData.availability || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Select Availability</option>
                                            <option value="In Stock">In Stock</option>
                                            <option value="Out of Stock">Out of Stock</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                        <label className="mb-2">Regular Price</label>
                                        <input
                                            name="regular_price"
                                            value={formData.regular_price || ""}
                                            onChange={handleChange}
                                            type="number"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                        <label className="mb-2">Selling Price</label>
                                        <input
                                            name="selling_price"
                                            value={formData.selling_price || ""}
                                            onChange={handleChange}
                                            type="number"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                        <label className="mb-2">Product Description</label>
                                        <textarea
                                            name="product_description"
                                            value={formData.product_description || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        ></textarea>
                                    </div>
                                    <div class="col-lg-4 col-sm-12 col-md-12 mt-3 form-group">
                                        <label className='mb-2'>Select Color *(Add Color With Comma)*</label>
                                        <input  value={formData.color || ""} name='color' type="text" onChange={handleChange} class="form-control" />
                                    </div>
                                    <div class="col-lg-4 col-sm-12 col-md-12 mt-3 form-group">
                                        <label className='mb-2'>Select Size *(Add Size With Comma)*</label>
                                        <input  value={formData.size || ""} name='size' type="text" onChange={handleChange} class="form-control" />
                                    </div>
                                    <div class="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                        <label className='mb-2'>Product Type</label>
                                        <select   value={formData.type || ""} name="type" onChange={handleChange} class="form-control">
                                            <option value="">Select Type</option>
                                            <option value="Popular Products">Popular Products</option>
                                            <option value="New Arrival">New Arrival</option>
                                            <option value="Tranding Product">Tranding Product</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                        <label className="mb-2">Product Image</label>
                                        <input
                                            name="product_image"
                                            type="file"
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                        <label className='mb-2'>Product Short Description</label>
                                        <textarea
                                            name="p_short_des"
                                            value={formData.p_short_des || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        ></textarea>
                                    </div>
                                    <div className="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                        <label className='mb-2'>Image Gallery</label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {formData.image_gallary.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={`${IMAGE_URL}/admin/product/gallery/${image}`}
                                                    alt="Gallery"
                                                    className="img-thumbnail"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                />
                                            ))}
                                        </div>
                                        <input
                                            name="image_gallary[]"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="form-control mt-2"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
