import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from "react-bootstrap";
import Loader from '../components/Loader';

const Category = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [getCategory, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState()
    const [dataId, setDataID] = useState()

    // modal data

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (name, id) => {
        setData(name)
        setDataID(id)
        setShow(true)
    };

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
    // call the function
    useEffect(() => {
        getData()
    }, [])

    // add category
    const submit = (e) => {
        e.preventDefault()
        let name = e.target[0].value;
        axios
            .post(`${BASE_URL}/category/add`, { name })
            .then(function () {
                toast.success('Added Successfully');
                getData()
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Something Went Wrong');
            });
    }
    /* Delete Data */
    const deleteData = (id) => {
        axios
            .delete(`${BASE_URL}/category/delete/${id}`)
            .then(function () {
                toast.success('Delete Successfully');
                getData()
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Something Went Wrong');
            });
    }
    // update data
    // const updateSubmit = (e) => {
    //     e.preventDefault()
    //     axios
    //         .put(`${BASE_URL}/category/update/${dataId}`, { data })
    //         .then(function () {
    //             toast.success('Update Successfully');
    //             getData()
    //             setLoading(false)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             toast.error('Something Went Wrong');
    //         });
    // }

    const updateSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        axios
            .put(`${BASE_URL}/category/update/${dataId}`, { name: data }) // Send 'name' instead of 'data'
            .then(() => {
                toast.success('Update Successfully');
                getData();  // Refresh category list
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response?.data);
                toast.error(error.response?.data?.message || 'Something Went Wrong');
                setLoading(false);
            });
    };
    
    // get date
    const formatDate = (isoDate) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(isoDate));
    };
    return (
        <div>
            {
                loading ?
                    <Loader /> :
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Category</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Add / View Category</li>
                        </ol>
                        <div className="card mb-5">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <form onSubmit={submit}>
                                            <div class="form-group">
                                                <label className='mb-2'>Add Category</label>
                                                <input
                                                    name='name'
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Add Category" />
                                            </div>
                                            <button type="submit" class="btn btn-primary mt-3">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6>All Category</h6>
                        <div className="card">
                            <div className="card-body">
                                <table className=" table">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-4 py-2">SL No</th>
                                            <th className="px-4 py-2">Name</th>
                                            <th className="px-4 py-2">Date</th>
                                            <th className="px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCategory[0]?.map((item, i) => (
                                            <tr key={item.id} className="border-b border-gray-300">
                                                <td className="px-4 py-2">{i + 1}</td>
                                                <td className="px-4 py-2">{item.name}</td>
                                                <td className="px-4 py-2">{formatDate(item.updated_at)}</td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        onClick={() => handleShow(item.name, item.id)}
                                                        className="btn btn-success text-white px-2 py-1 rounded mr-2">Edit</button>
                                                    <button
                                                        onClick={() => deleteData(item.id)}
                                                        className="btn btn-danger ms-3 text-white px-2 py-1 rounded">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
            }
            {/*   <!-- Modal --> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card mb-5">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <form onSubmit={updateSubmit}>
                                        <div class="form-group">
                                            <label className='mb-2'>Update Category</label>
                                            <input
                                                value={data}
                                                name='name'
                                                type="text"
                                                class="form-control"
                                                placeholder="Update Category"
                                                onChange={(e) => setData(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-3">Submit</button>
                                        <button type="submit" class="btn btn-danger ms-2 mt-3" onClick={handleClose}>Close</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Category;