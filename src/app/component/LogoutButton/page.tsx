"use client";
import { useClerk } from "@clerk/clerk-react";

const LogoutButton = () => {
  const { signOut } = useClerk();

  return (
    <button onClick={() => signOut()} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
