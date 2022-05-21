import MailOutlineIcon from '@material-ui/icons/MailOutline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../reducers/productsSlice';
import { updateProfile } from '../../reducers/profileSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import notify from '../layout/reactToast/reactToast';
import './ForgotPassword.css';

function ForgotPassword() {
    const dispatch = useDispatch();
    const { status, isUpdated, data } = useSelector((state) => state.profile);

    const [email, setEmail] = useState();

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const forgotPasswordData = new FormData();
        forgotPasswordData.set('email', email);
        dispatch(updateProfile({ forgotPasswordData }));
    };

    useEffect(() => {
        if (status === 'idle' && !isUpdated) {
            notify(data.error).error();
        }
        if (status === 'idle' && isUpdated) {
            notify(data.message).success();
        }
    }, [dispatch, data, status, isUpdated]);

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }
    return (
        <>
            <MetaData title="Forgot Password" />
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                    <h2 className="forgotPasswordHeading">Forgot Password</h2>

                    <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                        <div className="forgotPasswordEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <input type="submit" value="Send" className="forgotPasswordBtn" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
