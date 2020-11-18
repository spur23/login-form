import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { StoreContextProvider } from "./context/store";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import Loginpage from "./Pages/LoginPage/Loginpage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 90vw;
	align-content: center;
	justify-content: center;
	margin: auto;
`;

const App = () => {
	return (
		<StoreContextProvider>
			<Router>
				<Container>
					<NavBar />
					<main>
						<Route exact path='/' component={HomePage} />
						<Route path='/login' component={Loginpage} />
						<Route path='/register' component={RegisterPage} />
						<Route path='/profile' component={ProfilePage} />
					</main>
				</Container>
			</Router>
		</StoreContextProvider>
	);
};

export default App;
