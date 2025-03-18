import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/body.png';
import image from '../assets/300image.png';
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid credentials, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <div className="login-container">
        {/* Left Section */}
        <div className="login-promo-section">
          <div className="login-slide-flex">
            <div className="login-spaceside">
              <img src={image} alt="Promo" className="login-promo-img" />
            </div>
            <div className="login-topside">
              <h2 className="login-promo-title">Exclusive Offer</h2>
              <p className="login-promo-text">
                Open an account today and enjoy special benefits.
              </p>
              <button className="login-open-account-btn">Open an Account</button>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="login-box">
          <h2 className="login-welcome-title">Login</h2>

          {/* Error Message Display */}
          {errorMessage && (
            <p className="login-error-message">
              ⚠️ {errorMessage}
            </p>
          )}

          <div className="login-input-group">
            <label className="login-input-label">Username</label>
            <input
              type="text"
              className="login-input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="login-input-group">
            <label className="login-input-label">Password</label>
            <input
              type="password"
              className="login-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <br />
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <div>
              <input type="checkbox" name="check" id="rememberMe" /> 
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <a href="#" className="login-link">Use Token <MdKeyboardArrowRight size={20} /> </a>
          </div>

          <button className="login-sign-in-btn" onClick={handleLogin} disabled={loading}>
            {loading ? <Loader /> : 'Sign In'}
          </button>

          <div className="login-links">
            <a href="#" className="login-link">Forgot username / password? <MdKeyboardArrowRight size={20} />  </a>
            <a href="#" className="login-link">Not Enrolled? Sign Up Now. <MdKeyboardArrowRight size={20} /> </a>
          </div>
        </div>
      </div>
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;