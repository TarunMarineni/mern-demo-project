import { NavLink, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <>
      <div className="flex">
        <header className="flex flex-col space-y-4 px-4 text-xl bg-black">
          <div>
            <NavLink className="text-blue-400" to="/admin/users">
              Users
            </NavLink>
          </div>
          <div>
            <NavLink className="text-blue-400" to="/admin/contacts">
              Contacts
            </NavLink>
          </div>
          <div>
            <NavLink className="text-blue-400" to="/">
              Home
            </NavLink>
          </div>
          <div>
            <NavLink className="text-blue-400" to="/services">
              Services
            </NavLink>
          </div>
        </header>
        <Outlet />
      </div>
    </>
  );
};
