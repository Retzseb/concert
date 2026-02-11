import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <div><ul>
        <li>
          <NavLink to="/" className="nav-link"><img src="jegyshop.png" style={{ width: 100}} alt="" /></NavLink>
        </li>
        <li>
          <NavLink to="/concerts" className="nav-link">Koncertek</NavLink>
        </li>
        <li>
          <NavLink to="/news" className="nav-link">Újdonság</NavLink>
        </li>
        <li>
          <NavLink to="/signin" className="nav-link">Belépés</NavLink>
        </li>        
        <li>
          <NavLink to="/registration" className="nav-link">Regisztráció</NavLink>
        </li>   
        <li>
          <NavLink to="/cart" className="nav-link"><img src="cart.png" style={{ width: 30}} alt="" /></NavLink>
        </li>                     
      </ul>
      </div>
    </nav>
  );
}
