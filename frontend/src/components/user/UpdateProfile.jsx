import FaceIcon from '@mui/icons-material/Face';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { STATUSES } from '../../reducers/productsSlice';
import { updateProfile } from '../../reducers/profileSlice';
import { userRegLogin } from '../../reducers/userSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import notify from '../layout/reactToast/reactToast';
import './UpdateProfile.css';

function UpdateProfile() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { isUpdated, status } = useSelector((state) => state.profile);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('/profile.png');

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('avatar', avatar);
        dispatch(updateProfile({ myForm }));
    };

    const updateProfileDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.user.name);
            setEmail(user.user.email);
            setAvatarPreview(user.user.avatar.url);
        }
        if (status === 'idle' && !isUpdated) {
            notify(user.error).error();
        }
        if (status === 'idle' && isUpdated) {
            notify('Profile Updated successfully').success();
            dispatch(userRegLogin({}));
            history('/account');
            dispatch(updateProfile({ reset: 'to false isUpdated' }));
        }
    }, [dispatch, user, status, isUpdated, history]);

    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }

    return (
        <>
            <MetaData title="Update Profile" />
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                    <h2 className="updateProfileHeading">Update Profile</h2>
                    <form
                        className="updateProfileForm"
                        encType="multipert/form-data"
                        onSubmit={updateProfileSubmit}
                    >
                        <div className="updateProfileName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileEmail">
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

                        <div className="updateProfileImage">
                            <img src={avatarPreview} alt="Avtar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProfileDataChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Update"
                            className="signUpBtn"
                            onChange={updateProfileSubmit}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateProfile;
