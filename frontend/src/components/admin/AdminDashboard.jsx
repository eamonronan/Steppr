import React from 'react'
import { getAllUsers } from '../../features/admin/adminSlice';
import { reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner';
import UserItem from './UserItem';
import { Fragment } from 'react';

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userlist, isLoading, isError, message } = useSelector((state) => state.admin);

  
  // fetch all users on first render of page
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    }

  }, [])

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {(user && user.userRole == "admin") ? (
        <>
          <section className="adminDashboardHeader">
          <h4>Welcome to the Admin Dashboard</h4>
          </section>
          <section className="content" key={userlist._id}>
          {userlist.length > 0 ? (
            <div className="userList">
              {userlist[0].map((enduser, index) => (
                <UserItem clasName="userItem" key={index} enduser={enduser} />
              ))}

            </div>
          ) : (<h3>No users have signed up for Steppr yet!</h3>)}
          </section>
        </>
      ) : (
        <div>Sorry, no access allowed here.</div>
      )}
    </>
  )
}

export default AdminDashboard