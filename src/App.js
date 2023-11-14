import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage/HomePage";
import Page404 from "./components/Page404/Page404";
import { useEffect } from "react";
import axios from "axios";
import ProductPage from "./components/ProductPage/ProductPage";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";

export const MyContext = React.createContext();
export const LoginContext = React.createContext();
export const CartContext = React.createContext();
export const UserContext = React.createContext();

function App() {
	const [data, setData] = useState([]);
	const [login, setLogin] = useState(false);
	const [user, setUser] = useState({});
	const [cart, setCart] = useState([]);

	const addToCart = (item) => {
		axios
			.post("/api/addToCart", { id: user.id, item: item })
			.then((response) => {
				console.log("Add to cart response:", response.data);
				// Handle the response, update state, or perform any other actions.
				setCart(response.data.user.cart);
			})
			.catch((error) => {
				console.error("Add to cart error:", error.response.data);
				// Handle errors, display error messages, etc.
			});
	};
	const removeFromCart = (item) => {
		axios
			.post("/api/removeFromCart", { id: user.id, cartItemId: item.id })
			.then((response) => {
				console.log("Remove from cart response:", response.data);
				// Handle the response, update state, or perform any other actions.
				setCart(response.data.user.cart);
			})
			.catch((error) => {
				console.error("Remove from cart error:", error.response.data);
				// Handle errors, display error messages, etc.
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/data")
			.then((response) => {
				// setData(response.data);
				// console.log(data);
				// console.log(response.data);
				setData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setLogin(true);
			axios
				.post("/api/user", { id: token })
				.then((response) => {
					setUser(response.data.user);
					setCart(response.data.user.cart);
				})
				.catch((error) => {
					console.error("Error:", error.response.data);
					// Handle errors, display error messages, etc.
				});
		}
	}, []);

	return (
		<div className="App">
			<LoginContext.Provider value={[login, setLogin]}>
				<UserContext.Provider value={[user, setUser]}>
					<CartContext.Provider value={[cart, addToCart, removeFromCart]}>
						<MyContext.Provider value={data}>
							<BrowserRouter>
								<Header />
								<Routes>
									<Route
										path="/"
										element={<Homepage data={data} />}
									/>
									<Route
										path="*"
										element={<Page404 />}
									/>
									<Route
										path="login"
										element={<Login />}
									/>
									<Route
										path="cart"
										element={<Cart />}
									/>

									{data.map((dat, index) => {
										return (
											<Route
												key={index}
												path={dat.url}
												element={<ProductPage data={dat} />}
											/>
										);
									})}
								</Routes>
							</BrowserRouter>
						</MyContext.Provider>
					</CartContext.Provider>
				</UserContext.Provider>
			</LoginContext.Provider>
		</div>
	);
}

export default App;
