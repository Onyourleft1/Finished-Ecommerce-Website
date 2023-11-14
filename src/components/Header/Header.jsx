import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { LoginContext, UserContext } from "../../App";

function Header() {
	const [login, setLogin] = useContext(LoginContext);
	const [, setUser] = useContext(UserContext);
	return (
		<div id="Header_Container">
			<Link to={"/"}>Home</Link>
			{!login ? (
				<Link to={"/login"}>Login</Link>
			) : (
				<>
					<Link to={"/Cart"}>Cart</Link>
					<button
						onClick={() => {
							setLogin(false);
							setUser({});
							localStorage.removeItem("token");
							localStorage.removeItem("user");
						}}
					>
						Logout
					</button>
				</>
			)}
		</div>
	);
}

export default Header;
