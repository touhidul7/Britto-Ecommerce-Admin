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
                //setOrder(response.data.data);
                // find the order by id
                const orderData = response.data.data.find((item) => item.id === parseInt(id));
                setOrder(orderData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(order);

    return (
        <div>
            <div class="container-fluid px-4">
                <h1 class="mt-4">{order.name} - Order Details</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">Order ID: <b className='text-danger'> {order.order_id}</b></li>
                </ol>
                <div className="card mb-5">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL NO</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            {/*  <th scope="col">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.cart.map((item, i) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <th scope="row">{i + 1}</th>
                                                            <td>{item.product_name}</td>
                                                            <td>{item.select_category}</td>
                                                            <td>{item.selling_price} TK</td>
                                                            <td>{item.quantity}</td>
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

export default SingleOrderDetails;