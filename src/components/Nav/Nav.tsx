import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";

function Nav() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }


  return (
    <nav>
      {/* Inside of here I will have a list of Links to various components */}
      <ul>
        <li><Link to='/private/hotels'>Hotels</Link></li>
        <li><Link to='/private/reservations'>Reservations</Link></li>
        <li><Link to='/private/profile'>Profile</Link></li>
        <li onClick={() => { handleLogout() }} >Logout</li>
      </ul>
    </nav>
  )
}

export default Nav
