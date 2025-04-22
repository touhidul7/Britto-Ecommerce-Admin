import React from 'react';


const AddProduct = () => {

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
                                <form action="">
                                    <div className="row">
                                        <div class="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                            <label className='mb-2'>Product Name</label>
                                            <input name='product_name' type="text" class="form-control" placeholder='Ex : Shampoo' />
                                        </div>
                                        <div class="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                            <label className='mb-2'>Product Category</label>
                                            <select name="select_category" class="form-control">
                                                <option value="">Select Category</option>
                                                <option value="Alu">Blu</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-4 col-sm-12 col-md-4 mt-3 form-group">
                                            <label className='mb-2'>Product Availability</label>
                                            <select name="availability" class="form-control">
                                                <option value="">Select Availability</option>
                                                <option value="Alu">In Stock</option>
                                                <option value="Alu">Out of Stock</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                            <label className='mb-2'>Regular Price</label>
                                            <input name='regular_price' type="number" class="form-control" placeholder='Ex : 100' />
                                        </div>
                                        <div class="col-lg-6 col-sm-12 col-md-6 mt-3 form-group">
                                            <label className='mb-2'>Selling Price</label>
                                            <input name='selling_price' type="number" class="form-control" placeholder='Ex : 80' />
                                        </div>
                                        <div class="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                            <label className='mb-2'>Product Description</label>
                                            <textarea name="product_description" class="form-control"></textarea>
                                        </div>
                                        <div class="col-lg-12 col-sm-12 col-md-12 mt-3 form-group">
                                            <label className='mb-2'>Product Image</label>
                                            <input name='product_image' type="file" class="form-control" />
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-3">Add Product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;