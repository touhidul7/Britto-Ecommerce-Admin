import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const loginHandler = (e) => {
        e.preventDefault();
        // get input
        let email = e.target[0].value;
        let pass = e.target[1].value;

        // check login info
        if (email == 'admin@gmail.com' && pass == 'admin') {
            localStorage.setItem('user', JSON.stringify({ email, pass }))
            toast.success('Login Success !')
            navigate('/')
        } else {
            toast.error('Wrong Login Info');
        }

    }
    return (
        <div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                            <div class="card-body">
                                <form onSubmit={loginHandler}>
                                    <div class="form-floating mb-3">
                                        <input
                                            name='email'
                                            class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                        <label for="inputEmail">Email address</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input
                                            name='password'
                                            class="form-control" id="inputPassword" type="password" placeholder="Password" />
                                        <label for="inputPassword">Password</label>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <button type='submit' class="btn btn-primary">Login</button>
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

export default Login;