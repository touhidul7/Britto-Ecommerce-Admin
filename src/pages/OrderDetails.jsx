import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const OrderDetails = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        searchTerm: "",
        fromDate: "",
        toDate: "",
        status: "all"
    });
    const ordersPerPage = 5;

    const getData = () => {
        axios
            .get(`${BASE_URL}/order`)
            .then((response) => {
                setOrders(response.data.data);
                setFilteredOrders(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed to fetch orders');
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const formatDate = (isoDate) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(isoDate));
    };

    const applyFilters = () => {
        let results = [...orders];

        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            results = results.filter(order => 
                order.order_id.toLowerCase().includes(term) ||
                order.name.toLowerCase().includes(term) ||
                order.phone.includes(filters.searchTerm) ||
                order.total_price.toString().includes(filters.searchTerm)
            );
        }

        if (filters.fromDate) {
            const fromDate = new Date(filters.fromDate);
            results = results.filter(order => new Date(order.updated_at) >= fromDate);
        }

        if (filters.toDate) {
            const toDate = new Date(filters.toDate);
            toDate.setHours(23, 59, 59, 999);
            results = results.filter(order => new Date(order.updated_at) <= toDate);
        }

        if (filters.status !== "all") {
            results = results.filter(order => order.status.toString() === filters.status);
        }

        setFilteredOrders(results);
        setCurrentPage(1);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        
        if (name !== "fromDate" && name !== "toDate") {
            applyFilters();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const resetFilters = () => {
        setFilters({
            searchTerm: "",
            fromDate: "",
            toDate: "",
            status: "all"
        });
        setFilteredOrders(orders);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const orderConfirm = (id) => {
        axios.post(`${BASE_URL}/order/confirm/${id}`)
            .then(() => {
                getData();
                toast.success('Order Confirmed Successfully');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something Went Wrong');
            });
    };

    const deleteOrder = (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            axios.delete(`${BASE_URL}/order/delete/${id}`)
                .then(() => {
                    getData();
                    toast.success('Order Deleted Successfully');
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Something Went Wrong');
                });
        }
    };

    return (
        <div>
            {loading ? <Loader /> : (
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Orders</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">View Order</li>
                    </ol>
                    
                    {/* Filter Card */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Search Input */}
                                    <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                                        <label className="mb-2">Search Orders</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="searchTerm"
                                            value={filters.searchTerm}
                                            onChange={handleFilterChange}
                                            placeholder="ID, Name, Phone or Price"
                                        />
                                    </div>
                                    
                                    {/* Date Range */}
                                    <div className="col-lg-2 col-md-6 col-sm-6 mt-2">
                                        <label className="mb-2">From Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="fromDate"
                                            value={filters.fromDate}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-6 col-sm-6 mt-2">
                                        <label className="mb-2">To Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="toDate"
                                            value={filters.toDate}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                    
                                    {/* Status Filter */}
                                    <div className="col-lg-2 col-md-6 col-sm-6 mt-2">
                                        <label className="mb-2">Status</label>
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={filters.status}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="all">All Status</option>
                                            <option value="0">Pending</option>
                                            <option value="1">Confirmed</option>
                                        </select>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="col-lg-2 col-md-6 col-sm-6 mt-2 d-flex align-items-end">
                                        <button type="submit" className="btn btn-primary me-2">
                                            Filter
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={resetFilters}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div>
                        Total Orders : {orders.length}
                    </div>
                    
                    {/* Orders Table */}
                    <div className="card mb-5">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#Order ID</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.length > 0 ? (
                                        currentOrders.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.order_id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.total_price} TK</td>
                                                <td>{formatDate(item.updated_at)}</td>
                                                <td>
                                                    {item.status === 0 ? 
                                                        <span className='bg-danger text-white p-1 rounded'>Pending</span> : 
                                                        <span className='bg-success text-white p-1 rounded'>Confirmed</span>
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/single-order-details/${item.id}`}>
                                                        <span className="material-symbols-outlined btn btn-primary btn-sm">visibility</span>
                                                    </Link>
                                                    {item.status == 0 ? 
                                                        <span
                                                            onClick={() => orderConfirm(item.id)}
                                                            className="material-symbols-outlined btn btn-success btn-sm ms-2"
                                                        >
                                                            check
                                                        </span> :
                                                        <span className='bg-info text-white p-1 ms-2 rounded'>Done</span>
                                                    }
                                                    <span
                                                        onClick={() => deleteOrder(item.id)}
                                                        className="material-symbols-outlined btn btn-danger btn-sm ms-2"
                                                    >
                                                        delete
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">No orders found matching your criteria</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            
                            {/* Pagination */}
                            {filteredOrders.length > 0 && (
                                <nav>
                                    <ul className="pagination">
                                        {Array.from({ 
                                            length: Math.ceil(filteredOrders.length / ordersPerPage) 
                                        }, (_, i) => (
                                            <li 
                                                key={i} 
                                                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                            >
                                                <button 
                                                    onClick={() => paginate(i + 1)} 
                                                    className="page-link"
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;