/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import FaceIcon from '@mui/icons-material/Face';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { STATUSES } from '../../reducers/productsSlice';
import { userRegLogin } from '../../reducers/userSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import notify from '../layout/reactToast/reactToast';
import './LoginSignup.css';

function LoginSignup() {
    const dispatch = useDispatch();
    const { user, status, isAuthenticate } = useSelector((state) => state.user);

    const history = useNavigate();
    const location = useLocation();
    const loginTab = useRef(null);
    const switcherTab = useRef(null);
    const registerTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = userDetails;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('/profile.png');

    const loginSubmit = (e) => {
        e.preventDefault();
        const loginData = new FormData();
        loginData.set('email', loginEmail);
        loginData.set('password', loginPassword);
        dispatch(userRegLogin({ loginData }));
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        // const myForm = new FormData();
        // myForm.set('name', name);
        // myForm.set('email', email);
        // myForm.set('password', password);
        // myForm.set('avatar', avatar);

        const myForm = {
            name,
            email,
            avatar,
            password,
        };

        dispatch(userRegLogin({ myForm }));
    };
    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
        }
    };
    const redirect = location.search ? location.search.split('=')[1] : '/account';

    useEffect(() => {
        if (status === 'idle' && !isAuthenticate) {
            notify(user.error).error();
        }
        if (status === 'idle' && isAuthenticate) {
            history(redirect);
        }
    }, [dispatch, user, status, isAuthenticate, history, redirect]);

    const switchTabs = (e, tab) => {
        if (tab === 'login') {
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.remove('shiftToRight');

            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToLeft');
        }
        if (tab === 'register') {
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutral');

            registerTab.current.classList.add('shiftToNeutralForm');
            loginTab.current.classList.add('shiftToLeft');
        }
    };
    if (status === STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    return (
        <>
            <MetaData title="Regestration & Login" />
            <div className="LoginSignupContainer">
                <div className="LoginSignupBox">
                    <div>
                        <div className="login_signup_toggle">
                            <p onClick={(e) => switchTabs(e, 'login')}>LOGIN </p>

                            <p onClick={(e) => switchTabs(e, 'register')}>REGISTER</p>
                        </div>
                        <button type="button" ref={switcherTab} />
                    </div>
                    <form action="" className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forgot Password </Link>
                        <input type="submit" defaultValue="Login" className="loginBtn" />
                    </form>

                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipert/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>

                        <div className="registerImage">
                            <img src={avatarPreview} alt="Avtar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Register"
                            className="signUpBtn"
                            onChange={registerSubmit}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginSignup;
