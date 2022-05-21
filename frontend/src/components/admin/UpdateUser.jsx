/* eslint-disable no-return-await */
import { Button } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import toast from '../layout/reactToast/reactToast';
import SideBar from './SideBar';

function UpdateUser() {
    const { id } = useParams();
    const history = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const url = `/api/v1/admin/user/${id}`;
            return await axios.get(url).then((res) => res.data);
        };
        fetchProduct().then((data) => {
            setName(data.user.name);
            setEmail(data.user.email);
            setRole(data.user.role);
        });
    }, [id]);

    const updateUserSubmitHandler = async (e) => {
        e.preventDefault();

        const updatedUserData = {
            name,
            email,
            role,
        };
        try {
            const res = await fetch(`/api/v1/admin/user/${id}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserData),
            });
            await res.json();
            toast(`user updated successfully`).success();
            history('/admin/users');
        } catch (error) {
            toast(`user update failed`).error();
        }
    };

    return (
        <>
            <MetaData title="Update User" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form className="createProductForm" onSubmit={updateUserSubmitHandler}>
                        <h1>Update User</h1>

                        <div>
                            <PersonIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <VerifiedUserIcon />
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <Button id="createProductBtn" type="submit">
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateUser;
