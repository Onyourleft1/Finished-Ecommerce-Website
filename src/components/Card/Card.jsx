import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

function Card(props) {
	const data = props.data;
	return (
		<div id="Card_Container">
			<Link to={data.url}>
				<img
					src={data.img}
					alt={data.name}
				/>
			</Link>
			<h3>{data.name}</h3>
			<h5>Price: {data.price}$</h5>
			<h6>Category: {data.category}</h6>
			<Link to={data.url}>
				<button>View Product</button>
			</Link>
		</div>
	);
}

export default Card;
