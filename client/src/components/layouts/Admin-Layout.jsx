import { NavLink, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <>
      <div className="flex relative">
        <header className="flex fixed w-[30px] flex-col space-y-4 px-4 text-[20px] font-bold">
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
        <div className="absolute left-40 right-0 w-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};
