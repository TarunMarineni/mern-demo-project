import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import "./Admin-Table.css";

export const AdminUsers = () => {
  const { authorizationToken, API } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const response = await fetch(`${API}/api/admin/users`, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    });

    const data = await response.json();

    setUsers(data.users);
  };

  const deleteUserHandler = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const res = await response.json();
      if (res.isDeleted) {
        getAllUsers();
      }
    } catch (error) {
      console.log("error::", error);
    }
  };

  const editUserHandler = (id) => {
    navigate(`/admin/users/${id}/edit`);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="w-full px-10 ">
      <h2 className="font-bold text-[30px]">Admin Users Data</h2>
      <div>
        {!users ? (
          <>
            <div className="m-4 w-full text-[20px]"> No users found</div>
          </>
        ) : (
          <>
            <table className="m-4 w-full border-solid border-black border rounded-2xl text-[20px]">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((currentElem, index) => (
                  <tr key={index}>
                    <td>{currentElem.username}</td>
                    <td>{currentElem.email}</td>
                    <td>{currentElem.phone}</td>
                    <td>
                      <button
                        onClick={() => editUserHandler(currentElem._id)}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-[20px]"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteUserHandler(currentElem._id)}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 text-[20px]"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};
