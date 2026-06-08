export default function Navbar({ email, onLogout }) {
  return (
    <nav className="navbar">
      <span className="nav-email">{email}</span>
      <button className="btn-outline" onClick={onLogout}>Logout</button>
    </nav>
  );
}
