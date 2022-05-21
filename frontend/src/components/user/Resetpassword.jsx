import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { STATUSES } from '../../reducers/productsSlice';
import { updateProfile } from '../../reducers/profileSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import notify from '../layout/reactToast/reactToast';
import './ResetPassword.css';

function Resetpassword() {
    const { token } = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();
    const { status, data, isUpdated } = useSelector((state) => state.profile);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const resetPasswordData = new FormData();
        resetPasswordData.set('password', password);
        resetPasswordData.set('confirmPassword', confirmPassword);

        dispatch(updateProfile({ token, resetPasswordData }));
    };
    useEffect(() => {
        if (status === 'idle' && !isUpdated) {
            notify(data.error).error();
        }
        if (status === 'idle' && isUpdated) {
            notify('Reset Password Successfully').success();
            history('/login');
        }
    }, [dispatch, data, status, isUpdated, history]);

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    return (
        <>
            <MetaData title="Change Password" />
            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">
                    <h2 className="resetPasswordHeading">Update Profile</h2>

                    <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                        <div>
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        <input type="submit" defaultValue="Update" className="resetPasswordBtn" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Resetpassword;
