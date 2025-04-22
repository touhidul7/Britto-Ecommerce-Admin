import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViewProduct = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [getProduct, setGetProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    // get category data
    const getData = () => {
        axios
            .get(`${BASE_URL}/products/categories`)
            .then((response) => {
                setGetProduct(response.data);
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
    return (
        <div>
            <div class="container-fluid px-4">
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
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td><img src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="" /></td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>$ 100</td>
                                            <td>
                                                <span class="material-symbols-outlined btn btn-success btn-sm">
                                                    edit
                                                </span>
                                                <span class="material-symbols-outlined btn btn-danger btn-sm ms-2">
                                                    delete
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;