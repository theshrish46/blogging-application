"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [confirmationKey, setConfirmationKey] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.isAdmin) {
      const fetchUsers = async () => {
        try {
          const response = await fetch("/api/admin/users");
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [session]);

  const handleToggleAdmin = async (userId) => {
    setSelectedUserId(userId);
  };

  const handleConfirmToggle = async () => {
    try {
      await fetch("/api/admin/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUserId, confirmationKey }),
      });
      toast.success("User admin status updated!");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUserId
            ? { ...user, isAdmin: !user.isAdmin }
            : user
        )
      );
    } catch (error) {
      toast.error("Failed to update user.");
    }
    setConfirmationKey("");
    setSelectedUserId(null);
  };

  if (!session?.user?.isAdmin) {
    return <p>Access Denied</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-20">
      <h1>Admin Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.isAdmin ? "Admin" : "User"}
            <button onClick={() => handleToggleAdmin(user.id)}>
              Toggle Admin
            </button>
          </li>
        ))}
      </ul>
      {selectedUserId && (
        <div>
          <h2>Confirm Admin Toggle</h2>
          <input
            type="text"
            placeholder="Enter confirmation key"
            value={confirmationKey}
            onChange={(e) => setConfirmationKey(e.target.value)}
          />
          <button onClick={handleConfirmToggle}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
