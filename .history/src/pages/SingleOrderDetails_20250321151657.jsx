import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleOrderDetails = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const getData = () => {
        axios
            .get(`${BASE_URL}/order`)
            .then((response) => {
                setOrder(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Omuk - Order Details</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">View Order</li>
                </ol>
                <div className="card mb-5">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#Order ID</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Date</th>
                                            {/*  <th scope="col">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Jahin</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>$ 100</td>
                                            <td>22/1/2025</td>
                                            {/*  <td>
                                                <span class="material-symbols-outlined btn btn-primary btn-sm">
                                                    visibility
                                                </span>
                                                <span class="material-symbols-outlined btn btn-success btn-sm ms-2">
                                                    edit
                                                </span>
                                                <span class="material-symbols-outlined btn btn-danger btn-sm ms-2">
                                                    delete
                                                </span>
                                            </td> */}
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

export default SingleOrderDetails;