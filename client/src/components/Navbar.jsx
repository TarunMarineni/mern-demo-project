import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div className="nav-bar flex p-6 items-center justify-between space-x-10">
        <div className="logo">LOGO</div>
        <nav className="nav-bar">
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">about</NavLink>
            </li>
            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>

            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login">login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">register</NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink to="/services">services</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
