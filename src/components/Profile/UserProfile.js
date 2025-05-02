/*
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;


import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../../store/AuthContext';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);

 


  if (!authCtx.isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
      
    </section>
  );
};

export default UserProfile;

*/


import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <p>Your email is: user@example.com</p>
      {!isChangingPassword && (
        <button onClick={handleChangePassword}>Change Password</button>
      )}
      {isChangingPassword && <ProfileForm />}
    </section>
  );
};

export default UserProfile;
