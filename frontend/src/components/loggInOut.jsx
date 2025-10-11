import { useEffect, useState } from "react";

export default function LoggedInOut() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <header>
      {user ? (
        <span>Welcome, {user.name}!</span>
      ) : (
        <a href="/login">Sign In</a>
      )}
    </header>
  );
}
