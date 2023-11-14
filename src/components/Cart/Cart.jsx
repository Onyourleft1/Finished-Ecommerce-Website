import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { CartContext, LoginContext } from "../../App";
import { Link } from "react-router-dom";
import Card from "./Card/Card.jsx";

function Cart() {
	// const [user] = useContext(UserContext);
	const [login] = useContext(LoginContext);
	const [cart, ,] = useContext(CartContext);
	const [nCart, setNCart] = useState([]);
	useEffect(() => {
		setNCart(cart);
	}, [cart]);

	return (
		<div>
			{login ? (
				nCart.length > 0 ? (
					nCart.map((item, index) => {
						return (
							<Card
								key={index}
								item={item}
							/>
						);
					})
				) : (
					<p>
						Cart Empty go to <Link to={"/"}>Home</Link> to view items
					</p>
				)
			) : (
				<p>
					<Link to={"/Login"}>Login</Link> to view items
				</p>
			)}
		</div>
	);
}

export default Cart;
