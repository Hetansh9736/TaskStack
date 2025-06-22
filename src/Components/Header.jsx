import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../Helper/firebase';
import { setUser } from '../Redux/Slices/authSlice';

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Add this

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null)); // ✅ Clear user from Redux
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const linkClasses = ({ isActive }) =>
    `hover:text-blue-400 ${isActive ? 'text-blue-400 font-semibold ' : ''}`;

  return (
    <header className="bg-[#0f172a] border-b border-[#1e293b] text-[#e2e8f0] px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <NavLink to="/" className="text-2xl font-bold text-white">
          Taskstack
        </NavLink>

        <nav className="flex gap-4 text-md font-medium">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>
          {user ? (
            <>
              <NavLink to="/createpost" className={linkClasses}>
                Create
              </NavLink>
              <button
                onClick={handleLogout}
                className="hover:text-red-500 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClasses}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
