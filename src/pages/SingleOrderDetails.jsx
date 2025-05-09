import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

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
        const orderData = response.data.data.find(
          (item) => item.id === parseInt(id)
        );
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
      {loading ? (
        <Loader />
      ) : (
        <div class="container-fluid px-4">
          <h1 class="mt-4">{order.name} - Order Details</h1>
          <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">
              Order ID: <b className="text-danger"> {order.order_id}</b>
            </li>
            <li class="breadcrumb-item active">
              Total Price: <b className="text-danger"> {order.total_price}</b>
            </li>
          </ol>

          <div className="card mb-5">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <table class="table">
                    {/*                     <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead> */}
                    <tbody>
                      <tr>
                        <th scope="col">Name</th>
                        <td>:</td>
                        <td>{order.name}</td>
                      </tr>
                      <tr>
                        <th scope="col">Phone</th>
                        <td>:</td>
                        <td>{order.phone}</td>
                      </tr>
                      <tr>
                        <th scope="col">Address</th>
                        <td>:</td>
                        <td>{order.address}</td>
                      </tr>
                      <tr>
                        <th scope="col">Email</th>
                        <td>:</td>
                        <td>{order.email}</td>
                      </tr>
                      <tr>
                        <th scope="col">Status</th>
                        <td>:</td>
                        <td>{order.status === 1 ? "Deliverd" : "Pending"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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
                        <th scope="col">Color</th>
                        <th scope="col">Quantity</th>
                        {/*  <th scope="col">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {order.cart?.map((item, i) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{item.product_name}</td>
                              <td>{item.select_category}</td>
                              <td>{item.selling_price} TK</td>
                              <td><div className="p-2 w-2" style={{ backgroundColor: item.selectedColor, height:"30px ", width:"30px", borderRadius:"5px"}}></div> </td>
                              <td>{item.quantity}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleOrderDetails;
