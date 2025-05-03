
import React, { useState, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const authCtx = useContext(AuthContext); 

  const handlePasswordChange = (event) => {
    event.preventDefault();

    if (!newPassword) {
      alert('Please enter a new password');
      return;
    }

    
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCeZKmUH69ry139zSe8-iGfCEjTC1813o4', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token, 
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
        setNewPassword('');

  
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeZKmUH69ry139zSe8-iGfCEjTC1813o4', {
          method: 'POST',
          body: JSON.stringify({
            email: 'user@example.com',
            password: 'oldPassword', 
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
            alert('Old token is invalidated: ' + error.message); 
          });
      })
      .catch((error) => {
        alert('Error: ' + error.message);
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

