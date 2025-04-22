import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    // get category data
    const getData = () => {
        axios
            .get(`${BASE_URL}/order`)
            .then((response) => {
                setOrder(response.data.data);
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
    // formate date
    const formatDate = (isoDate) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short"
        }).format(new Date(isoDate));
    };
    console.log(order);

    return (
        <div>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Order</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">Add / View Order</li>
                </ol>
                <div className="card mb-5">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#Order ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.map((item, i) => {
                                                return (
                                                    <>
                                                        <tr key={i}>
                                                            <th scope="row">1</th>
                                                            <td>{item.order_id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.total_price} TK</td>
                                                            <td>2{item.updated_at} {formatDate(item.updated_at)}</td>
                                                            <td>
                                                                <Link to='/single-order-details'>
                                                                    <span class="material-symbols-outlined btn btn-primary btn-sm">
                                                                        visibility
                                                                    </span>
                                                                </Link>
                                                                <span class="material-symbols-outlined btn btn-success btn-sm ms-2">
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
        </div>
    );
};

export default OrderDetails;