import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./Admin-Table.css";

export const AdminContacts = () => {
  const { authorizationToken, API } = useAuth();
  const [contacts, setContacts] = useState([]);

  const getAllContacts = async () => {
    const response = await fetch(`${API}/api/admin/contacts`, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    });

    const data = await response.json();

    setContacts(data.contacts);
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="w-full px-10">
      <h2 className="font-bold text-[30px]">Admin Contacts Data</h2>
      <div>
        <table className="m-4 w-full border-solid border-black border rounded-2xl text-[20px]">
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>

          {contacts.map((currentElem, index) => (
            <tr key={index}>
              <td>
                {currentElem.username
                  ? currentElem.username
                  : currentElem.userName}
              </td>
              <td>{currentElem.email}</td>
              <td>{currentElem.message}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
