import React, { useContext } from "react";
import "./HomePage.scss";
import { MyContext } from "../../App";
import Card from "../Card/Card";

function HomePage() {
	const data = useContext(MyContext);
	return (
		<div id="Homepage_Container">
			<div id="Banner">
				<h1>Welcome to My Store</h1>
			</div>
			<div id="Cards">
				{data.map((dat, index) => {
					return (
						<Card
							key={index}
							data={dat}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default HomePage;
