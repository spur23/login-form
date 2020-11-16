import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { StoreContextProvider } from "./context/store";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Loginpage from "./Pages/Loginpage";
import RegisterPage from "./Pages/RegisterPage";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 90vw;
	align-content: center;
	justify-content: center;
`;

const App = () => {
	return (
		<StoreContextProvider>
			<Router>
				<Container>
					<NavBar />
					<main>
						<Route path='/home' component={HomePage} />
						<Route path='/login' component={Loginpage} />
						<Route path='/register' component={RegisterPage} />
					</main>
				</Container>
			</Router>
		</StoreContextProvider>
	);
};

export default App;
