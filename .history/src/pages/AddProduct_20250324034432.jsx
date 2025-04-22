import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';


const AddProduct = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [getCategory, setCategory] = useState([]);
    const [getSubCategory, setSubCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    // get category data
    const getData = () => {
        axios
            .get(`${BASE_URL}/products/categories`)
            .then((response) => {
                setCategory(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // get category data
    const getSubData = () => {
        axios
            .get(`${BASE_URL}/products/sub-categories`)
            .then((response) => {
                setSubCategory(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // call the function
    useEffect(() => {
        getData()
        getSubData()
    }, [])
    // add product
    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value, // Store file object instead of text
        }));
    };

    console.log(getSubCategory);
    

    const submit = (e) => {
        e.preventDefault()
       
        const data = new FormData(); // Create FormData object
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        axios
            .post(`${BASE_URL}/product/add`,  data )
            .then(function () {
                getData()
                setLoading(false)
                toast.success('Added Successfully');
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Something Went Wrong');
            }
            );
    }
    return (
        <div>
            {
                loading ? <Loader /> : <div class="container-fluid px-4">
                    <h1 class="mt-4">Product</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Add / View Product</li>
                    </ol>
                    <div className="card mb-5">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <form onSubmit={submit}>
                                        <div className="row">
                                            <div class="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                                <label className='mb-2'>Product Name</label>
                                                <input name='product_name' onChange={handleChange} type="text" class="form-control" placeholder='Ex : Shampoo' />
                                            </div>
                                            <div class="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                                <label className='mb-2'>Product Category</label>
                                                <select name="select_category" onChange={handleChange} class="form-control">
                                                    <option value="">Select Category</option>
                                                    {
                                                        getCategory[0].map((item) => {
                                                            return (
                                                                <option value={item.name}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div class="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                                <label className='mb-2'>Product Availability</label>
                                                <select name="availability" onChange={handleChange}  class="form-control">
                                                    <option value="">Select Availability</option>
                                                    <option value="In Stock">In Stock</option>
                                                    <option value="Out of Stock">Out of Stock</option>
                                                </select>
                                            </div>
                                            <div class="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                                <label className='mb-2'>Regular Price</label>
                                                <input name='regular_price' onChange={handleChange}  type="number" class="form-control" placeholder='Ex : 100' />
                                            </div>
                                            <div class="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                                <label className='mb-2'>Selling Price</label>
                                                <input name='selling_price' type="number" onChange={handleChange}  class="form-control" placeholder='Ex : 80' />
                                            </div>
                                            <div class="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                                <label className='mb-2'>Product Description</label>
                                                <textarea name="product_description" onChange={handleChange}  class="form-control"></textarea>
                                            </div>
                                            <div class="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                                <label className='mb-2'>Product Image</label>
                                                <input name='product_image' type="file" onChange={handleChange}  class="form-control" />
                                            </div>
                                            <div class="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                                <label className='mb-2'>Product Short Description</label>
                                                <textarea name="product_short_description" onChange={handleChange}  class="form-control"></textarea>
                                            </div>
                                            <button type="submit" class="btn btn-primary mt-3">Add Product</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default AddProduct;