import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { STATUSES } from '../../reducers/productsSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import './Profile.css';

function Profile() {
    const history = useNavigate();
    const { user, status, isAuthenticate } = useSelector((state) => state.user);
    const userData = user.user;

    useEffect(() => {
        if (!isAuthenticate) {
            history('/login');
        }
    }, [history, isAuthenticate]);

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    return (
        <>
            <MetaData title={`${userData.name}'s Profile`} />
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={userData.avatar.url} alt="userProfile" />
                    <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{userData.name}</p>
                    </div>

                    <div>
                        <h4>Email</h4>
                        <p>{userData.email}</p>
                    </div>

                    <div>
                        <h4>Joined on</h4>
                        <p>{String(userData.createdAt).substring(0, 10)}</p>
                    </div>

                    <div>
                        <Link to="/orders">My Orders</Link>
                        <Link to="/password/update">change password</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
