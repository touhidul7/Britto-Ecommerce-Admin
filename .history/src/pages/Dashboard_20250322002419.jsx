import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    // get total order
    const [totalOrder,setTotalOrder] = useState(0);
    // total order amount
    const [totalOrderAmount,setTotalOrderAmount] = useState(0);
    // total product
    const [totalProduct,setTotalProduct] = useState(0);


    const getData = () => {
        axios
            .get(`${BASE_URL}/order`)
            .then((response) => {
                setOrder(response.data.data);
                setLoading(false);
                // get total order
                const totalOrder = response.data.data.length;
                setTotalOrder(totalOrder);
                // get total order amount
                //  make in integer

                const totalOrderAmount = response.data.data.reduce((acc, item) => acc + parseInt(item.total_price), 0);
                setTotalOrderAmount(totalOrderAmount);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // total product
    const getProduct = () => {
        axios
            .get(`${BASE_URL}/products`)
            .then((response) => {
                // setGetProduct(response.data[0]);
                setLoading(false)
                // get total product
                const totalProduct = response.data[0].length;
                setTotalProduct(totalProduct);
            })
            .catch((error) => {
                console.log(error);
            });
    }
     // get category data
     const getCategory = () => {
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

    useEffect(() => {
        getData();
        getProduct()
    }, []);
    return (
        <div>
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Dashboard</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div class="row">
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-primary text-white mb-4">
                                <div class="card-body">Total Order</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <p class="small text-white stretched-link">{totalOrder}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-success text-white mb-4">
                                <div class="card-body">Total Order Amount</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <p class="small text-white stretched-link">{totalOrderAmount} TAKA</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-danger text-white mb-4">
                                <div class="card-body">Danger Card</div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <p class="small text-white stretched-link">{totalProduct}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-chart-area me-1"></i>
                                    Area Chart Example
                                </div>
                                <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-chart-bar me-1"></i>
                                    Bar Chart Example
                                </div>
                                <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;