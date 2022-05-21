import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { STATUSES } from '../../reducers/productsSlice';
import { updateProfile } from '../../reducers/profileSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import notify from '../layout/reactToast/reactToast';
import './UpdatedPassword.css';

function UpdatePassword() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { data, isUpdated, status } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const updatePasswordData = new FormData();
        updatePasswordData.set('oldPassword', oldPassword);
        updatePasswordData.set('newPassword', newPassword);
        updatePasswordData.set('confirmPassword', confirmPassword);

        dispatch(updateProfile({ updatePasswordData }));
    };

    useEffect(() => {
        if (status === 'idle' && !isUpdated) {
            notify(data.error).error();
        }
        if (status === 'idle' && isUpdated) {
            notify('Password Updated successfully').success();

            history('/account');
            dispatch(updateProfile({ reset: 'to false isUpdated' }));
        }
    }, [dispatch, status, isUpdated, history, data]);

    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }

    return (
        <>
            <MetaData title="Change Password" />
            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                    <h2 className="updatePasswordHeading">Update Profile</h2>

                    <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
                        <div className="loginPassword">
                            <VpnKeyIcon />
                            <input
                                type="password"
                                placeholder="Old Password"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockIcon />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Change" className="updatePasswordBtn" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdatePassword;
