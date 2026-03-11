// Header.js
// - Top navigation bar component displayed across pages
// - Shows brand logo, search input, login/profile dropdown and cart
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

const DEFAULT_AVATAR = '/images/default_avatar.png'; // fallback avatar in public/images

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler triggers the logout action which clears server cookie and client state
  const logoutHandler = () => {
    dispatch(logout());
  };

  // Handle both object & string avatars gracefully
  // avatarSrc supports two shapes:
  // 1) string URL (e.g., Cloudinary URL stored as string)
  // 2) object with `.url` property (older code path)
  // Falls back to DEFAULT_AVATAR when no avatar available
  const avatarSrc =
    user?.avatar && typeof user.avatar === 'string'
      ? user.avatar
      : user?.avatar?.url || DEFAULT_AVATAR;

  return (
    <nav className="navbar row">
      {/* Left: Brand Logo */}
      <div className="col-12 col-md-3">
        <div className="navbar-brand text-white" style={{ fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.6rem' }}>
          <Link to="/" style={{ color: '#F2C94C', textDecoration: 'none', textShadow: '0 10px 30px rgba(0,0,0,0.35)' }}>
            Shopify
          </Link>
        </div>
      </div>

      {/* Middle: Search bar */}
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      {/* Right: User dropdown & cart */}
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle
              variant="default"
              className="btn-dark text-white pr-5"
              id="dropdown-basic"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <figure className="avatar avatar-nav">
                <Image
                  width="50px"
                  src={avatarSrc}
                  alt={user?.name || 'Guest'}
                  roundedCircle
                />
              </figure>
              <span>{user?.name || 'Guest'}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {user?.role === 'admin' && (
                <Dropdown.Item
                  onClick={() => navigate('/admin/dashboard')}
                  className="text-dark"
                >
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item
                onClick={() => navigate('/myprofile')}
                className="text-dark"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => navigate('/orders')}
                className="text-dark"
              >
                Orders
              </Dropdown.Item>
              <Dropdown.Item
                onClick={logoutHandler}
                className="text-danger"
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        )}

        {/* Cart icon */}
        <Link to="/cart">
          <span id="cart" className="ml-3">
            Cart
          </span>
        </Link>
        <span className="ml-1" id="cart_count">
          {cartItems?.length || 0}
        </span>
      </div>
    </nav>
  );
}
