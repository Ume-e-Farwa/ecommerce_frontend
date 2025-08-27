import { useEffect, useState } from "react";
import { getProfile } from "./api/authapi";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        alert("Not authorized! Please login.");
      }
    })();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
<>


  <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
>
  Logout
</button>

    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>


</>
  
  );
}
