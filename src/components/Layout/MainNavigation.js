
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <ul>
        {!authCtx.isLoggedIn && (
          <li>
            <Link to="/auth">Login</Link>
          </li>
        )}

        {authCtx.isLoggedIn && (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default MainNavigation;
