import React, { useEffect, useState } from "react";
import { getAllUsers, isAuthentiated, updateRole } from "../../api/userApi";
import { ToastContainer, toast } from "react-toastify";

const UsersMain = () => {
  const [users, setUsers] = useState([]);
  const [userRole, updateUserRole] = useState(true);

  useEffect(() => {
    getAllUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  }, [userRole]);

  // user's change role
  const handleRole = (id, role) => {
    updateRole(id, role).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success("User role updated successfully");
        updateUserRole(!userRole);
      }
    });
  };
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />

      <div className="w-full mx-auto px-4">
        {/* Title */}
        <div className="flex justify-between my-4">
          <h2 className="text-4xl text-[#084240]">Products</h2>
        </div>

        {/* Display Products table */}
        <table className="w-full">
          <thead className="bg-gray-200 text-white text-lg">
            <tr>
              <th>S.No.</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.length > 0 &&
              users.map((user, i) => {
                return (
                  <tr key={i} className="hover:bg-gray-200">
                    <td className="text-xl text-gray-700">{i + 1}</td>
                    <td className="text-xl text-gray-700">{user.username}</td>
                    <td className="text-xl text-gray-700">{user.email}</td>
                    <td className="text-xl text-gray-700 capitalize">
                      {user.role}
                    </td>

                    {/* functional button to change role */}
                    <td className="text-white">
                      {user.role == "admin" ? (
                        <button
                          onClick={() => handleRole(user._id, "customer")}
                          className="bg-red-500 hover:bg-red-300 p-2 rounded-md my-2"
                        >
                          Remove Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRole(user._id, "admin")}
                          className="bg-green-500 hover:bg-green-300 p-2 rounded-md my-2"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersMain;
