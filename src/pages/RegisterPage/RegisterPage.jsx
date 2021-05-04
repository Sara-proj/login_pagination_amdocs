import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';
import './registerPage.scss';
import PasswordStrengthBar from 'react-password-strength-bar';

const MIN_STRENGTH = 2;
function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const [validation, setValidation] = useState({
        password: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();
    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && validation.password) {
            dispatch(userActions.register(user));
        }
    }
    function validatePassword(score) {
        setValidation({ password: score >= MIN_STRENGTH });
    }
    return (
        <div className="col-md-8 offset-md-2">
            <div className="register-page row align-items-center">
                <div className="col-lg-8 offset-lg-2 paper">
                    <h1 className="red padding">Create account</h1>
                    <form name="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <div className="input-group mb-3">
                                <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="bi bi-chevron-compact-down"></i>
                                    </span>
                                </div>
                            </div>
                            {submitted && !user.firstName &&
                                <div className="seen invalid-feedback">First Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <div className="input-group mb-3">
                                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="bi bi-chevron-double-down"></i>
                                    </span>
                                </div>
                            </div>
                            {submitted && !user.lastName &&
                                <div className="seen invalid-feedback">Last Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <div className="input-group mb-3">
                                <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="bi bi-person-circle" />
                                    </span>
                                </div>
                            </div>
                            {submitted && !user.username &&
                                <div className="seen invalid-feedback">Username is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <span className="d-block form-hint">You are required to use a sufficiently strong password. Password must be more than 7 characters.</span>
                            <div className="input-group mb-3">
                                <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                </div>
                            </div>
                            {submitted && !validation.password &&
                                <div className="seen invalid-feedback">Password is too weak</div>
                            }
                            {user.password !== '' && <PasswordStrengthBar password={user.password} className="bar" minLength={7} onChangeScore={validatePassword} />}
                        </div>
                        <div className="form-group float-right" >
                            <button className="btn btn-outline-dark btn-lg">
                                {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Create
                    </button>
                            <Link to="/login" className="red btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { RegisterPage };