import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth";

export const AdminUserEdit = () => {
  const { id } = useParams();
  const { authorizationToken } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const getUserById = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();

      setUser({
        email: data.email,
        phone: data.phone,
        username: data.username,
      });
    } catch (error) {
      navigate("/");
    }
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      if (!data.acknowledged) {
        return toast.error(
          data.message ? data.message : "User is not updated",
          {
            theme: "colored",
          }
        );
      }
      toast.success("User updated successfully", { theme: "colored" });
      return navigate("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className="w-full px-10">
      <h2 className="font-bold text-[30px]">Edit User</h2>
      {user ? (
        <form onSubmit={updateUserHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              value={user.username}
              onChange={inputHandler}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              value={user.email}
              onChange={inputHandler}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="number"
              name="phone"
              value={user.phone}
              onChange={inputHandler}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Update User
          </button>
        </form>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};
