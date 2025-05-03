
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/AuthContext';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Routes>
        {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {!isLoggedIn && <Route path="*" element={<Navigate to="/auth" replace />} />}
        
        {isLoggedIn && <Route path="/profile" element={<UserProfile />} />}
        {isLoggedIn && <Route path="/" element={<HomePage />} />}
        {isLoggedIn && <Route path="*" element={<Navigate to="/profile" replace />} />}
      </Routes>
    </Layout>
  );
}

export default App;

