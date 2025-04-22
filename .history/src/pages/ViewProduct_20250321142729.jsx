import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const ViewProduct = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;
    const [getProduct, setGetProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    // get category data
    const getData = () => {
        axios
            .get(`${BASE_URL}/products`)
            .then((response) => {
                setGetProduct(response.data[0]);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // call the function
    useEffect(() => {
        getData()
    }, [])

    console.log(getProduct);

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
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">R. Price</th>
                                                <th scope="col">S. Price</th>
                                                <th scope="col">Availiability</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getProduct.map((item, i) => {
                                                    return (
                                                        <>
                                                            <tr key={i}>
                                                                <th scope="row">{i+1}</th>
                                                                <td><img style={{height:'25px'}} src={`${IMAGE_URL}/admin/product/${item.product_image}`} alt="" /></td>
                                                                <td>{item.product_name}</td>
                                                                <td>{item.select_category}</td>
                                                                <td>{item.regular_price}</td>
                                                                <td>{item.selling_price}</td>
                                                                <td>{item.availability}</td>
                                                                <td>
                                                                    <span class="material-symbols-outlined btn btn-success btn-sm">
                                                                        edit
                                                                    </span>
                                                                    <span class="material-symbols-outlined btn btn-danger btn-sm ms-2">
                                                                        delete
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default ViewProduct;