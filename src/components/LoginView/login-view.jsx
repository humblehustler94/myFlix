import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // 3.5 new code line added

    const handleSubmit = (event) => {
        event.preventDefault();

        // Enhanced Validation
        if (username.length < 8 || password.length < 12) {
            alert("Username must be at least 8 characters and password 12 characters");
            return;
        }

        const data = {
            Username: username,
            Password: password,
        };

        setLoading(true); // 3.5 new code line added

        fetch("https://movies-flixx-19a7d58ab0e6.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message || "Invalid credentials");
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("Login response:", data);


                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const isFormValid = username.length >= 8 && password.length >= 12;

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
            </label>
            <button type="submit" disabled={!isFormValid || loading}>
                {loading ? "Logging in..." : "Submit"}
            </button>
        </form>
    );
};
