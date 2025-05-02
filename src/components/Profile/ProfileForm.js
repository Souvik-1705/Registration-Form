/*
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
*/

import React, { useState, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const authCtx = useContext(AuthContext); // Access the token from context

  const handlePasswordChange = (event) => {
    event.preventDefault();

    if (!newPassword) {
      alert('Please enter a new password');
      return;
    }

    // Make the POST request to Firebase to change the password
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCeZKmUH69ry139zSe8-iGfCEjTC1813o4', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token, // Use the token from context
        password: newPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        alert('Password changed successfully!');
        setNewPassword(''); // Clear the input field

        // Try to log in with the old token to verify that the token is invalidated
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeZKmUH69ry139zSe8-iGfCEjTC1813o4', {
          method: 'POST',
          body: JSON.stringify({
            email: 'user@example.com', // Use the email associated with the old token
            password: 'oldPassword', // Use the old password (which should no longer work)
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Old token should no longer work.');
            }
            return res.json();
          })
          .catch((error) => {
            alert('Old token is invalidated: ' + error.message); // This will confirm that the old token is no longer valid
          });
      })
      .catch((error) => {
        alert('Error: ' + error.message); // Handle any errors
      });
  };

  return (
    <form onSubmit={handlePasswordChange} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div  className={classes.action}>
      <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;

