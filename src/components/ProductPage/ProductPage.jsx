import React, { useContext, useEffect, useState } from "react";
import "./ProductPage.scss";
import { CartContext, LoginContext } from "../../App";
import { Link } from "react-router-dom";

function ProductPage(props) {
	const [cart, addToCart] = useContext(CartContext);
	const [login] = useContext(LoginContext);
	const data = props.data;
	const [added, setAdded] = useState(false);

	useEffect(() => {
		const item = cart.find((itm) => itm.id === data.id);
		if (item) {
			setAdded(true);
		}
	}, [cart, data.id]);

	return (
		<div id="ProductPage_Container">
			<h1>{data.name}</h1>
			<img
				src={data.img}
				alt={data.name}
			/>
			<h4>Description: {data.description}</h4>
			<p>Price: {data.price}</p>
			<p>Category: {data.category}</p>
			{login ? (
				added ? (
					<p>
						Show in <Link to={"/cart"}>Cart</Link>
					</p>
				) : (
					<button
						onClick={() => {
							addToCart(data);
							setAdded(true);
						}}
					>
						Add To Cart
					</button>
				)
			) : (
				<p>
					<Link to={"/login"}>Login</Link> To add to cart
				</p>
			)}
		</div>
	);
}

export default ProductPage;
