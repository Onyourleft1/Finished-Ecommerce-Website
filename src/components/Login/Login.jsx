import React, { useContext, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { LoginContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Login() {
	const [, setLogin] = useContext(LoginContext);
	const [user, setUser] = useContext(UserContext);
	// console.log(login);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5000/api/login", { username, password });
			console.log(response.data.message); // Process the response data as needed
			setErrorMessage("");
			setLogin(true);
			localStorage.setItem("token", response.data.user.id);
			setUser(response.data.user);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			navigate("/"); // Redirect to the homepage
		} catch (error) {
			setErrorMessage(error.response.data.message);
			setUser(user);
		}
	};

	return (
		<div id="Login_Container">
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input
						type="text"
						onChange={handleUsername}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						onChange={handlePassword}
					/>
				</label>
				<button type="submit">Login</button>
			</form>
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	);
}

export default Login;
