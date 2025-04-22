import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Analytics = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async (e) => {
        e.preventDefault(); // Prevent form reload

        if (!fromDate || !toDate) {
            alert("Please select both From and To dates!");
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}/order/date/${fromDate}/${toDate}`);
            setOrders(response.data.data);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching orders:", error);
            alert("Failed to fetch orders.");
        }
    };

    return (
        <div>
            {
                loading ? <Loader /> : <div className="container-fluid px-4">
                    <h1 className="my-4">Order Overview</h1>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <form onSubmit={fetchOrders}>
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                                <label className='mb-2'>From</label>
                                                <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                                            </div>
                                            <div className="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                                <label className='mb-2'>To</label>
                                                <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                                            </div>
                                            <button type="submit" className="btn btn-primary mt-3">View Report</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card my-5">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <table className="table">
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
                                            {orders.length > 0 ? (
                                                orders.map((order) => (
                                                    <tr key={order.id}>
                                                        <th scope="row">{order.order_id}</th>
                                                        <td>{order.name}</td>
                                                        <td>{order.phone}</td>
                                                        <td>${order.total_price}</td>
                                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                                        <td>
                                                            <Link to={`/single-order-details/${order.id}`}>
                                                                <span className="material-symbols-outlined btn btn-primary btn-sm">
                                                                    visibility
                                                                </span>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">No orders found</td>
                                                </tr>
                                            )}
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

export default Analytics;
