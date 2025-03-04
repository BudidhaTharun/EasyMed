import { NavLink } from 'react-router-dom';
import './Header.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Header() {
  const token = localStorage.getItem('authToken');

  return (
    <header className="header">
      <div className="logo">
        <h1>Easymed</h1>
      </div>
      <div className="nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} end>
          Home
        </NavLink>
        
        {token && (
          <>
            <NavLink to="/doctors" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              Doctors
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
             History
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              Profile
            </NavLink>
          </>
        )}
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          Contact
        </NavLink>
      </div>
      <Stack direction="row" spacing={2}>
        {token ? (
          <Button
            variant="contained"
            onClick={() => {
              localStorage.removeItem('authToken');
              window.location.reload();
            }}
          >
            Logout
          </Button>
        ) : (
          <Button variant="contained" onClick={()=>{window.location.href='/authpage'}}>Create Account</Button>
        )}
      </Stack>
    </header>
  );
}

export default Header;
