import React, { useContext } from "react";
import "./Card.scss";
import { CartContext } from "../../../App";

function Card(props) {
	const [, , removeFromCart] = useContext(CartContext);
	const item = props.item;
	return (
		<div id="Cart_Card_Container">
			<h2>Name: {item.name}</h2>
			<h2>Price:{item.price}</h2>
			<h2>Category: {item.category}</h2>
			<h2>Description: {item.description}</h2>
			<button
				onClick={(e) => {
					e.preventDefault();
					removeFromCart(item);
				}}
			>
				Remove From Cart
			</button>
		</div>
	);
}

export default Card;
