import React from 'react';
import { Link } from 'react-router-dom';

const Analytics = () => {
    return (
        <div>
            <div class="container-fluid px-4">
                <h1 class="my-4">Order Overview</h1>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <form action="">
                                    <div className="row">
                                        <div class="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                            <label className='mb-2'>From</label>
                                            <input type="date" class="form-control" />
                                        </div>
                                        <div class="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                            <label className='mb-2'>To</label>
                                            <input type="date" class="form-control" />
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-3">View Report</button>
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
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Jahin</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>22/1/2025</td>
                                            <td>
                                                <Link to='/single-order-details'>
                                                    <span class="material-symbols-outlined btn btn-primary btn-sm">
                                                        visibility
                                                    </span>
                                                </Link>
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

export default Analytics;