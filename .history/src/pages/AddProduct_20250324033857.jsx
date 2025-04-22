import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const AddProduct = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch subcategories
    const fetchSubCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products/sub-categories`);
            setSubCategories(response.data);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    // Load data when component mounts
    useEffect(() => {
        Promise.all([fetchCategories(), fetchSubCategories()])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, []);

    // Handle category selection and filter subcategories
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFormData((prevData) => ({ ...prevData, select_category: selectedCategory }));

        // Filter subcategories based on the selected category
        const filteredSubs = subCategories.filter((sub) => sub.category === selectedCategory);
        setFilteredSubCategories(filteredSubs);
    };

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        setFormData((prevData) => {
            if (type === "file") {
                if (name === "image_gallary[]") {
                    return { ...prevData, [name]: files }; // Store multiple files
                }
                return { ...prevData, [name]: files[0] }; // Store single file
            }
            return { ...prevData, [name]: value };
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === "image_gallary[]") {
                for (let i = 0; i < value.length; i++) {
                    data.append(key, value[i]); // Append multiple images
                }
            } else {
                data.append(key, value);
            }
        });

        try {
            await axios.post(`${BASE_URL}/product/add`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Product Added Successfully");
            fetchCategories(); // Refresh categories after submission
        } catch (error) {
            console.error(error);
            toast.error("Something Went Wrong");
        }
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Product</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Add / View Product</li>
                    </ol>
                    <div className="card mb-5">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Product Name */}
                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-3 form-group">
                                        <label className="mb-2">Product Name</label>
                                        <input
                                            name="product_name"
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ex: Shampoo"
                                        />
                                    </div>

                                    {/* Product Category */}
                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-3 form-group">
                                        <label className="mb-2">Product Category</label>
                                        <select name="select_category" onChange={handleCategoryChange} className="form-control">
                                            <option value="">Select Category</option>
                                            {categories?.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Product Sub Category (Dynamically Updated) */}
                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-3 form-group">
                                        <label className="mb-2">Product Sub Category</label>
                                        <select name="sub_category" onChange={handleChange} className="form-control">
                                            <option value="">Select Sub Category</option>
                                            {filteredSubCategories.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Availability */}
                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-3 form-group">
                                        <label className="mb-2">Product Availability</label>
                                        <select name="availability" onChange={handleChange} className="form-control">
                                            <option value="">Select Availability</option>
                                            <option value="In Stock">In Stock</option>
                                            <option value="Out of Stock">Out of Stock</option>
                                        </select>
                                    </div>

                                    {/* Prices */}
                                    <div className="col-lg-6 col-md-6 col-sm-12 mt-3 form-group">
                                        <label className="mb-2">Regular Price</label>
                                        <input name="regular_price" onChange={handleChange} type="number" className="form-control" placeholder="Ex: 100" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 mt-3 form-group">
                                        <label className="mb-2">Selling Price</label>
                                        <input name="selling_price" onChange={handleChange} type="number" className="form-control" placeholder="Ex: 80" />
                                    </div>

                                    {/* Description */}
                                    <div className="col-lg-12 mt-3 form-group">
                                        <label className="mb-2">Product Description</label>
                                        <textarea name="product_description" onChange={handleChange} className="form-control"></textarea>
                                    </div>

                                    {/* Image Uploads */}
                                    <div className="col-lg-12 mt-3 form-group">
                                        <label className="mb-2">Product Image</label>
                                        <input name="product_image" type="file" onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="col-lg-12 mt-3 form-group">
                                        <label className="mb-2">Product Gallery Images</label>
                                        <input name="image_gallary[]" multiple accept="image/*" type="file" onChange={handleChange} className="form-control" />
                                    </div>

                                    {/* Short Description */}
                                    <div className="col-lg-12 mt-3 form-group">
                                        <label className="mb-2">Product Short Description</label>
                                        <textarea name="product_short_description" onChange={handleChange} className="form-control"></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary mt-3">Add Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
