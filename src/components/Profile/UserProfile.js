
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
