import { useState } from "react";
//import { useNavigate } from "react-router-dom"; // Assuming React Router v6

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  //const navigate = useNavigate(); // React Router navigation

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          navigate("/login"); // Navigate to login view
        } else {
          response.json().then((error) => {
            alert(error.message || "Signup failed");
          });
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        alert("Unable to connect to server. Please try again later.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
