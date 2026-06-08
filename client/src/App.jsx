import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import FaceDetect from './components/FaceDetect';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [page, setPage] = useState('login');

  const onAuth = (t, e) => {
    localStorage.setItem('token', t);
    localStorage.setItem('email', e);
    setToken(t);
    setEmail(e);
  };

  const onLogout = () => {
    localStorage.clear();
    setToken('');
    setEmail('');
  };

  if (!token) {
    return (
      <div className="center">
        {page === 'login'
          ? <Login onAuth={onAuth} switchToSignup={() => setPage('signup')} />
          : <Signup onAuth={onAuth} switchToLogin={() => setPage('login')} />}
      </div>
    );
  }

  return (
    <>
      <Navbar email={email} onLogout={onLogout} />
      <main className="main">
        <FaceDetect token={token} />
      </main>
    </>
  );
}
