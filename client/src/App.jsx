import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";

import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Services } from "./pages/Services";
import { Logout } from "./pages/Logout";
import { Error } from "./pages/Error";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminUserEdit } from "./pages/Admin-User-Edit";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="absolute top-20 right-0 left-0">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="users/:id/edit" element={<AdminUserEdit />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
